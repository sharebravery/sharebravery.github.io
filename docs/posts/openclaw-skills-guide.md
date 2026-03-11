---
title: OpenClaw Skills 导航：5490 个插件怎么选
date: 2026-03-10
categories:
  - AI
tags:
  - OpenClaw
  - Agent
  - Skills
cover: /covers/tools/openclaw-skills-guide.png
---

# OpenClaw Skills 导航：5490 个插件怎么选

OpenClaw 有 29 万 GitHub stars，Skills 生态是核心卖点。ClawHub 上有 13,729 个 skills——但大部分不值得装。

Awesome OpenClaw Skills 筛了一遍，挑出 5,494 个。剩下的被排除：垃圾账号、功能重复、非英语描述、被安全审计标记的恶意插件。

## Skill 是什么

Skill 是 OpenClaw 的插件，让 Agent 获得新能力：读写 GitHub 仓库、控制浏览器、连数据库、调 API。

一个 skill 包含三部分：自然语言描述（告诉 Agent 什么时候用）、工具定义（能做什么）、执行代码（怎么做的）。

装好之后，你说"帮我把这个 PR 合了"，Agent 会自己选合适的 skill 执行。

## 官方筛掉了什么

被排除的 8,235 个：

- 垃圾/测试账号：4,065 个
- 重复/相似名称：1,040 个
- 非英语描述：604 个
- 加密/金融/交易：573 个
- 安全审计标记恶意：373 个
- 描述不完整：247 个
- 其他协议类：38 个

筛选不等于审计。装之前还是要自己看代码。

## 哪些值得装

### 开发工具（1,360+）

**Git & GitHub（170）**
- `github` — 仓库操作、PR 管理
- `git-operations` — 本地 git 命令

**Coding Agents（1,222）**
- `code-review` — 代码审查
- `test-generator` — 自动生成测试
- `refactor` — 重构建议

**Web 开发（938）**
- `react-component` — React 组件生成
- `tailwind` — Tailwind CSS 辅助

**DevOps（409）**
- `docker` — 容器管理
- `aws-cli` — AWS 操作
- `vercel` — 部署管理

### 自动化（367+）

**浏览器自动化（335）**
- `playwright` — 浏览器自动化
- `web-scraper` — 网页抓取
- `form-filler` — 表单填写

**CLI 工具（186）**
- `shell-executor` — 执行 shell 命令
- `file-manager` — 文件操作

**定时任务（32）**
- `cron-jobs` — 定时任务
- `webhook-server` — 接收 webhook

### 信息获取（350+）

**搜索（350）**
- `web-search` — 网络搜索
- `documentation` — 文档查询
- `arxiv` — 论文搜索

**数据分析（28）**
- `sql-query` — 数据库查询
- `chart-generator` — 图表生成

### 生产力（415+）

**任务管理（206）**
- `todoist` / `notion` / `calendar`

**笔记（71）**
- `obsidian` / `markdown`

**通讯（149）**
- `slack` / `email` / `telegram`

### 内容创作（280+）

**图片视频（169）**
- `image-generator` / `ffmpeg`

**媒体流（85）**
- `youtube` / `spotify`

**文档（111）**
- `pdf-reader` / `docx`

### 其他

**Apple 生态（44）**
- `shortcuts` / `reminders`

**健康（88）**
- `workout-tracker` / `nutrition`

**金融（21）** — 风险较高，谨慎

## 安装方法

**ClawHub CLI（推荐）**

```bash
npx clawhub@latest install github
npx clawhub@latest install web-search
```

**手动安装**

```bash
# 全局
cp -r <skill-folder> ~/.openclaw/skills/

# 项目级
cp -r <skill-folder> ./skills/
```

**让 Agent 自己装**

把 GitHub 链接发给它："帮我装这个 skill：https://github.com/xxx/xxx-skill"

## 安全检查

装任何 skill 之前：

1. **看来源** — 作者可信吗？仓库还在维护吗？Issue 里有人报问题吗？
2. **查 VirusTotal** — ClawHub 页面上有扫描报告
3. **读代码** — 有没有往奇怪地址发请求？有没有读 `.env`、`id_rsa`？有没有执行外部下载的代码？
4. **看权限** — Skill 要的权限和它声称的功能匹配吗？
5. **用沙箱** — 第一次跑用测试账户、测试钱包

安全工具：
- [Snyk Skill Security Scanner](https://github.com/snyk/agent-scan)
- [Agent Trust Hub](https://ai.gendigital.com/agent-trust-hub)

## 自己写一个

```bash
mkdir -p ~/.openclaw/skills/my-skill

cat > ~/.openclaw/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: A simple example skill
tools:
  - name: hello
    description: Say hello to someone
    parameters:
      name:
        type: string
        description: The name to greet
---

This skill greets people.
EOF
```

Agent 会根据 SKILL.md 的描述自动理解怎么用。

## 值得关注的信号

OpenClaw 被 OpenAI 收购后，生态变化很快：
- 官方在加强审核
- 社区产出在加速，每月涨 10% 左右
- 官方会不会出付费 skills 市场
- Agent-to-Agent 协议能不能打通 skills 互通

---

**参考来源：**
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [ClawHub Skills Registry](https://www.clawhub.ai/)
- [OpenClaw 官方文档](https://openclaw.ai)
