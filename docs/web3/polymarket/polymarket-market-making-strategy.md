---
title: Polymarket 量化交易实战（八）：双向套利策略详解
shortTitle: 双向套利策略详解
date: 2025-11-19
categories:
  - 量化交易
  - Polymarket
tags:
  - Python
  - Web3
order: 9
cover: /covers/polymarket/polymarket-market-making-strategy.png
---

# Polymarket 量化交易实战（八）：双向套利策略详解

**这是系列中最“硬核”的一篇。**

我们将揭开 V5 机器人的核心盈利逻辑——双向做市（Two-Sided Market Making）。
这里没有玄学，只有数学。

#### 1. 策略原理：利用互补性

![Arbitrage Math: Cost < Value](illustrations/two-sided-arbitrage/01-infographic-arbitrage-math.png)

预测市场有一个核心公理：
**Yes Price + No Price = 1.0 (理论值)**

如果市场上 Yes 卖 0.60，No 卖 0.40，这是完美平衡。
但实际上，订单簿往往是这样的：
*   **Yes**: Bid 0.58 / Ask 0.62
*   **No**: Bid 0.38 / Ask 0.42

**我们的机会：Spread（价差）**
作为 Maker，我们同时挂买单：
*   Yes @ 0.59
*   No @ 0.39

**盈利推演：**
假设两个单子都成交了：
*   成本 = 0.59 + 0.39 = **0.98**
*   最终价值 = **1.00** (无论结果如何，合并后可赎回 $1)
*   **无风险利润 = 1.00 - 0.98 = $0.02 (ROI 2%)**

**结论：双向套利的本质，是用 0.98 的成本，合成了价值 1.00 的完整资产。**

#### 2. 代码实现：SimpleUpDownCycle

在代码中，我们并不追求“完美对冲”，而是动态压价。

```python
# 策略：跟随并压价 (Penny Jump)
# 在 Ask 价格下方 -0.02 处挂单，保证成交即有利润空间
price_yes = raw_ask_yes - 0.02
price_no = raw_ask_no - 0.02

# 价格保护：如果加起来太贵，就别干了
if price_yes + price_no > 0.99:
    return # 没油水
```

为了让两边订单尽可能同时到达服务器，使用 `place_orders_batch` 批量发送（注意：这不是原子操作，订单仍可能部分成功）。

#### 3. 库存管理的挑战

![Dynamic Inventory Expansion](illustrations/two-sided-arbitrage/02-infographic-dynamic-inventory.png)

理论很美好，现实很骨感。
最常见的情况是：**一边成交了，另一边没成交。**
这就形成了 **Delta 风险**。

**解决方案：动态平衡机制**
我们在 V5 中引入了基于库存的动态开关：

```python
# 获取持仓
up_pos = self.get_pos(up_id)
down_pos = self.get_pos(down_id)

# 动态扩容逻辑
# 如果两边都有持仓（形成对冲），允许额外持有 10 份
max_pos = 9.0 + (10.0 if (up_pos > 0 and down_pos > 0) else 0.0)
```

**逻辑解析：**
*   如果不平衡（只有 Yes），限制仓位，防止单边投机。
*   如果平衡（Yes/No 都有），说明我们持有的是无风险的合成资产（Synthetic Cash），这时候可以放宽限制。

#### 4. 额外收益：Maker Rebates

除了 Spread 收益，Polymarket 还有一个官方的 **Maker Rebates Program（做市商返点计划）**。

**机制：**
*   在 15 分钟 Crypto 市场，Taker 支付的手续费会进入奖励池
*   奖励池按做市商的成交量比例，每日分配 USDC 返点
*   返点直接打入钱包，无需申请

**如何检查市场是否启用返点：**
```python
# 查询 token 的费率
# fee_rate_bps = 1000 表示启用（1%）
# fee_rate_bps = 0 表示无费用
```

这意味着：**在有费用的市场做市，你不仅赚 Spread，还能额外获得平台返点。**

#### 总结

双向套利的核心不在于"预测谁赢"，而在于：

1.  **数学上的确定性**：Cost < 1.0 即为盈利。
2.  **执行上的速度**：利用批量下单抢占盘口。
3.  **风控上的平衡**：通过库存管理防止单边风险。
4.  **返点加成**：在启用费用的市场，还能获得额外的 Maker Rebates。

虽然单笔只赚几美分，但机器一天 24 小时不知疲倦地搬砖，积少成多。
这就是量化的魅力。
