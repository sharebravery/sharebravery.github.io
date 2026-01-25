---
title: 🚑 Git 救命手册：给绝望者的指南
date: 2021-07-23
tag:
  - Git
  - 效率工具
categories:
  - 效率工具
---

# 🚑 Git 救命手册：给绝望者的指南

> "如果 Git 是一个视频游戏，那么 `git reset --hard` 就是那个让你删号重练的按钮。"

有时候我们不需要一本百科全书，只需要一个急救包。这里收集了一些 "我搞砸了" 或者 "我需要马上搞定" 的场景。

## 📦 "把这一切都打包带走"

老板要源码，但他不用 Git？别傻傻地截图或者手动复制。

**场景**：你需要把当前 `master` 分支的所有代码打包成一个 zip 发给某人。

```bash
git archive --format=zip --output master.zip master
```

💡 **小贴士**：这比手动压缩文件夹好多了，因为它会自动忽略 `.git` 目录和 `.gitignore` 中忽略的文件。纯净，专业。

## ↩️ "糟糕，我提交了不该提交的东西"

**场景**：你刚 commit 了一个密码，或者一句写了一半的脏话。

```bash
# 撤销最近一次提交，但保留文件修改（软着陆）
git reset --soft HEAD~1

# 彻底抹除最近一次提交，就像它从未发生过（危险！慎用！）
git reset --hard HEAD~1
```

## 🕵️ "这行代码是谁写的？出来聊聊"

**场景**：代码坏了，你想知道是哪个 "天才" 干的。

```bash
# 查看某文件的每一行最后是谁修改的
git blame filename.ts
```

如果那个人是你自己... 咳咳，那就是 Git 记错了。

## 🙈 "我正在修 Bug，老板让我切分支"

**场景**：工作区一团糟，但你必须马上切换到另一个分支修紧急 Bug。

```bash
# 1. 把当前杂乱的工作现场 "藏" 起来
git stash

# 2. 现在工作区干净了，切分支去吧
git checkout hotfix-branch
# ... 修完 bug 提交 ...

# 3. 切回来
git checkout my-feature

# 4. 恢复现场，继续搬砖
git stash pop
```

## 🔍 "我记得写过这行代码..."

**场景**：你在找一个函数，但忘了它在哪个文件里。

```bash
# 在所有文件中搜索 "TODO"
git grep "TODO"

# 在某个历史版本的代码中搜索
git grep "function_name" HEAD~5
```

---

*Git 很强大，也很可怕。记住：在该 commit 的时候 commit，在该 push 之前三思。*
