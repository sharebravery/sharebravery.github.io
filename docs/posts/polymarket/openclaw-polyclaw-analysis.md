---
title: OpenClaw 能交易 Polymarket 吗：AI Agent 在预测市场的边界
# shortTitle: AI Agent 交易边界
date: 2026-03-10
categories:
  - Web3
tags:
  - Polymarket
  - OpenClaw
  - Agent
cover: /covers/polymarket/ai-agent-trading-boundary.png
---

# OpenClaw 能交易 Polymarket 吗：AI Agent 在预测市场的边界

2026 年 1 月底，OpenClaw 爆火。一个月后，创始人 Peter Steinberger 加入 OpenAI，负责"下一代个人 Agent"。

很多人问：能不能用 OpenClaw 在 Polymarket 上交易？

Notion CEO Ivan Zhao 在访谈中把 OpenClaw 定位得很清楚：**面向极客、单人使用、强大但复杂**。它是给"想自己折腾的人"用的，不是给普通用户的现成方案。

答案取决于你愿意写多少代码。

## OpenClaw 爆火背后的需求

OpenClaw 是一个自托管的个人 AI 助手。你通过 Telegram、WhatsApp、Discord 发消息给它，它能执行命令、读写文件、控制浏览器。

爆火的原因不是技术突破，而是需求被点燃了：

- 人们想要一个"能在后台异步运行的 Agent"
- 人们想要"自己的 Agent"，数据在自己机器上
- 人们想要从手机消息控制

Mac Mini 销量跟着涨。很多人专门买一台 24/7 运行。

但 OpenClaw 本身不交易。它是一个**执行框架**，支持 Skills 插件。要交易 Polymarket，需要自己写 Skill 或用别人写的。

## 谁在 Polymarket 上赚钱

Polymarket 官方 Newsletter "The Oracle" 最近采访了几个顶级交易者。

**RememberAmalek**：在 NYC 市长选举中，Zohran Mamdani 的胜率只有 8% 时他开始买入。最终赚了 **$300K**。他的策略是"高确信的方向性押注"，专注选举和地缘政治。

**Doomberg**：一个匿名团队，成员是前大宗商品高管。他们用能源市场的专业知识预测地缘政治事件。

**Belikewater**：专业预测师，预测了以色列对伊朗的打击。她现在给 Khamenei 15% 的概率在 2025 年下台。

这些人的共同点：**都是领域专家，都有自己的信息源和分析框架**。

他们不是靠 AI 发现机会。AI 可能帮助他们执行，但判断来自人的专业知识。

## Split 策略：工程技巧不是 AI 魔法

Polymarket 基于 Gnosis 的 Conditional Tokens Framework。有一个特性叫 Split。

你可以把 1 USDC 拆分成 1 YES + 1 NO token。无论结果如何，你一定有一边值 $1。

这带来一种不同的入场方式：

```
传统：在订单簿挂买单，等成交
Split：先拆分拿到 YES + NO，再卖掉不需要的
```

**什么场景有用？**

- 流动性差的长尾市场：挂单可能永远成交不了，Split 保证入场
- 需要确定性入场：Split 是链上交易，100% 成功

**代价**：如果卖不掉不需要的那边，你就锁定了本金。相当于花了 $1 持有一个一定会值 $1 的组合（YES + NO = $1）。

这是合约设计的特性，不是 AI 发明的。任何能调用合约的代码都能做。Chainstack 的 PolyClaw 示例项目展示了怎么实现，但逻辑本身是通用的。

## AI 在交易中的角色：筛选器不是决策者

那 AI 能做什么？

一个实际场景：**跨市场对冲发现**。

假设有这些市场：
- A：特朗普是否赢得大选？
- B：共和党是否赢得大选？

如果 A 发生，B 一定发生。这是逻辑蕴涵。AI 可以扫描成百上千个市场，找出这种关系。

但有个硬约束：**只接受逻辑必然的蕴涵**。"可能"、"通常"不算。相关性不等于因果。

这个工作适合 AI：大量文本、语义理解、模式发现。但最终的交易决策——要不要入场、仓位多大——还是人来做。

**AI 不应该做的事情：**

- 直接下单：价格、数量、时机需要精确控制
- 管理仓位：需要实时计算和风控逻辑
- 处理交易失败：需要重试、回滚逻辑

这些是工程问题，需要硬编码解决。

## Cloudflare 封锁：工程问题

Polymarket 的 CLOB API 有 Cloudflare 保护。很多 IP 会被 403。

这是纯工程问题。解决方案：

- 使用住宅代理
- 请求失败时自动重试、切换 IP
- 或者用 Split 策略后不卖，绕过 CLOB

这些都需要代码实现。AI 帮不了。

## 实际案例：$115K/周是真的吗

FlyPix 报道了一个 OpenClaw + Polymarket 单周赚 $115K 的案例。

需要厘清几点：

1. 这是**做市商策略**：在市场双方挂单，赚买卖价差。需要资金量、库存管理、风险控制。
2. 这不是方向性交易：不是"AI 告诉我买 YES"那种。
3. 这是极罕见案例：不是典型结果。

做市需要的是实时盘口监控、精确的库存计算、快速挂单撤单。这些都需要专业交易系统，不是发消息给 AI 就能解决的。

FlyPix 建议启动资金 $5,000-$10,000。如果你没有交易经验，不建议从这个起点开始。

## 现实边界

**OpenClaw 能做的：**

- 作为框架，在后台运行你写的交易脚本
- 通过消息平台发送信号和报告
- 让你从手机远程控制

**OpenClaw 不能做的：**

- 自动发现盈利机会：这是策略问题，需要你自己设计
- 替代交易系统：执行逻辑需要你自己写
- 解决监管问题：CFTC 在关注预测市场的自动化交易

## 什么时候用什么工具

| 需求 | 工具 |
|------|------|
| 定时执行策略 | Cron + Python 脚本 |
| 需要人工确认 | OpenClaw + 消息平台 |
| 语义分析筛选标的 | LLM API |
| 24/7 运行 | 服务器 + 监控 |

OpenClaw 的价值在于把脚本变成消息可控的服务。但脚本本身要你写。

## 结论

OpenClaw 爆火反映的是人们对"个人 Agent"的期待。但在交易场景，定位要清楚：

- **策略来自人**：RememberAmalek 的 $300K 来自对选举的理解，不是 AI
- **执行用代码**：Split 策略、CLOB 交互是工程问题，需要精确控制
- **AI 做筛选**：扫描市场、发现关系、提取信号

把 AI 当成交易员是危险的。把 AI 当成助手，配合你自己的专业知识和代码，是更稳的方式。

Ivan Zhao 把 OpenClaw 定义为"极客工具"。这个定位很准。如果你不愿意写代码、不愿意调试、不愿意承担风险，那它不适合你。

---

**参考来源：**
- The Oracle by Polymarket：顶级交易者访谈
- Notion CEO Ivan Zhao 访谈（Access Podcast）：OpenClaw 定位分析
- Polymarket Python SDK 文档
- Gnosis Conditional Tokens Framework
