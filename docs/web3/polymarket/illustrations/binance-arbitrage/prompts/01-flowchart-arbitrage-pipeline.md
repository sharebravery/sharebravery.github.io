# Illustration Prompt: 套利策略流程图

## Type
flowchart

## Style  
notion

## Content

**Title**: 币安价格驱动的套利流程

**Layout**: 左到右水平流程

**STEPS**:
1. **价格源** - 币安WebSocket实时推送BTC价格，REST初始化
2. **定价模型** - 线性映射(delta系数) + EMA动态偏移
3. **触发逻辑** - 安全价 vs 盘口阈值判断
4. **双边下单** - Yes+No批量挂单
5. **风控闭环** - 突变防御 + 敞口控制 + 安全限价

**CONNECTIONS**: 实线箭头表示数据流向，每个环节用圆角矩形卡片展示

**LABELS**: 
- 价格源显示"Binance WebSocket"
- 定价模型显示公式 "fair_price = base + Δ * delta"
- 触发逻辑显示条件 "safe_buy - best_bid > threshold"
- 双边下单显示"Yes + No → 1.00"
- 风控闭环显示三个检查点图标

**COLORS**:
- 卡片背景: 浅灰 #F7F7F5
- 箭头: Notion蓝 #2383E2
- 文字: 深灰 #37352F

**STYLE**: Notion极简手绘线条风格，圆角矩形卡片，简洁图标，单色箭头

**ASPECT**: 16:9
**COMPLEXITY**: moderate
