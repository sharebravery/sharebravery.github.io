---
title: Polymarket 量化交易实战（五）：Bot 开发纪实
shortTitle: Bot 开发纪实
date: 2025-10-29
categories:
  - 量化交易
  - Polymarket
tags:
  - Python
  - Web3
order: 6
cover: /covers/polymarket/polymarket-bot-dev-journey.png
---

# Polymarket 量化交易实战（五）：Bot 开发纪实

**从零开始。**

这是我开发 Polymarket 交易机器人的历程。
从一个只能“看天吃饭”的 Python 轮询脚本，进化成基于 Docker 的毫秒级高频做市系统。

这期间，我删掉的代码比留下的多。

#### 阶段一：投机者的幻想 (V1)

![Bot Evolution Timeline](illustrations/40-day-dev-journey/01-timeline-latency-evolution.png)

一切始于一个简单的想法：“跟着聪明钱买不就行了？”

V1 的逻辑非常朴素：
1.  写死大户地址。
2.  `requests.get` 每 2 秒轮询。
3.  发现大户买入，立刻市价跟单。

**现实的毒打：**
上线第一天就亏了。
当大户买入时，价格是 0.50。等 API 更新、等我轮询、等 Gas 确认，价格已经飞到 0.65。

我成了完美的“接盘侠”。
**教训：在链上博弈中，速度不是体验，而是利润的全部。**

#### 阶段二：范式转移 (V2)

痛定思痛，我决定抛弃 HTTP，拥抱 WebSocket。

这不仅仅是换协议，而是架构的 **Paradigm Shift**：
*   **V1 (Pull)**：主循环控制一切，我问服务器“有新数据吗？”
*   **V2 (Push)**：服务器推数据给我，我必须在 `on_message` 里毫秒级响应。

延迟降到了 50ms。但新的问题出现了：**状态不同步**。
本地计算买一价是 0.60，下单却报“价格已变动”。

**教训：WebSocket 只是传输层，如何处理数据的一致性才是核心挑战。**

#### 阶段三：从 Taker 到 Maker (V3)

![Taker vs Maker Comparison](illustrations/40-day-dev-journey/02-comparison-taker-vs-maker.png)

这是最关键的转折。

我意识到"跟单"本质是 **Taker（吃单者）**。你要忍受滑点，在某些市场还要付手续费。
而在流动性稀缺的预测市场，Taker 几乎必输。

我决定转向 **Maker（做市商）**：
*   **旧逻辑**：预测 Yes 会涨 -> 买入 Yes。
*   **新逻辑**：我不预测方向，我在 Yes 和 No 两边同时挂单，赚价差（Spread）。

这一版代码变得复杂，但我第一次尝到了稳定盈利的滋味。

#### 阶段四：与 Gas 的战争 (V4)

随着频率增加，我发现：**赚的钱还不够付 Gas。**

虽然交易免 Gas，但赎回（Redeem）和合并（Merge）要钱。
如果不解决这个问题，高频就是个伪命题。

我死磕了 **Gnosis Safe** 和 **Relayer**。
学会了手动构建 EIP-712 签名，学会了把交易打包发给 Relayer。

当第一笔 **Auto-Claim** 跑通时，我知道这个系统终于能“无人值守”了。

#### 阶段五：工业化 (V5)

现在的 V5，已经完全看不出 V1 的影子。

*   **Docker 化**：云端 7x24 小时运行。
*   **批量操作**：Batch API 取代单次下单，效率提升 10 倍。
*   **风控体系**：价格熔断、断连撤单、动态持仓上限。

#### 结语

回顾这段历程，最宝贵的收获不是代码，而是对**市场微观结构**的理解：

**既然无法预测未来，那就利用市场的低效，做一个安静的流动性搬运工。**

这，就是量化交易的魅力。
