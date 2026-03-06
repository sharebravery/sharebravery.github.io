# Illustration Prompt: 定价模型机制图

## Type
framework

## Style
notion

## Content

**Title**: 定价模型：线性映射 + EMA偏移

**STRUCTURE**: 水平流程 + 反馈循环

**NODES**:
- **BTC价格源** - 实时价格 btc_now (例: $102,500)
- **基准记录** - btc_base: $100,000, poly_base: 0.65
- **Delta映射** - 公式框: `Δ = btc_now - btc_base = +$2,500`
- **线性转换** - 公式框: `fair = 0.65 + 2500 * 0.00001 = 0.675`
- **EMA偏移** - 公式框: `bias = market_mid - fair`, `ema_bias = α*bias + (1-α)*ema`
- **最终公平价** - `adjusted_fair = 0.675 + ema_bias`

**RELATIONSHIPS**:
- BTC价格源 → Delta计算
- Delta计算 → 线性转换 → 初步公平价
- 初步公平价 + EMA偏移 → 最终公平价
- 市场实际价 → EMA偏移（反馈循环虚线）

**LABELS**: 
- 每个节点显示具体数值示例
- Delta节点显示系数 "δ = 0.00001"
- EMA节点显示 "α = 0.1 (平滑系数)"

**COLORS**:
- 主流程节点: 白色卡片 + 黑色边框
- 公式框: 浅蓝背景 #EBF3FA
- 反馈循环: 虚线绿色 #0F7B6C

**STYLE**: Notion简约风格，圆角矩形节点，实线/虚线箭头，公式用等宽字体

**ASPECT**: 16:9
**COMPLEXITY**: moderate
