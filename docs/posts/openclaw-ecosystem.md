---
title: OpenClaw 生态全景：衍生版本与安装指南/防钓鱼指南
date: 2026-03-15
categories:
  - AI
tags:
  - OpenClaw
  - Agent
  - 开源
cover: /covers/tools/openclaw-ecosystem.png
---

# OpenClaw 生态全景

30 万 GitHub stars。OpenClaw 火了。也衍生出很多问题，这篇文章对一些常见问题给出答案。

火了之后，衍生版本多了，钓鱼网站也多了。

Peter Steinberger 是这么描述 OpenClaw 的：

> "它就像一个住在你电脑里的朋友，有点怪，但聪明得吓人。"

### 先说最重要的事：钓鱼网站

OpenClaw 需要的权限极高。它能读写你的文件、执行命令、控制浏览器。如果装了假版本，你的 API Key 就没了。

最近出现了模仿官网的钓鱼网站。域名只差一两个字母，页面做得一模一样。有人输入了密钥，然后发现密钥已经在别人的服务器上跑起来了。

记住这三个地址：官网 `openclaw.ai`，GitHub `github.com/OpenClaw`，文档 `docs.openclaw.ai`。安装命令只用官方的。任何网站让你输入 API Key 或私钥，关掉。

![openclaw](https://fastly.jsdelivr.net/gh/sharebravery/post@post/sharebravery/post/src/17735901256511773590125339.png)

```bash
# macOS/Linux
curl -fsSL https://openclaw.ai/install.sh | bash

# Windows
powershell -c "irm https://openclaw.ai/install.ps1 | iex"
```

### 一小时原型，30 万行代码

Peter Steinberger 是 PSPDFKit 创始人。公司 2021 年被 Insight Partners 以 1 亿欧元投资后，他"退休"了。

2025 年底，他想要一个能在手机上随时查看电脑状态的东西。但他没动手。

> "我觉得这事太显然了，大公司肯定会做。等到去年 11 月还没人做，我就想算了，我自己来。"

最初的版本极其简单：把 WhatsApp 接到 Claude Code 上。发条消息，它就调用 AI，把结果发回来。一个小时就搭完了。

现在 OpenClaw 有大约 30 万行代码，支持 Telegram、WhatsApp、Discord、飞书等 20 多个平台。

> "我觉得这就是未来的方向。每个人都会有一个超级强大的 AI，跟着你走完一生。"

### 不需要 Mac，Windows 也能跑

OpenClaw 官方写得很清楚：Any OS。很多人专门买 Mac Mini 跑 OpenClaw，没必要。

**Windows 用户怎么办？** 装 WSL2（Windows Subsystem for Linux），就是在 Windows 里跑一个 Linux 系统。打开 PowerShell，输入 `wsl --install`，重启后就有 Ubuntu，然后照常安装 OpenClaw 就行。

**有旧电脑？** 装个 Ubuntu Server（不要图形界面），当服务器跑。电费很低，24 小时在线。

**想用云服务器？** AWS、阿里云、腾讯云都行。只要能装 Node.js 就能跑。后面会详细说怎么选。

### 安装方式：选一个适合你的

官方有一键安装脚本，会自动处理依赖。

```bash
# macOS/Linux/WSL
curl -fsSL https://openclaw.ai/install.sh | bash

# Windows（PowerShell）
powershell -c "irm https://openclaw.ai/install.ps1 | iex"
```

装完后运行配置向导 `openclaw onboard`，按提示选择 AI 提供商、粘贴 API Key、选择消息平台，最后启动 `openclaw gateway`。访问 `http://127.0.0.1:18789/` 就能用网页界面。

**Docker 方式**适合服务器，后台 24/7 跑，不占用你主力电脑。

**宝塔/1Panel** 都能在应用商店搜索 OpenClaw 一键安装。图形界面，不用碰命令行，支持 QQ、飞书、微信渠道。宝塔生态成熟，教程多；1Panel 开源免费，界面更干净。都行。

### OpenClaw 没有大脑，你得给它配一个

OpenClaw 本身不提供 AI 能力。它需要"大脑"——一个 AI 模型的 API Key。

| 提供商 | 模型 | 特点 | 价格 |
|--------|------|------|------|
| Anthropic | Claude 3.5/4 | 能力强、安全合规 | 按量付费 |
| OpenAI | GPT-4o/GPT-4.1 | 生态成熟、文档全 | 按量付费 |
| DeepSeek | DeepSeek-V3 | 国产、便宜、能力强 | 便宜 |
| 智谱 | GLM-4 | 国产、中文友好 | 按量付费 |
| Moonshot | Kimi | 国产、长上下文 | 按量付费 |

Anthropic 和 OpenAI 需要海外网络。DeepSeek、智谱、Kimi 国内直接访问。DeepSeek 最便宜，日常几十块够用。Claude 最强但贵。

当然一般是使用 Coding Plan，很实惠，目前各大国内厂商都推出了首月 7.9 的套餐，支持国内主流大模型。GLM 是个很不错的国产模型，值得体验。

### 云服务器：海外还是国内？

想让 OpenClaw 24 小时在线，需要一台服务器。

**AWS 海外服务器**能直接访问 Anthropic、OpenAI API，GitHub、npm 等海外资源也快。新用户最高 $200 额度，注册送 $100，探索服务再拿 $100。需要信用卡验证，国内双币卡能用，部分银联卡也支持。

**国内服务器**微信、飞书集成方便，但访问 Claude/GPT API 需要代理。DeepSeek、智谱、Kimi 倒是直接能用。

| 平台 | 免费额度 | 优势 | 适合人群 |
|------|----------|------|----------|
| AWS | 最高 $200 | 服务全、稳定 | 有海外需求、想学云原生 |
| 阿里云 | 新用户有体验金 | 国内网络快 | 国内业务为主 |
| 腾讯云 | 新用户优惠券 | 微信生态集成 | 个人开发者 |
| 华为云 | 免费试用套餐 | 政企合规 | 企业用户 |

主要用 Claude/GPT 就选 AWS 或其他海外云，主要用国产模型国内云更方便，只是想试试本地电脑就够了。

AWS 的 $200 额度对学习绰绰有余。但注意免费期过后会收费，用完关实例。

### 国内封装平台：不想折腾用这些

官方版需要配置环境、获取 API Key。对普通人来说，门槛不低。国内大厂推出了封装版——一键安装，开箱即用。

**腾讯 QClaw** 微信扫码就能用。不用写代码、不用配环境，装完微信扫码登录就能干活。内测中，免费。

**智谱 AutoClaw** 主打浏览器自动化。安装包小，自带模型，不用配 API。适合自动填表、爬数据。免费。

**字节 ArkClaw** 云端 SaaS 版。7x24 小时在线，不用开电脑。飞书深度集成。收费，Lite 版免费 7 天。

**腾讯 WorkBuddy** 底层自研但兼容 OpenClaw 技能包。支持混元、DeepSeek、GLM、Kimi 等多模型切换。支持企微、QQ、飞书远程遥控。

想云端 24 小时跑选 ArkClaw，微信入口最方便选 QClaw，浏览器自动化选 AutoClaw，多模型切换选 WorkBuddy。

封装版本省事，但绑定了他们的平台。官方版更灵活，但需要折腾。

### 衍生版本：大部分没必要看

OpenClaw 开源后 60k forks。大部分只是改个名字，功能差不多。项目前身叫 Clawdbot 和 Moltbot，很多 fork 还叫这两个名字，是历史遗留，不是新变种。

有点特色的：warelay 侧重多平台消息转发，clawdis 是 Discord 社区常用。直接用官方版就行。

### Skills 不只是插件，是权限

Skills 是 OpenClaw 的插件系统。ClawHub 上有天气查询、翻译、新闻推送等。安装方式是在控制面板的 Skills 页面搜索，一键安装。

但有个警告。官方仓库里写得很直接：

> "there may be suspicious or malicious skills within this repo"

Skills 能访问你的文件和命令。装之前看一眼代码。不要装来路不明的。

### Telegram 最快，飞书国内更稳

Telegram 配置最简单：创建 Bot 拿到 Token，运行 `openclaw onboard` 选 Telegram，输入 Token，向 Bot 发消息就行。

飞书是内置支持的。配置比 Telegram 繁琐，但国内网络友好。流程是这样的：飞书开放平台创建企业自建应用 → 复制 App ID 和 App Secret → 配置权限和事件订阅 → 发布等审核 → 在 OpenClaw 里配置凭证 → 启动 → 配对。

事件订阅选长连接模式，不需要公网 IP。用 Lark 国际版的话，配置里加 `domain: "lark"`。

不想配置消息平台？装完直接访问 `http://127.0.0.1:18789/`，在网页上对话。这是最简单的体验方式。

### OpenClaw 权限很高

它能读写你的文件、执行命令、控制浏览器。

Peter 给 AI 的权限清单：邮件、日历、所有文件、Philips Hue 灯光、Sonos 音响。

> "它真的能把我锁在门外。"

不要让它访问敏感文件（钱包私钥、密码文件）。不要在不可信网络使用。不用了就关掉服务。

### OpenClaw vs Claude Code

两个都能控制电脑的 Agent，定位不同。

OpenClaw 通过消息平台交互，后台常驻，适合远程控制和监控。Claude Code 在终端里跑，适合开发工作流。

你在电脑前写代码？用 Claude Code。

你需要远程控制或后台跑任务？用 OpenClaw。

---

**相关资源**

- [OpenClaw 官网](https://openclaw.ai)
- [GitHub](https://github.com/OpenClaw/OpenClaw)
- [文档](https://docs.openclaw.ai)
- [ClawHub Skills](https://clawhub.ai)
- [Lobster 工作流](https://github.com/OpenClaw/lobster)

**国内封装平台**

- [腾讯 QClaw](https://wj.qq.com/s2/25871229/abe7/) - 微信入口
- [智谱 AutoClaw](https://autoglm.zhipuai.cn/autoclaw/) - 浏览器自动化
- [字节 ArkClaw](https://console.volcengine.com/ark/claw) - 云端 SaaS
- [腾讯 WorkBuddy](https://www.codebuddy.cn/work/) - 多模型切换

**大模型提供商**

- [Anthropic Claude](https://console.anthropic.com) - 海外
- [OpenAI](https://platform.openai.com) - 海外
- [DeepSeek](https://platform.deepseek.com) - 国产
- [智谱 GLM](https://open.bigmodel.cn) - 国产
- [Moonshot Kimi](https://platform.moonshot.cn) - 国产

**云服务器**

- [AWS Free Tier](https://aws.amazon.com/cn/free/) - $200 额度
- [阿里云](https://www.aliyun.com/)
- [腾讯云](https://cloud.tencent.com/)
