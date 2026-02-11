---
title: 个人站 SEO：从买域名到被搜索到
shortTitle: 域名与 SEO
date: 2026-02-09
categories:
  - 观察
  - 建站
tags:
  - SEO
  - 域名
  - Cloudflare
  - GitHub Pages
cover: https://raw.githubusercontent.com/sharebravery/post/post/src/20260209115512077.png
---

# 个人站 SEO：从买域名到被搜索到

前几天买了 sharebravery.com域名，把我的个人网站从 GitHub Pages 的二级域名切换到自定义域名。也把我的个人网站从技术博客升级为内容网站，顺便把 SEO 的事情理了一遍。

记录一下整个过程，给同样在搞个人内容站的人一个参考。

---

## 为什么要买域名

GitHub Pages 的 `sharebravery.github.io` 能用，但有几个问题：

1. **品牌感弱**。`.github.io` 一看就是技术人的临时站点，不像一个正经的内容站
2. **SEO 不友好**。搜索引擎对自定义域名的权重评估更独立，二级域名始终挂在 github.io 下面
3. **迁移成本**。如果以后换部署方式（比如 Vercel、Cloudflare Pages），域名不变，所有外链和收录都不会丢

在 Cloudflare 买域名，`.com` 一年大概 80 块，续费同价，没有首年低价续费翻倍的套路。
![](https://raw.githubusercontent.com/sharebravery/post/post/src/20260209115512077.png)

## 域名和 URL 规范

域名买好之后，第一件事是统一 URL 规范。

**`https://sharebravery.com` 和 `https://www.sharebravery.com` 必须指向同一个地方。** 搜索引擎会把它们当成两个站点，分散权重。

做法：在 Cloudflare DNS 里配好 CNAME，`www` 跳转到根域名，确保只有一个规范 URL。

非首页也一样。`/web3/`、`/tech/` 这些路径，统一带不带斜杠的规则，VuePress 默认会处理好这个。

## sitemap：给搜索引擎一张地图

新站没有外链，搜索引擎不知道你的页面在哪。sitemap.xml 就是主动告诉它："我有这些页面，来抓吧。"

VuePress Hope 主题自带 sitemap 生成，配好 `hostname` 就行，不需要额外操作。

**提交到哪：**

1. **Google Search Console** - 添加域名，验证所有权，提交 sitemap URL。提交一次就够，后续自动抓取
2. **Bing Webmaster Tools** - 同样提交 sitemap，Bing 的收录速度比 Google 慢，但覆盖了 DuckDuckGo 等搜索引擎
3. **百度站长平台** - 如果有国内读者的话。但收录速度慢，而且需要备案才能稳定收录(这个我没有弄 一进去出来各种内容 入口都不好找 看起来很多麻烦的前置步骤 不像前面两个直观 点进去直接操作就行 吐槽baidu...)
![](https://raw.githubusercontent.com/sharebravery/post/post/src/20260211104251862.png)

## 收录需要时间

提交完 sitemap，搜索 `site:sharebravery.com` 可能什么都没有。这是正常的。

搜索引擎的流程是：**抓取 -> 索引 -> 排名**，每一步都需要时间。

大致的收录周期：

- Google：首页几小时，其他页面 1-7 天
- Bing：3-10 天(我提交几小时后就能看自己的网站了其实 bing是收录最快的 连我旧的github的二级域名都收录了 好评)
- 百度：不确定，可能几周

前 2-4 周搜索几乎没有流量，不用焦虑。这段时间做的事情只有一件：**继续写内容**。

## 流量监控：够用就好

新站装一堆分析工具没意义，数据量太小，看了也白看。

**前期只需要两个：**

1. **Google Search Console** - 看收录状态、搜索词、点击量。这是 SEO 的核心工具，必须有
2. **Cloudflare Web Analytics** - 看访问量和来源。Cloudflare 自带，免费，不需要额外部署，隐私友好

GA4（Google Analytics）可以等有稳定流量之后再加。百度统计同理。

工具是辅助，前期把注意力放在内容上。

## 内容策略比 SEO 技巧重要

折腾了一圈 SEO 配置，回过头看，真正决定搜索排名的只有一件事：**内容质量**。

几个原则：

1. **系列化写作**。零散的文章搜索引擎不好理解结构。像 Polymarket 量化交易系列，12 篇文章互相链接，搜索引擎会把整个系列当成一个有深度的主题
2. **标题要有搜索意图**。"Polymarket 量化交易实战：API 鉴权与代理钱包" 比 "API 鉴权" 好得多，前者覆盖了用户可能搜索的关键词组合
3. **不要追热点垃圾**。写自己真正有经验的东西。搜索引擎越来越会判断内容深度，AI 水文的排名只会越来越差

## 社交媒体：雷达，不是主场

X 、小红书等适合分享观点和引流，但完整内容只放博客。（当然如果X开了VIP 还是能发长文的 我搜索测试发现X和知乎的权重比较高 一般能搜索出来）

原因很简单：博客的 URL 是你的，X 的内容是平台的。搜索引擎收录的是你的域名，不是你的推文。

其他平台（知乎、掘金）可以镜像发布，如果带了原文链接。一方面是版权声明，另一方面搜索引擎会通过链接关系判断原始来源，不过读者看多可能会烦，放不放 怎么放需要取舍。

## SO

个人站 SEO 没有什么黑魔法：

1. 买个域名，统一 URL 规范
2. 提交 sitemap 到 Search Console
3. 配好轻量监控
4. 然后就是写内容

技术配置半天搞完，剩下的交给时间和内容。
