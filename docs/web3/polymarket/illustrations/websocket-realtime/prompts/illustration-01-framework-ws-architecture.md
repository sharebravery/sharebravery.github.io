# WebSocket Architecture Overview — Framework Diagram

Minimalist hand-drawn line art style (Notion aesthetic). Clean white background (#FFFFFF), black outlines (#1A1A1A), with pastel blue (#A8D4F0) and pastel yellow (#F9E79F) as accent fills. Slight hand-drawn wobble on all lines.

Layout: Top-down hierarchical tree diagram with generous whitespace.

TOP LEVEL:
- A rounded rectangle labeled "Polymarket WebSocket" at the top center

SECOND LEVEL (two branches):
- LEFT branch: Rounded box labeled "CLOB WebSocket" with pastel blue fill
  - Subtitle below: "wss://ws-subscriptions-clob..."
  - Annotation: "量化交易主要用这个"
- RIGHT branch: Rounded box labeled "RTDS" with light gray fill
  - Subtitle: "实时价格流"
  - Small note: "前端展示用"

THIRD LEVEL (under CLOB WebSocket, two sub-branches):
- LEFT sub: Box labeled "Market Channel" with pastel yellow fill
  - Tag below: "公开 · 无需认证"
  - Key label: "assets_ids (token ID)"
- RIGHT sub: Box labeled "User Channel" with pastel pink fill (#FADBD8)
  - Tag below: "私有 · 需 API Key"
  - Key label: "markets (condition ID)"

FOURTH LEVEL (under Market Channel, four small boxes in a row):
- "book" | "price_change" | "last_trade_price" | "tick_size_change"
- Each in a small rounded rectangle with thin black outline

CONNECTIONS: Simple hand-drawn arrows connecting levels. Dashed line between the two ID labels with a small warning icon and text "别搞混!"

No complex textures, no gradients. Maximum whitespace between elements. Single-weight line work throughout.

ASPECT: 16:9
