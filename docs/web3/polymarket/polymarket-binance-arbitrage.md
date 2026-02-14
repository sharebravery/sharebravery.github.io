---
title: Polymarket 量化交易实战（九）：币安价格驱动的套利策略
shortTitle: 币安驱动套利
date: 2025-11-22
categories:
  - 量化交易
  - Polymarket
tags:
  - Python
  - Web3
  - 套利
order: 10
cover: /covers/polymarket/polymarket-binance-arbitrage.png
---

# Polymarket 量化交易实战（九）：币安价格驱动的套利策略

两个市场在交易同一件事，却给出不同价格，这就是套利窗口。

在加密相关题材里，这件事发生得很频繁：币安先完成价格发现，预测市场后吸收信息。

所以这套策略的核心不是“预测方向”，而是利用两者的**吸收速度差**。

![币安价格驱动的套利流程](illustrations/binance-arbitrage/01-flowchart-arbitrage-pipeline.png)

## 先讲理论：为什么这个策略会成立

可以把它写成一句话：

**可交易错价 = 外部市场价格发现速度 - 预测市场价格吸收速度**

币安这种高流动性市场负责“先定价”，预测市场负责“后定价”。只要这段时滞稳定存在，错价窗口就会反复出现。

但这不等于“无风险套利”。

策略成立还需要三个条件同时满足：

- 外部锚价格可观测、稳定且更新足够快
- 你的执行链路延迟与滑点小于窗口宽度
- 双边头寸可以在一致规则下回收价值

这也是实盘里最容易被忽略的一点：它是统计优势，不是免费午餐。

## 为什么选币安作为外部价格锚

币安的盘口深、更新快、噪声相对可控，对 BTC 这类标的更接近“即时共识价”。

预测市场恰好反过来：盘口薄、撮合慢，突发波动时更容易出现滞后。

两者放在一起，就形成了可利用的信息差。

## 价格源要先做稳：REST 初始化 + WS 持续更新

这个组合本身没问题，关键是你怎么用。

```python
# 1) 冷启动：REST 拿初始盘口
resp = requests.get(
    "https://api.binance.com/api/v3/ticker/bookTicker",
    params={"symbol": "BTCUSDT"}
).json()

bid, ask = float(resp["bidPrice"]), float(resp["askPrice"])
mid_price = (bid + ask) / 2

# 2) 实时阶段：WS 持续更新
# wss://stream.binance.com:9443/ws/btcusdt@bookTicker
```

REST 解决的是“启动时盲飞”，WS 解决的是“持续低延迟”。

需要补一条边界：这里用的是 `bookTicker` 级别数据，适合做信号锚，不等于完整深度撮合视角。

## 定价模型：先可解释，再追求复杂

实盘里，可解释模型更容易调参与排错。

一个够用版本是线性映射：

```python
fair_price = poly_base + (btc_now - btc_base) * delta
```

`delta` 的语义很直接：BTC 每波动 1 美元，预测市场理论上该变动多少。

这在代码里对应 `binanceDelta`。参数不是越大越灵敏越好，过大只会把噪声误判成信号。

另一个现实问题是结构性偏移。市场可能长期高估或低估几分，这时需要 EMA 吸收偏差：

```python
bias = market_mid - model_fair
ema_bias = alpha * bias + (1 - alpha) * ema_bias
adjusted_fair = fair_price + ema_bias
```

这在代码里对应动态 `offset`。它的作用是让模型跟市场重新对齐，而不是频繁“自信但错误”地触发交易。

![定价模型：线性映射 + EMA偏移](illustrations/binance-arbitrage/02-framework-pricing-model.png)

## 触发逻辑：过滤噪声，只做显著错价

公平价算出来后，关键是定义“什么叫值得做”。

常用规则是安全价与当前最优买价的比较：

```python
safe_buy = adjusted_fair - margin
if safe_buy - best_bid > threshold:
    execute_buy()
```

`margin` 负责预留安全空间，`threshold` 负责过滤噪声区间。

实盘里这不是单腿策略。Yes/No 两侧会各自计算触发，再在执行层做一致性约束（比如批量提交、部分失败补偿）。

## 双边结构真正要看的是净收益，不是口号

Yes/No 互补没错，但“`Yes + No < 1` 就稳赚”是常见误读。

更准确的判断是：

`净收益 = 1 - (Yes成本 + No成本) - 交易费用 - 执行损耗`

执行损耗包括滑点、单腿成交导致的未对冲暴露、撤单重挂损耗等。

所以 `成本 < 1` 只是毛收益前提，不是净收益承诺。

> 【注：`place_orders_batch` 可以压缩双腿时序误差，但不是原子提交，必须处理“部分成功、部分失败”。】

![双边套利：Yes + No = 1.00](illustrations/binance-arbitrage/03-framework-bilateral-structure.png)

## 风控不是附加模块，是策略本体

这类策略最常见的失败，不是“没机会”，而是“在错误时机执行”。

我通常盯三层：

- 价格突变保护：外部价格跳变过大，暂停对应方向挂单
- 库存敞口保护：单边库存过重，停止同向加仓
- 安全限价保护：挂单价不能越过模型允许区间

在我的实现里还有一条硬约束：当双边买入价格和过高（例如接近 `0.995`）时直接跳过，防止“看起来在套利，实际上在让利”。

![三重风控防护体系](illustrations/binance-arbitrage/04-framework-risk-control.png)

## 上线后怎么判断策略在变差

不用盯一堆参数，盯住三个指标就够了：

- 模型价与盘口价的偏离是否还持续存在
- 双腿成交后的库存是否能回归平衡
- 风控触发次数是否异常上升

第三个最关键。

如果风控触发突然增多，通常不是“机会变多”，而是模型失配或执行质量下降。这时候应该先降频、重校准，再决定是否恢复交易强度。

## 最后

这套策略不是“猜涨跌”，而是“做价格传导”。

市场快慢差还在，它就有价值；快慢差消失，它就该停。

---

【注：关于费用与返点】Polymarket 的 taker fee / maker rebates 规则会随时间和市场类型调整。不要把历史比例硬编码成长期假设，务必按当期官方规则校准。  
参考：  
- https://docs.polymarket.com/developers/rewards/overview  
- https://docs.polymarket.com/developers/rewards/fees-and-rebates
