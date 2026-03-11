---
title: OpenClaw Skills 生态导航：从 5490 个插件中找到你需要的
date: 2026-03-10
categories:
  - AI
tags:
  - OpenClaw
  - Agent
  - Skills
cover: /covers/tools/openclaw-skills-guide.png
---

# OpenClaw Skills 生态导航：从 5490 个插件中找到你需要的

OpenClaw 有 295,000+ GitHub stars。它的 Skills 生态是最大的卖点之一。

官方 ClawHub 托管了 13,729 个 skills。但不是所有都值得装。

这篇文章帮你筛选、分类、避坑。

## 什么是 Skill

Skill 是 OpenClaw 的插件。它让 Agent 获得新能力：

- 读写 GitHub 仓库
- 控制浏览器自动化
- 连接数据库执行查询
- 调用外部 API

一个 skill 通常包含：
- 自然语言描述（告诉 Agent 什么时候用）
- 工具定义（具体能做什么）
- 执行代码（实际逻辑）

安装后，你用自然语言告诉 OpenClaw "帮我做 X"，Agent 会自动选择合适的 skill 执行。

## 官方过滤了什么

Awesome OpenClaw Skills 从 13,729 个中筛选出 5,494 个。被排除的：

| 类型 | 数量 | 原因 |
|------|------|------|
| 垃圾/测试账号 | 4,065 | 批量注册、测试内容 |
| 重复/相似名称 | 1,040 | 功能雷同 |
| 非英语描述 | 604 | 无法审核 |
| 加密/金融/交易 | 573 | 风险较高 |
| 安全审计标记恶意 | 373 | 存在安全风险 |
| 描述不完整 | 247 | 少于 3 个词 |
| 其他协议类 | 38 | ERC/x402/a2a |

**重要**：筛选不代表审计。安装前仍需自己审查代码。

## 核心分类导航

### 开发工具类（1,360+）

**Git & GitHub (170)**

常用：
- `github` - 仓库操作、PR 管理
- `git-operations` - 本地 git 命令

**Coding Agents & IDEs (1,222)**

常用：
- `code-review` - 代码审查
- `test-generator` - 自动生成测试
- `refactor` - 重构建议

**Web & Frontend Development (938)**

常用：
- `react-component` - React 组件生成
- `tailwind` - Tailwind CSS 辅助

**DevOps & Cloud (409)**

常用：
- `docker` - 容器管理
- `aws-cli` - AWS 操作
- `vercel` - 部署管理

### 自动化类（367+）

**Browser & Automation (335)**

常用：
- `playwright` - 浏览器自动化
- `web-scraper` - 网页抓取
- `form-filler` - 表单填写

**CLI Utilities (186)**

常用：
- `shell-executor` - 执行 shell 命令
- `file-manager` - 文件操作

**Self-Hosted & Automation (32)**

常用：
- `cron-jobs` - 定时任务
- `webhook-server` - 接收 webhook

### 信息获取类（350+）

**Search & Research (350)**

常用：
- `web-search` - 网络搜索
- `documentation` - 文档查询
- `arxiv` - 论文搜索

**Data & Analytics (28)**

常用：
- `sql-query` - 数据库查询
- `chart-generator` - 图表生成

### 生产力类（415+）

**Productivity & Tasks (206)**

常用：
- `todoist` - 任务管理
- `notion` - Notion 操作
- `calendar` - 日历管理

**Notes & PKM (71)**

常用：
- `obsidian` - Obsidian 笔记
- `markdown` - Markdown 处理

**Communication (149)**

常用：
- `slack` - Slack 消息
- `email` - 邮件发送
- `telegram` - Telegram 消息

### 内容创作类（280+）

**Image & Video Generation (169)**

常用：
- `image-generator` - 图片生成
- `ffmpeg` - 视频处理

**Media & Streaming (85)**

常用：
- `youtube` - YouTube 操作
- `spotify` - Spotify 控制

**PDF & Documents (111)**

常用：
- `pdf-reader` - PDF 解析
- `docx` - Word 文档处理

### 其他实用类

**Apple Apps & Services (44)**

常用：
- `shortcuts` - iOS 快捷指令
- `reminders` - 提醒事项

**Health & Fitness (88)**

常用：
- `workout-tracker` - 运动记录
- `nutrition` - 营养分析

**Finance (21)**

注意：这类 skills 风险较高，谨慎使用。

## 安装方法

### 方法一：ClawHub CLI（推荐）

```bash
npx clawhub@latest install <skill-slug>
```

示例：
```bash
npx clawhub@latest install github
npx clawhub@latest install web-search
```

### 方法二：手动安装

```bash
# 复制到全局目录
cp -r <skill-folder> ~/.openclaw/skills/

# 或复制到项目目录
cp -r <skill-folder> ./skills/
```

### 方法三：让 Agent 自己装

直接把 GitHub 仓库链接发给 OpenClaw：
```
帮我安装这个 skill：https://github.com/xxx/xxx-skill
```

Agent 会自动处理下载和配置。

## 安全检查清单

安装任何 skill 前检查：

### 1. 查看来源

- 作者是否可信？
- 仓库是否有持续维护？
- Issue 里是否有人报告问题？

### 2. 检查 VirusTotal

在 ClawHub 页面查看 VirusTotal 扫描报告。

### 3. 阅读代码

重点关注：
- 是否有网络请求到可疑地址
- 是否读取敏感文件（.env, id_rsa）
- 是否执行外部下载的代码

### 4. 检查权限

Skill 需要什么权限？
- 文件读写
- 网络访问
- 执行命令

是否超出功能需要的范围？

### 5. 使用沙箱

首次运行新 skill：
- 使用测试账户
- 使用测试钱包
- 隔离敏感数据

## 推荐安全工具

- [Snyk Skill Security Scanner](https://github.com/snyk/agent-scan)
- [Agent Trust Hub](https://ai.gendigital.com/agent-trust-hub)

## Skill 开发入门

如果你想自己写 skill：

```bash
# 创建 skill 目录
mkdir -p ~/.openclaw/skills/my-skill

# 创建配置文件
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

Agent 会根据 SKILL.md 的描述自动调用。

## 生态趋势

OpenClaw 被 OpenAI 收购后，Skills 生态在快速演进：

- 官方在加强安全审核
- 社区在产出更多垂直领域 skills
- Skills 数量每月增长 10%+

**值得关注的信号**：
- 官方是否会推出付费 skills 市场
- 是否会开放更多系统级 API
- Agent-to-Agent 协议能否打通 skills 互通

---

**参考来源：**
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [ClawHub Skills Registry](https://www.clawhub.ai/)
- [OpenClaw 官方文档](https://openclaw.ai)
