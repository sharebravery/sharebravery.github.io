# Illustration Prompt: 风控体系框架图

## Type
framework

## Style
notion

## Content

**Title**: 三重风控防护体系

**STRUCTURE**: 三层金字塔/盾牌结构，从上到下

**TOP LAYER - 价格突变防御**:
- 层级标签: "Layer 1: 价格突变防御"
- 核心机制: "BTC价格波动 > 阈值 → 暂停挂单"
- 检查项: 
  - "Δ > $1000/min → HALT"
  - "防止极端行情被动成交"
- 图标: 闪电警告 ⚡
- 颜色: 红色警示 #E03E3E

**MIDDLE LAYER - 敞口控制**:
- 层级标签: "Layer 2: 敞口控制"
- 核心机制: "单边持仓 > 上限 → 停止加仓"
- 检查项:
  - "Yes仓位 > 9份 → 只买No"
  - "保持对冲平衡"
- 图标: 天平图标 ⚖️
- 颜色: 黄色警告 #DFAB01

**BOTTOM LAYER - 安全限价**:
- 层级标签: "Layer 3: 安全限价"
- 核心机制: "挂单价 ≤ 模型安全上限"
- 检查项:
  - "bid_price ≤ adjusted_fair - margin"
  - "防止诱导成交"
- 图标: 盾牌图标 🛡️
- 颜色: 绿色安全 #0F7B6C

**CONNECTIONS**:
- 三层从上到下依次保护
- 右侧标注"策略核心"（中心被保护区域）

**LABELS**:
- 顶部大标题"风控闭环"
- 每层显示触发条件和响应动作
- 底部小字"宁可错过，不要犯错"

**COLORS**:
- 整体: 白色背景
- 每层用对应颜色的边框和图标
- 中心保护区: 浅灰填充

**STYLE**: Notion层级卡片风格，金字塔/盾牌形状，三色层级清晰

**ASPECT**: 16:9
**COMPLEXITY**: moderate
