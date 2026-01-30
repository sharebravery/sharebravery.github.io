---
title: "Package Manager Battle Royale: npm, yarn, pnpm, and Bun"
date: 2021-07-23
category: Tools
tag:
  - Tools
  - Node.js
---

# Package Manager Battle Royale: npm, yarn, pnpm, and Bun

There's a joke in the frontend world: Every 18 months, we have to relearn how to install dependencies.

From the nested hell of `npm`, to the flat revolution of `yarn`, to the hard-link magic of `pnpm`, and finally `Bun`—the speedster who doesn't play by the rules. I often stare at `node_modules` and wonder:

**Are we writing code, or are we just managing these damn packages?**

Yesterday, I tried to upgrade an old project. I got stuck at `npm install` for 30 minutes. My disk space vanished, and I got a screen full of errors about "phantom dependencies." In that moment, I really wanted to throw my laptop out the window.

Today, let's cut the fluff. As developers caught in this war, who should we actually choose?

## 1. npm: The Aging Father

**Core Issue**: Slow, and heavy.

Early `npm` was like a warehouse manager with no organizational skills. You order stock (install) today, and order again tomorrow, but you might get completely different items (non-deterministic versions). Even with `package-lock.json`, its speed is still painful.

The biggest headache is "Phantom Dependencies."

Sometimes you didn't install package A, but because your dependency B uses A, you can surprisingly `import A` in your code. It's like your neighbor bought a car, and you didn't, but you can somehow drive his car. The day he moves away (B upgrades and drops A), your code instantly crashes, and you're left wondering: *Dude, where's my car?*

## 2. yarn (v1): The Savior of Yesterday

**Core Contribution**: `yarn.lock` and parallel installation.

When `yarn` first came out, it felt like alien technology. An `npm install` that took 5 minutes would finish in 1 minute with `yarn`. It was like a highly trained logistics team—efficient and precise.

But now? Yarn v1 is in maintenance mode. The PnP (Plug'n'Play) mode in v2/v3 was too radical a step, fracturing the ecosystem. I mostly see it in legacy projects now, like meeting a retired veteran.

## 3. pnpm: The Disk Savior

**Core Insight**: Why do we download `react` for every single project?

`pnpm` is my current **top recommendation**. Its logic is hardcore:

1.  **Global Store**: All dependencies for all projects live in one place on your disk.
2.  **Hard Links**: The `node_modules` in your project are just links pointing to that global store.

Since switching to `pnpm`, I've reclaimed gigabytes of space on my MacBook. It feels like buying one TV for your house and just installing mirrors in every room to reflect it.

Plus, it strictly forbids "Phantom Dependencies." If you didn't install it, you can't use it. I love this kind of **cleanliness**.

## 4. Bun: The Rule Breaker

**Core Advantage**: Fast. Insanely fast.

Bun isn't just a package manager; it's a whole new Runtime. `bun install` is so fast that sometimes I suspect it's faking it.

But honestly, I'm still hesitant to use Bun fully in production. Its compatibility is improving, but hitting a weird edge case can make you question your life choices. It's like a genius teenager—brilliant and fast, but sometimes unstable.

## The Ultimate Cheat Sheet

Since we still have to work, here is a "translation guide" I compiled. Save your brain power for code, not for memorizing commands.

| Action | npm (Classic) | yarn (Veteran) | pnpm (Daily Driver) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Install** | `npm install` | `yarn` | `pnpm i` | First thing after git clone |
| **Add Pkg** | `npm i pkg` | `yarn add pkg` | `pnpm add pkg` | Defaults to production |
| **Add Dev** | `npm i -D pkg` | `yarn add -D pkg` | `pnpm add -D pkg` | For TS, ESLint |
| **Remove** | `npm uninstall` | `yarn remove` | `pnpm remove` | Breaking up is hard to do |
| **Upgrade** | - | `upgrade-interactive` | `pnpm up -i -L` | **Game Changer!** Like ordering from a menu |
| **Why?** | `npm ls pkg` | `yarn why pkg` | `pnpm why pkg` | Find who invited the weird dependency |

## Conclusion

*   **New Project?** Close your eyes and choose **pnpm**.
*   **Feeling Adventurous?** Try **Bun**.
*   **Legacy Code?** **Respect npm/yarn**. Don't touch it, or it will explode.

Tools are just means to an end. Code is the goal. Don't waste too much of your life on the toolchain—pick one that works, and go build something that changes the world.

---

*END*
