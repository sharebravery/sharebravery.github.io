# 项目规范 - sharebravery.github.io

## 技术栈

- VuePress 2 + vuepress-theme-hope
- 部署: GitHub Pages

## 目录结构

```
docs/
├── .vuepress/
│   ├── public/           # 静态资源（必须放这里才能用绝对路径引用）
│   │   ├── covers/       # 文章封面图
│   │   │   ├── polymarket/
│   │   │   └── tools/
│   │   ├── avatar.svg    # 网站 Logo
│   │   └── ...
│   ├── styles/           # 自定义样式
│   └── config.ts         # VuePress 配置
├── backend/
│   └── polymarket/
│       ├── covers/       # 封面图源文件 + 生成提示词（不被网站引用）
│       ├── illustrations/ # 文章内插图（相对路径引用）
│       └── *.md
├── frontend/
├── tools/
└── ...
```

## 图片路径规范

### Frontmatter 中的路径（cover 等）

**必须使用绝对路径**，从 `public` 目录解析：

```yaml
# 正确
cover: /covers/polymarket/api-guide.png

# 错误 - 相对路径在 frontmatter 中不起作用
cover: covers/api-guide/cover.png
```

### Markdown 内容中的图片

**使用相对路径**，跟着文章走：

```markdown
<!-- 正确 - 相对于文章所在目录 -->
![示意图](illustrations/topic/image.png)

<!-- 也可以用绝对路径，但不推荐 -->
![示意图](/covers/polymarket/api-guide.png)
```

### 封面图存放

| 位置 | 用途 |
|------|------|
| `docs/.vuepress/public/covers/{category}/{name}.png` | 网站引用（必须） |
| `docs/{category}/{topic}/covers/{slug}/prompt.md` | 生成提示词（保留，方便重新生成） |

注意：封面图只在 public 目录保留一份，原目录只保留 prompt.md。

## 文章 Frontmatter 规范

```yaml
---
title: 完整标题
shortTitle: 侧边栏短标题
date: 2025-01-01
categories:
  - 分类1
  - 分类2
tags:
  - 标签1
  - 标签2
order: 1                    # 排序（可选）
cover: /covers/xxx/yyy.png  # 封面图（绝对路径）
---
```

## 敏感信息

- 不要在文章中暴露真实的私钥、API Key、钱包地址
- 代码示例使用变量名如 `Config.PRIVATE_KEY`，不要写真实值

## 内容规范

- 避免使用"博彩"、"赌博"等敏感词汇，可用"投机"、"预测市场"替代
- Polymarket 系列文章标题使用"量化交易实战"
