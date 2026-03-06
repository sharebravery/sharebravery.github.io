---
type: mixed
density: minimal
style: notion
image_count: 2
---

## Illustration 1 — WebSocket 架构总览

**Position**: "两个 WebSocket，选哪个" 章节末尾
**Purpose**: 让读者一眼看清 Polymarket 的 WebSocket 架构层级
**Type**: framework
**Visual Content**:
- 顶层：Polymarket WebSocket 服务
- 左分支：CLOB WebSocket → Market Channel（公开，无需认证）+ User Channel（需 API Key）
- 右分支：RTDS（实时价格流）
- Market Channel 下列出四种消息类型：book / price_change / last_trade_price / tick_size_change
- 标注 assets_ids vs markets 的区别
**Filename**: 01-framework-ws-architecture.png

## Illustration 2 — 消息处理与断连流程

**Position**: "完整的消息处理框架" 章节前
**Purpose**: 可视化从连接到消息分发到异常处理的完整流程
**Type**: flowchart
**Visual Content**:
- 起点：WebSocket Connect
- 分叉：Subscribe + Heartbeat (PING/10s)
- 消息循环：收到消息 → PONG? skip → 过期检查 → 分发到 book/price_change/trade/tick_size
- 异常分支：数据过期 → 停止交易 / 断连 → 撤单 → 重连
**Filename**: 02-flowchart-message-handling.png
