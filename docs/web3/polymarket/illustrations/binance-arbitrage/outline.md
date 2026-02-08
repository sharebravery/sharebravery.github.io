---
type: mixed
density: balanced
style: notion
image_count: 4
---

## Illustration 1: 全局架构流程图

**Position**: 引言后，第1节前
**Purpose**: 展示整套套利策略的5个环节串联关系
**Visual Content**: 价格源 → 定价模型 → 触发逻辑 → 双边下单 → 风控闭环的流程图
**Type Application**: flowchart - 展示端到端的处理流程
**Filename**: 01-flowchart-arbitrage-pipeline.png

## Illustration 2: 定价模型机制图

**Position**: 第3节 "定价模型" 后
**Purpose**: 可视化线性映射公式和EMA动态偏移的工作原理
**Visual Content**: BTC价格变化 → delta系数映射 → Poly公平价 → EMA偏移调整 → 最终公平价
**Type Application**: framework - 展示模型组件关系和数据流
**Filename**: 02-framework-pricing-model.png

## Illustration 3: 双边套利结构图

**Position**: 第5节 "双边挂单" 后
**Purpose**: 说明Yes+No合成头寸的套利逻辑
**Visual Content**: 左侧Yes订单 + 右侧No订单 → 中间合并 = $1.00，成本0.80显示利润空间
**Type Application**: framework - 展示套利结构和价值合成
**Filename**: 03-framework-bilateral-structure.png

## Illustration 4: 风控体系框架图

**Position**: 第6节 "风控设计" 后
**Purpose**: 展示三重风控机制如何保护策略
**Visual Content**: 三层防护：价格突变防御（顶层）、敞口控制（中层）、安全限价（底层）
**Type Application**: framework - 展示风控层级和防护关系
**Filename**: 04-framework-risk-control.png
