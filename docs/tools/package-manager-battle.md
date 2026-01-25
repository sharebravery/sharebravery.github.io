---
title: "📦 Package Manager Battle Royale: The Ultimate Cheat Sheet"
date: 2021-07-23
categories:
  - Productivity Tools
tags:
  - Tools
---


# 📦 Package Manager Battle Royale: The Ultimate Cheat Sheet

> npm is the grandfather, Yarn is the reformer, pnpm is the minimalist, and Bun is... that hyperactive kid running at light speed.

Still struggling to remember the commands for different tools? Don't worry, save your brain capacity for more important things (like what to order for dinner). Here is a cross-language, cross-tool translation guide.

## 🚀 The Command Translation Table

| Action | npm (Classic) | yarn (Classic v1) | pnpm (Space Saver) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | `yarn` | `pnpm i` | The first thing you do after `git clone` |
| **Add a Package** | `npm i package` | `yarn add package` | `pnpm add package` | Defaults to production dependencies |
| **Add Dev Package** | `npm i -D package` | `yarn add -D package` | `pnpm add -D package` | For TS, ESLint, etc. |
| **Remove Package** | `npm uninstall pkg` | `yarn remove pkg` | `pnpm remove pkg` | It's not you, it's me |
| **Run Script** | `npm run dev` | `yarn dev` | `pnpm dev` | `yarn` and `pnpm` let you skip the `run` keyword |
| **Interactive Update** | - | `yarn upgrade-interactive --latest` | `pnpm up -i --latest` | **Game Changer!** Like ordering from a menu |

## 🧐 "Why do I have this package?"

Your `node_modules` is heavier than a black hole, and you want to know which dependency secretly invited `is-odd` to the party?

- **npm**: `npm list package-name`
- **yarn**: `yarn why package-name` (Naming on point)
- **pnpm**: `pnpm why package-name`

## 🧹 The Nuclear Option

Sometimes dependencies just break. The fastest fix is often... turn it off and on again (delete and reinstall).

```bash
# Don't try to be elegant here, just nuke it
rm -rf node_modules
# Then choose your weapon
pnpm install
```

---

*Pick a tool you like and stick with it. Unless your Tech Lead forces you to change.*
