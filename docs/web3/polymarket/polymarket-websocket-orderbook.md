---
title: Polymarket 量化交易实战（三）：WebSocket 实时数据流
shortTitle: WebSocket 实时数据流
date: 2025-10-08
categories:
  - 量化交易
  - Polymarket
tags:
  - Python
  - Web3
order: 3
cover: /covers/polymarket/polymarket-websocket-orderbook.png
---

# Polymarket 量化交易实战（三）：WebSocket 实时数据流

**HTTP 轮询拿到的价格，是历史。**

V1 版本的 Bot 用 REST API 轮询盘口，2 秒一次。结果很直接：单子要么成交不了，要么成交即亏损。

原因是预测市场的盘口变化快，2 秒的延迟足以让你看到的价格和实际价格完全脱节。要做量化，必须接 WebSocket。

---

## Polymarket WebSocket 架构

Polymarket 提供两个 WebSocket 服务：

1. **CLOB WebSocket** - `wss://ws-subscriptions-clob.polymarket.com/ws/market`
   用于订阅盘口、成交、价格变动等市场数据

2. **RTDS** - `wss://ws-live-data.polymarket.com`
   用于实时价格流和评论数据

量化交易主要用 CLOB WebSocket。它有两个频道：

- **Market Channel** - 公开市场数据，不需要认证
- **User Channel** - 订单状态推送，需要 API Key 认证

## 连接与订阅

连接 Market Channel 不需要认证，直接发送订阅消息：

```python
import websockets
import json

WS_URL = "wss://ws-subscriptions-clob.polymarket.com/ws/market"

async def subscribe(ws, asset_ids: list[str]):
    """订阅指定 token 的市场数据"""
    msg = {
        "assets_ids": asset_ids,
        "type": "market"
    }
    await ws.send(json.dumps(msg))
```

连接建立后，可以动态增减订阅：

```python
# 追加订阅
await ws.send(json.dumps({
    "assets_ids": [new_token_id],
    "type": "market",
    "operation": "subscribe"
}))

# 取消订阅
await ws.send(json.dumps({
    "assets_ids": [old_token_id],
    "type": "market",
    "operation": "unsubscribe"
}))
```

User Channel 需要认证，订阅格式不同：

```python
# User Channel 需要 API Key 认证
msg = {
    "markets": [condition_id],
    "type": "user",
    "auth": {
        "apiKey": api_key,
        "secret": secret,
        "passphrase": passphrase
    }
}
```

注意区分：Market Channel 用 `assets_ids`（token ID），User Channel 用 `markets`（condition ID）。搞混了就收不到消息。

## Market Channel 消息类型

订阅成功后会收到多种消息，每种用途不同。

### book - 盘口快照

首次订阅或盘口变动时推送，包含完整的买卖盘数据：

```json
{
  "event_type": "book",
  "asset_id": "token_id",
  "market": "condition_id",
  "timestamp": "1700000000000",
  "buys": [
    { "price": "0.55", "size": "100" },
    { "price": "0.54", "size": "200" }
  ],
  "sells": [
    { "price": "0.60", "size": "50" },
    { "price": "0.61", "size": "150" }
  ],
  "hash": "0xabc..."
}
```

`buys` 和 `sells` 是 OrderSummary 数组，每一项包含 `price`（价格）和 `size`（该价位的可用数量）。注意字段都是字符串，需要自己转换。

`hash` 是盘口内容的哈希值，可以用来校验本地维护的盘口是否和服务端一致。

### price_change - 价格变动

有人下单或撤单时推送：

```json
{
  "event_type": "price_change",
  "market": "condition_id",
  "price_changes": [
    {
      "asset_id": "token_id",
      "price": "0.56",
      "size": "100",
      "side": "BUY",
      "best_bid": "0.55",
      "best_ask": "0.60"
    }
  ],
  "timestamp": "1700000000000"
}
```

这个消息直接告诉你当前的 best_bid 和 best_ask，不需要自己从完整盘口计算。对于只关心最优报价的策略，这个消息比 book 更高效。

### last_trade_price - 最新成交

有成交时推送：

```json
{
  "event_type": "last_trade_price",
  "asset_id": "token_id",
  "price": "0.55",
  "side": "BUY",
  "size": "50",
  "fee_rate_bps": "0",
  "timestamp": "1700000000000"
}
```

`fee_rate_bps` 是手续费率（基点），`side` 是主动方向。

### tick_size_change - 最小刻度变化

当价格接近 0 或 1 时（>0.96 或 <0.04），最小报价刻度会改变：

```json
{
  "event_type": "tick_size_change",
  "asset_id": "token_id",
  "old_tick_size": "0.01",
  "new_tick_size": "0.001"
}
```

这个消息容易被忽略。如果你的策略在极端价格区间运行（比如事件即将结算），不处理刻度变化会导致下单被拒。

## 心跳维护

WebSocket 连接需要定时发送心跳，否则会被服务端断开：

```python
import asyncio

async def heartbeat(ws):
    """每 10 秒发送一次 PING"""
    while True:
        await ws.send("PING")
        await asyncio.sleep(10)
```

实际使用中，心跳和消息处理要并行运行：

```python
async def run():
    async with websockets.connect(WS_URL) as ws:
        await subscribe(ws, asset_ids)

        # 并行：心跳 + 消息处理
        await asyncio.gather(
            heartbeat(ws),
            handle_messages(ws)
        )
```

## 数据过期保护

WebSocket 不是万能的。网络抖动、服务端重启都会导致数据中断。

每条消息都带 `timestamp`，用它判断数据是否过期：

```python
MAX_STALE_MS = 5000  # 5 秒

def is_stale(msg_timestamp: str) -> bool:
    age = time.time() * 1000 - int(msg_timestamp)
    return age > MAX_STALE_MS
```

数据过期时，策略应该停止交易，而不是降级到 HTTP 轮询。HTTP 拿到的数据延迟更大，基于过时数据交易只会亏更多。

断连时的处理原则：**先撤单，再重连。**

```python
async def handle_disconnect():
    # 1. 立即撤销所有挂单
    await client.cancel_all()
    # 2. 等待后重连
    await asyncio.sleep(2)
    await reconnect()
```

## 完整的消息处理框架

把上面的内容串起来：

```python
async def handle_messages(ws):
    async for raw in ws:
        if raw == "PONG":
            continue

        msg = json.loads(raw)
        event = msg.get("event_type")

        if is_stale(msg.get("timestamp", "0")):
            logger.warning("数据过期，跳过")
            continue

        if event == "book":
            update_orderbook(msg)
        elif event == "price_change":
            on_price_change(msg)
        elif event == "last_trade_price":
            on_trade(msg)
        elif event == "tick_size_change":
            on_tick_size_change(msg)
```

---

## 总结

WebSocket 接入的关键点：

1. Market Channel 用 `assets_ids` 订阅，User Channel 用 `markets` + 认证
2. `book` 消息给全量盘口，`price_change` 给增量变动和最优报价
3. 每 10 秒发 PING 维持心跳
4. 数据过期就停止交易，断连先撤单再重连

拿到实时数据流，才有资格谈量化。

---

### 参考

- [Polymarket WSS Overview](https://docs.polymarket.com/developers/CLOB/websocket/wss-overview)
- [Market Channel](https://docs.polymarket.com/developers/CLOB/websocket/market-channel)
- [WSS Quickstart](https://docs.polymarket.com/quickstart/websocket/)
