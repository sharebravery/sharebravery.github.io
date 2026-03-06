---
type: infographic
density: minimal
style: notion
image_count: 2
language: zh
---

## Illustration 1

**Position**: 第25行后 / "#### 1. 99% 的人会踩的坑：EOA vs Proxy"
**Purpose**: 直观展示 EOA 和 Proxy 钱包的职责分离，解决最常见的困惑
**Visual Content**:
- 用户/机器人: 持有 EOA 私钥，职责: "签名意图"
- 中继器 (Relayer): 中间人，职责: "代付 Gas 并提交"
- 代理钱包 (Safe): 链上合约，职责: "验证并执行"
**Type Application**: 信息图流程布局，展示权限与资金的分离
**Filename**: 01-infographic-eoa-vs-proxy.png

## Illustration 2

**Position**: 第56行后 / "#### 2. 撕开 SDK 的包装：L2 鉴权"
**Purpose**: 可视化 L2 鉴权所需的4个关键请求头
**Visual Content**: HTTP 请求包被4把"锁"或"印章"保护:
1. **POLY_API_KEY** (身份证)
2. **POLY_TIMESTAMP** (时钟)
3. **POLY_SIGNATURE** (签章)
4. **POLY_PASSPHRASE** (密码)
**Type Application**: 信息图结构，列出安全组件
**Filename**: 02-infographic-l2-auth-headers.png
