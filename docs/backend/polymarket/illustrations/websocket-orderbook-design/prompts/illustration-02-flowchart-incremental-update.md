Incremental Update Logic Flow

Layout: vertical flowchart

START NODE: "收到消息 (Price: 0.55, Size: ?)"

DECISION NODE (Diamond): "Size == 0 ?"

BRANCH NO (Size > 0):
- Path: Left
- Action Node: "更新/插入 (Update)".
- Icon: Pen writing on paper.
- Result: "OrderBook[0.55] = Size"

BRANCH YES (Size == 0):
- Path: Right
- Action Node: "删除 (Delete)".
- Icon: Trash bin or Eraser.
- Result: "Pop OrderBook[0.55]"

STYLE: Notion style. Minimalist hand-drawn line art, simple geometric shapes.
ASPECT: 16:9
