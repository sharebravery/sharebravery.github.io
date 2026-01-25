---
title: "Web3: TON Development Survival Guide"
date: 2024-04-29
categories:
  - Backend
tags:
  - Backend
  - Web3
index: false
article: true
---

# Web3: TON Development Survival Guide 💎

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a16747003f04fac952586ae5d3104fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image)

> So you want to build on TON (The Open Network)? Welcome to the land of **Sharding** and **Asynchrony**. Forget everything you know about EVM; we're not in Kansas anymore.

## The Core Weirdness

1.  **Not Your Grandpa's EVM**: Because TON is asynchronous, the TVM (TON Virtual Machine) is totally incompatible with the Ethereum Virtual Machine (EVM). Don't try to copy-paste your Solidity code; it won't work.
2.  **Address Magic**: A contract's address isn't just random; it's calculated from its **deployed bytecode** AND its **initial data**. Change a variable, change the address.

## Pick Your Weapon (Languages)

1.  **Tact**: The "Easy Mode". It's simple, readable, and compiles down to FunC. Great for keeping your sanity.
2.  **FunC**: The "C-like" standard. Officially supported and robust. If you like semicolons and low-level control, this is for you.
3.  **Fift**: The "Assembly" of TON. Unless you enjoy pain or are writing a compiler, stay away.

## ⚠️ "Gotchas" (Read Before You Cry)

1.  **Sharding Headache**: Data is scattered across shards. You don't get a global state view for free; often, you have to manually aggregate data from different places. Fun, right?
2.  **Async Chaos**: Asynchronous calls mean **Race Conditions** are your new best friend. Manage your state carefully, or things will get weird.
3.  **Wallet = Contract**: There are no "EOA" (Externally Owned Accounts) like in Ethereum. Your wallet IS a contract. One public key can control multiple wallet instances.
4.  **The Gas Situation**:
    *   **No Refunds**: If your contract crashes, say goodbye to your Gas. No automatic refunds.
    *   **Manual Returns**: You often have to write code to manually send back unused Gas at the end of a transaction chain.
    *   **Failed? Still Pay**: Even failed transactions burn Gas.
    *   **The Cap**: A single contract execution is capped at **1 TON** of Gas. Don't go crazy.
5.  **Rent is Due**: Contracts have to pay storage rent. If they run out of money, they might get frozen or deleted.
6.  **Upgradable**: Yes, you can upgrade contract code.
7.  **Precision**: Standard token precision is **9 decimals**, not 18.

## Show Me The Code

Check out this example for a Jetton (Token) Contract:
[https://github.com/TonoxDeFi/capped-fungible-token/tree/main](https://github.com/TonoxDeFi/capped-fungible-token/tree/main)
