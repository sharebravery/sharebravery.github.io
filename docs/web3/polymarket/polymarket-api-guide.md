---
title: Polymarket 量化交易实战（一）：API 鉴权与代理钱包
shortTitle: API 鉴权与代理钱包
date: 2025-10-01
categories:
  - 量化交易
  - Polymarket
tags:
  - Python
  - Web3
order: 2
cover: /covers/polymarket/polymarket-api-guide.png
---

# Polymarket 量化交易实战（一）：API 鉴权与代理钱包

**Web3 的交易只有两种：AMM 和 Orderbook。**

Polymarket 选择了后者。

这意味着极致性能：不需要等待区块确认，毫秒级下单。
这也意味着传统量化的回归：买一、卖一、价差。

但在你写出第一个策略之前，你会发现拦路虎不是 Alpha，而是**鉴权**。

#### 1. 99% 的人会踩的坑：EOA vs Proxy

![EOA vs Proxy Architecture](illustrations/polymarket-api-deep-dive/01-infographic-eoa-vs-proxy.png)

你以为有了私钥就能交易？在 Polymarket 不行。

MetaMask 里显示的是你的 **EOA（外部拥有账户）**。
但资金实际上托管在 **Proxy Wallet（代理钱包，Gnosis Safe）**。

**为什么要这么别扭？**
为了 **Gasless Trading（无 Gas 交易）**。
如果用 EOA，每单都要付 Matic。通过 Proxy，Relayer 可以帮你代付 Gas。

**代码里的关键分工：**

```python
self.client = ClobClient(
    host=Config.CLOB_API_URL,
    key=Config.PRIVATE_KEY,       # 1. 你的 EOA 私钥（只负责签名）
    chain_id=137,
    signature_type=2,             # 2. 关键！2 代表 Gnosis Safe 代理模式
    funder=Config.PROXY_WALLET,   # 3. 你的 Proxy 地址（钱在这）
)
```

**避坑指南：**
如果你链上有钱，API 却报 "Insufficient Balance"，只有一种可能：
你把 EOA 当成了 Funder，或者忘记了 `signature_type=2`。

#### 2. 撕开 SDK 的包装：L2 鉴权

![L2 Authentication Headers](illustrations/polymarket-api-deep-dive/02-infographic-l2-auth-headers.png)

官方 SDK (`py-clob-client`) 封装得很好，但高频场景下，我们需要掌控一切。

每一次 HTTP 请求，本质上都是一次**数字签名**。你需要凑齐这“四大金刚”放入 Header：

1.  `POLY_API_KEY`
2.  `POLY_TIMESTAMP`
3.  `POLY_SIGNATURE`
4.  `POLY_PASSPHRASE`

**手撸签名的核心是“对齐”：**

```python
def _l2_request(self, method, path, body_json=None):
    ts = str(int(time.time()))

    # 待签名字符串：时间戳 + 方法 + 路径 + Body
    # Body 必须与发送的 JSON 完全一致（包括空格）
    message = ts + method.upper() + path + (body_json or "")

    # HMAC-SHA256 计算
    sig = base64.urlsafe_b64encode(
        hmac.new(secret, message.encode("utf-8"), hashlib.sha256).digest()
    ).decode("utf-8")
```

**实战经验：**
服务器对时间戳校验极严。本地时间偏差几秒，请求直接 401。
**在 Docker 里跑机器人，务必检查时区同步。**

#### 3. 散户思维 vs 量化思维

搞定鉴权，终于可以下单了。

普通开发者是一个个调 `create_order`。
但做市商思维是：**Batch（批量）**。

如果你需要在买卖两边同时挂单，或者进行网格交易，不要发十个请求。网络延迟会让你的订单状态支离破碎。

**使用 `place_orders_batch`：**

```python
# 核心差异：一次性打包（最多 15 个订单）
body_obj = [order_to_json(order) for order in orders]
# API 端点：/orders (POST)
```

这节省了 HTTP 连接开销，减少了网络延迟的不确定性。

**注意：批量下单不是原子性操作。** 每个订单独立处理，可能部分成功部分失败。响应会返回每个订单的状态，你需要在代码中处理这种情况：

```python
results = client.place_orders_batch(orders)
for i, result in enumerate(results):
    if not result.get("success"):
        logger.warning(f"Order {i} failed: {result.get('errorMsg')}")
```

#### 4. 你必须知道的限制

在动手写代码之前，先了解平台的硬性限制：

**API 频率限制（Rate Limits）：**
*   一般请求：15,000 次 / 10秒
*   下单请求：3,500 次 / 10秒（突发），60 次 / 秒（持续）
*   批量下单：最多 15 个订单 / 请求

**地理限制：**
Polymarket 禁止 33 个国家/地区的用户交易，包括美国、英国、法国等。在开发前，可以通过 `GET https://polymarket.com/api/geoblock` 检查用户资格。

**费用结构：**
*   大部分市场：零交易费用
*   15 分钟 Crypto 市场：收取 Taker 费用（用于 Maker Rebates）
*   存取款：无平台费用

#### 总结

鉴权和签名，看似枯燥，却是量化交易的入场券。

跨过了 **Proxy 钱包** 和 **L2 签名** 这两道坎，你才算真正连上了交易所的神经。

但 HTTP 还是太慢了。

下一篇，我们要解决更致命的问题：**如何让机器人的反应速度，从 2秒 提升到 50毫秒。**
