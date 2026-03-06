# Message Handling & Disconnect Flow — Flowchart

Minimalist hand-drawn line art style (Notion aesthetic). Clean white background (#FFFFFF), black outlines (#1A1A1A), with pastel accents. Slight hand-drawn wobble on all lines and shapes.

Layout: Left-to-right main flow with a downward exception branch. Generous whitespace.

MAIN FLOW (left to right):

1. START: Rounded pill shape labeled "Connect" with a small plug icon
2. Arrow right to a fork (two parallel paths):
   - TOP PATH: Small loop icon labeled "Heartbeat" with "PING / 10s" annotation, pastel blue (#A8D4F0) fill
   - BOTTOM PATH: Arrow to box labeled "Subscribe" with "assets_ids[]" annotation

3. Both paths merge into: Large rounded rectangle labeled "消息循环" (Message Loop) with pastel yellow (#F9E79F) fill

4. Inside message loop, a decision diamond: "PONG?"
   - Yes → skip (small curved arrow back to loop)
   - No → next diamond: "过期?" (Stale?)
     - Yes → branch DOWN to exception flow
     - No → four output boxes in a fan pattern:
       - "book" → "更新盘口"
       - "price_change" → "更新报价"
       - "trade" → "记录成交"
       - "tick_size" → "更新刻度"

EXCEPTION BRANCH (downward from main flow):
- "数据过期" diamond leads to: Red-outlined (#E74C3C light) box "停止交易"
- "断连" event leads to two sequential boxes:
  1. "撤销所有挂单" (pastel pink #FADBD8 fill) — with bold annotation "先撤单!"
  2. "等待 2s → 重连" — arrow loops back up to "Connect"

Small annotation near the exception branch: "顺序不能反"

STYLE: Hand-drawn wobble lines, single weight, pastel fills only on key elements. Most shapes are white with black outline. Decision diamonds slightly tilted for hand-drawn feel.

No gradients, no complex textures. Clean and readable at small sizes.

ASPECT: 16:9
