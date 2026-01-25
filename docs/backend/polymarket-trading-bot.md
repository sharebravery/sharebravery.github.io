---
title: "Prediction Markets Series (1): Building a Polymarket Copy-Trading Bot from Scratch"
date: 2025-10-24
categories:
  - Backend
tags:
  - Backend
  - Web3
  - Polymarket
---


# Prediction Markets Series (1): Building a Polymarket Copy-Trading Bot from Scratch

> ⚠️ **Disclaimer**: This article explores technical implementation only. This is not financial advice. DYOR.

Prediction markets are mooning right now, so I started digging into Polymarket. I'm sharing my alpha here.

As developers, the best way to participate isn't to "gamble" on the outcome, but to **build the tools**.

Let's build a simple copy-trading bot for Polymarket.

Why? Because a copy-bot is the perfect "Engineering Dojo":
1.  **Simple Logic**: No complex probability modeling needed. Just watch the "Smart Money" wallets.
2.  **Full Coverage**: API interaction, signatures, order book matching, slippage control... you touch all the quant trading infra basics.

This article uses the **Polymarket Official API** to design and build a bot from scratch. WAGMI.

---

## 🏗️ Architecture: Minimalism

Entities should not be multiplied beyond necessity. The core loop is:

1.  **Listen**: Poll the target address for activity.
2.  **Decide**: Should we copy? How much?
3.  **Execute**: Fire the order via API.

---

## 🕵️ Step 1: Listen

First, we need to know what the target whale is doing. Polymarket provides a Data API for this.
While Websockets exist, for a simple bot, **Polling** is robust and easier to debug.

### Core Endpoint: Activity

We care about `/activity`.

```typescript
// Example: Get latest activity for a wallet
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

### 💡 Engineering Note: Deduplication

APIs can be flaky. You don't want to copy the same trade twice because of a network retry. **Best Practice**: Always use `transactionHash` as a unique key. Maintain a `Set<string>` in memory to track processed hashes.

---

## ⚡ Step 2: Execute

Once we see the target bought "Trump Win", we need to hit the **CLOB (Central Limit Order Book)**.

Polymarket has a great TypeScript SDK: `@polymarket/clob-client`. Use it. Don't hand-roll signatures unless you enjoy pain.

### Core Action: Order

Speed is key. We use **FAK (Fill-And-Kill)** market orders. We want liquidity NOW.

```typescript
import { ClobClient, Side, OrderType } from '@polymarket/clob-client';

async function followTrade(client: ClobClient, tokenId: string, amount: number) {
    // 1. Create Order Structure
    const order = await client.createMarketOrder({
        tokenID: tokenId,
        amount: amount,
        side: Side.BUY,  // or Side.SELL
    });

    // 2. Sign and Send
    const response = await client.postOrder(order, OrderType.FAK);
    console.log('Trade Result:', response);
}
```

### 💡 Engineering Note: Slippage Protection

The whale buys at $0.50. By the time your bot wakes up, bots might have pushed it to $0.60. Always check the Orderbook first.

```typescript
// Pseudo-code: Slippage Check
const book = await client.getOrderBook(tokenId);
const bestAsk = book.asks[0].price;

if (Math.abs(bestAsk - targetPrice) / targetPrice > MAX_SLIPPAGE) {
    console.warn("⚠️ Slippage too high, aborting.");
    return;
}
```

---

## 🕳️ The "Gotchas"

### 1. Proxy Wallets

Polymarket uses Proxy Wallets for gas-less trading.
-   **Frontend Address**: The Proxy.
-   **Your Key**: Controls the EOA (Externally Owned Account) that controls the Proxy.
-   **Code**: When initializing the SDK, know your `SIGNATURE_TYPE`. Metamask keys usually need EOA mode.

### 2. "Sell" vs "Redeem"

Two ways to exit:
-   **Sell**: Selling the token to someone else.
-   **Redeem**: If the event ended, or you hold both `Yes` and `No` (a complete set), you **Redeem**, you don't Sell. Your bot needs to handle both.

### 3. API Rate Limits

Don't spam. Cloudflare will ban you. If you monitor many addresses, use a proxy pool or rate-limit your `fetch` calls.

---

## 📦 Summary

Writing the bot is easy. Handling edge cases is hard.
Start with an MVP using the SDK. Then optimize for **Slippage**, **Gas**, and **Capital Efficiency**.

Happy Coding! 🐳

---

### 🔗 Resources

- [Polymarket API Docs](https://docs.polymarket.com/)
- [CLOB Client SDK](https://github.com/Polymarket/clob-client)
