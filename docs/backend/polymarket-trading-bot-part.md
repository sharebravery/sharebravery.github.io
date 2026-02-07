---
title: 预测市场系列：从零开发 Polymarket 跟单 Bot
date: 2025-10-01
categories:
  - 后端技术
tags:
  - Backend
  - Web3
  - Polymarket
---

# 预测市场系列：从零开发 Polymarket 跟单 Bot

> 本文仅探讨技术实现，不构成投资建议

预测市场最近热度起飞。作为程序员，参与一个市场最好的方式不是去"赌"结果，而是去**建设工具**。

跟单 Bot 是最完美的"工程练兵场"：逻辑简单，但覆盖了 API 交互、签名机制、订单簿匹配、滑点控制等量化交易的基础设施。

这篇文章聊聊怎么从零设计并实现一个基于 Polymarket 官方 API 的跟单 Bot，以及开发过程中需要注意的"坑"。

---

## 架构设计：极简主义

如无必要，勿增实体。一个跟单 Bot 的核心逻辑流程大致如下：

1. **监听**：轮询目标地址的活动
2. **决策**：判断是否跟单，计算跟单金额
3. **执行**：调用交易接口下单

---

## 第一步：监听

要实现跟单，首先得知道目标地址干了什么。Polymarket 提供了 Data API 来查询用户活动。

虽然官方也提供了 WebSocket，但对于简单的跟单需求，**轮询**其实是最稳妥且容易实现的方案。

### 核心接口：Activity

我们需要关注的是 `/activity` 端点，它可以返回指定用户的交易记录。

```typescript
// 示例：获取目标地址的最近交易
const DATA_API_URL = 'https://data-api.polymarket.com/activity';

async function fetchLatestActivity(walletAddress: string) {
    const params = new URLSearchParams({
        user: walletAddress,
        limit: '20',
        sortBy: 'timestamp',
        sortDirection: 'desc'
    });

    const response = await fetch(`${DATA_API_URL}?${params}`);
    const data = await response.json();
    return data;
}
```

### 工程要点：状态去重

API 返回的数据可能有延迟或重复。你肯定不想因为网络波动，导致同一笔交易跟了两次。

**最佳实践**：务必使用 `transactionHash` 作为唯一键进行去重。在内存中维护一个 `Set<string>` 记录已处理的 Hash。

---

## 第二步：执行

一旦监听到目标地址有了新动作（比如买入了 `Trump Win`），我们就需要通过 **CLOB (Central Limit Order Book)** 接口进行跟单。

Polymarket 官方提供了非常完善的 TypeScript SDK `@polymarket/clob-client`，强烈建议直接使用，别自己去手搓签名逻辑。

### 核心操作：下单

跟单最讲究速度，所以我们通常使用 **FAK (Fill-And-Kill)** 类型的市价单。这种订单会立即吃掉盘口的流动性，未成交部分自动撤销，不会挂单暴露意图。

```typescript
import { ClobClient, Side, OrderType } from '@polymarket/clob-client';

async function followTrade(client: ClobClient, tokenId: string, amount: number) {
    // 1. 创建订单结构
    const order = await client.createMarketOrder({
        tokenID: tokenId,
        amount: amount, // 下单金额
        side: Side.BUY,  // 或 Side.SELL
    });

    // 2. 签名并发送
    const response = await client.postOrder(order, OrderType.FAK);
    console.log('跟单结果:', response);
}
```

### 工程要点：滑点保护

大佬买入的时候价格是 $0.5，等你收到信号去买的时候，价格可能已经被机器人抬到了 $0.6。

在下单前，一定要先查询当前的 Orderbook，计算滑点。

```typescript
// 伪代码：滑点检查
const book = await client.getOrderBook(tokenId);
const bestAsk = book.asks[0].price; // 市场卖一价

if (Math.abs(bestAsk - targetPrice) / targetPrice > MAX_SLIPPAGE) {
    console.warn("滑点过高，放弃跟单");
    return;
}
```

---

## 需要注意的"坑"

在实际开发中，你需要注意一些 Polymarket 特有的概念。

### 1. 账号体系 (Proxy Wallet)

Polymarket 为了实现免 Gas 交易，引入了 Proxy Wallet 机制。

- **前端显示的地址**：通常是你的 Proxy 地址
- **你持有的私钥**：是用来控制 Proxy 的 EOA (Externally Owned Account)
- **代码里填什么**：在使用 SDK 初始化时，务必搞清楚 `SIGNATURE_TYPE`。如果你用的是 Metamask 导出的私钥，通常需要配置为 EOA 签名模式，但操作的主体是 Proxy

### 2. "卖出" vs "赎回"

在二元市场里，获利了结有两种方式：

- **Sell (卖出)**：在市场上把 Token 卖给别人，这是最常见的
- **Redeem (赎回)**：如果事件已经结束（结算了），或者你同时持有了 `Yes` 和 `No` (即 Merge 了一套完整份额)，你需要做的是赎回操作，而不是卖出
- **Bot 逻辑**：你的 Bot 不仅要监听 `Buy/Sell`，还需要处理 `Redeem` 事件，否则会导致仓位残留

### 3. API 频率限制

Polymarket 的公共 API 有频率限制。如果你监听的地址列表很长，或者轮询速度太快，很容易被 Cloudflare 拦截。

**建议**：生产环境要么上代理池，要么合理控制 `fetch` 的间隔。

---

## 总结

写一个 Bot 并不难，难的是如何处理各种边界情况和异常。

通过官方文档和 SDK，我们可以快速搭建起一个 MVP。但要让它稳定盈利，还需要在**滑点控制**、**Gas 优化**以及**资金管理**上下功夫。

希望这篇文章能帮你迈出 Polymarket 量化开发的第一步。

---

### 相关资料

- [Polymarket 官方 API 文档](https://docs.polymarket.com/)
- [CLOB Client SDK](https://github.com/Polymarket/clob-client)
