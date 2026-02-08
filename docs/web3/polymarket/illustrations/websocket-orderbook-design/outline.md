---
type: infographic
density: balanced
style: notion
image_count: 3
language: zh
---

## Illustration 1

**Position**: 第37行后 / "#### 1. 核心决策：字典胜过列表"
**Purpose**: 对比字典 O(1) 和列表 O(n) 的效率差异
**Visual Content**: 左右对比布局
- 左侧 (列表): 一长串数据块，箭头需要从头扫到尾找 "价格 0.55"，标注 "O(n) - 慢"
- 右侧 (字典): 键值对结构，箭头直接指向 "0.55"，标注 "O(1) - 即时"
**Type Application**: 对比信息图
**Filename**: 01-infographic-dict-vs-list.png

## Illustration 2

**Position**: 第69行后 / "#### 2. 增量同步的"坑""
**Purpose**: 可视化增量更新逻辑 (更新 vs 删除)
**Visual Content**: 逻辑流程图
- 输入: 消息 {价格: 0.55, 数量: ?}
- 分支1 (数量 > 0): 动作 "更新/插入"，图标: 笔写入
- 分支2 (数量 == 0): 动作 "删除 (Pop)"，图标: 垃圾桶/橡皮擦
**Type Application**: 流程图
**Filename**: 02-flowchart-incremental-update.png

## Illustration 3

**Position**: 第93行后 / "#### 3. 数据过期即熔断"
**Purpose**: 可视化熔断安全机制
**Visual Content**: 安全开关机制
- 输入: 市场数据流 (时间: T)
- 检查: "(当前时间 - T) > 5000ms?"
- 路径A (否): 开关闭合，数据流向 "交易引擎"
- 路径B (是): 开关断开，数据阻断，动作 "停止交易"
**Type Application**: 系统架构图
**Filename**: 03-infographic-circuit-breaker.png
