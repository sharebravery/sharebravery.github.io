---
title: "Web3——TON 开发注意事项"
date: 2024-04-29
categories:
  - 后端技术
tags:
  - Backend
  - Web3
---

# Web3——TON 开发注意事项

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a16747003f04fac952586ae5d3104fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image)

> TON (The Open Network, 原名 Telegram Open Network) 最大的特点就是分片和异步。

## 核心特性

1.  **架构差异**：由于异步架构，TVM（TON Virtual Machine）与以太坊虚拟机（EVM）不兼容。
2.  **地址生成**：合约的地址由部署的字节码和初始数据（Initial Data）共同决定。

## 开发语言

开发 TON 合约主要有三种选择：

1.  **Tact**：简单易懂，会被编译成 FunC。适合快速上手。
2.  **FunC**：类 C 语言，官方主要支持的语言，功能强大。
3.  **Fift**：接近汇编语言，通常用于底层调试，一般不需要直接写。

## 开发避坑指南（注意事项）

1.  **数据分散**：由于分片（Sharding），数据是分散存储的。很多时候需要开发者手动聚合链上信息。
2.  **竞争条件**：异步调用容易导致合约的竞争条件（Race Condition），需要格外注意状态管理。
3.  **钱包即合约**：在 TON 上，钱包本质上也是一个合约。同一个公钥可以部署多个钱包合约实例。
4.  **Gas 机制**：
    *   **不退款**：如果合约执行发生错误，Gas **不会**自动退还。
    *   **手动处理**：在合约调用链的末端，通常需要手动处理剩余 Gas 的返还。
    *   **失败消耗**：即使交易失败，Gas 依然会被消耗。
    *   **上限**：单个合约单次执行可消耗的最大 Gas 费为 **1 TON**。
5.  **存储租金**：合约在链上存储数据需要支付租金。
6.  **可升级性**：合约代码是可以升级的。
7.  **精度**：TON 的代币精度通常为 **9 位小数**。

## 示例代码

Jetton 代币合约示例：
[https://github.com/TonoxDeFi/capped-fungible-token/tree/main](https://github.com/TonoxDeFi/capped-fungible-token/tree/main)
