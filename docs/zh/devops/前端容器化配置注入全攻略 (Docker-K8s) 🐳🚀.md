---
title: 前端容器化配置注入全攻略 (Docker/K8s) 🐳🚀
date: 2025-09-28
categories:
  - DevOps
---

# 前端容器化配置注入全攻略 (Docker/K8s) 🐳🚀

如果你的前端应用经常需要修改配置，是否想过像后端一样预留一个配置文件方便修改就好了，介绍几种配置注入的方式，还有 K8s 的相关配置.

最近和一个团队合作，看到他们团队用了 Node 起了个 BFF 层，结合 K8s 提供了一些配置给前端，研究了一下主流的几种提供配置给前端的方式，在前端项目中，无论是 Node 服务还是 Nginx 托管的 SPA，**环境配置**都是必须面对的问题。这里总结了几种主流方式，把配置注入到前端应用中，并结合 **Docker 构建**和 **Kubernetes ConfigMap**，整理成两大类：**构建时注入**和**运行时注入**.

------

## 一、构建时注入 🛠️

构建时注入的核心思想是：**配置在构建镜像时就已经确定**。这种方式灵活性稍差，但实现简单

### 1.1 环境变量注入（Env 方式）

Dockerfile 示例：

（这里纯前端无 Node 服务的话，只需要写 VITE_MODE，不需要写 NODE_ENV，Vite 会根据 Vite Mode 来改变 NODE_ENV）

```dockerfile
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY . .

# 使用不同的 Vite 模式
ARG VITE_MODE=production
RUN pnpm run build:${VITE_MODE}

CMD ["node", "server/index.js"]
```

CI/CD 构建示例：

```yaml
script:
  - |
    if [ "$BRANCH" == "main" ]; then
      VITE_MODE=prod
    elif [ "$BRANCH" == "staging" ]; then
      VITE_MODE=staging
    else
      VITE_MODE=dev
    fi
  - docker build --build-arg NODE_ENV=${NODE_ENV} --build-arg VITE_MODE=${VITE_MODE} -t myapp:${VITE_MODE} .
```

> 💡 说明：构建时环境变量直接写进镜像，无法在运行时修改

------

### 1.2 标签注入（Tag 方式）

有时我们希望镜像带上构建信息，如 Git SHA 或分支名：

```shell
docker build -t myapp:dev-$(git rev-parse --short HEAD) .
```

这样镜像名称就自带版本信息，方便部署和回滚

------

### 1.3 HTML 内嵌配置（`<label>` 或 `<script>`）

构建时注入 ，可以把配置信息直接写入 HTML 中：

```html
<label id="STORE_INIT" style="display:none;">
{
  "API_URL": "http://api.example.com",
  "APP_NAME": "TEST_APP"
}
</label>
```

前端读取：

```javascript
const config = JSON.parse(document.getElementById('CONFIG_WEB_STORE').innerText);
console.log(config.API_URL, config.APP_NAME);
```

> 🎯 优点：初始化时直接可用，无需额外请求。
>  ❌ 缺点：构建后固定，不能动态修改。

------

## 二、运行时注入 ⚡

运行时注入的核心思想是：**镜像不包含最终配置，配置在容器运行或 Pod 启动时注入**。

### 2.1 JSON 配置文件 + ConfigMap

前端可以从 `/config/web.config.json` 获取配置，配合 Kubernetes ConfigMap：

```json
{
  "API_URL": "http://api.example.com",
  "APP_NAME": "TEST_APP"
}
```

Deployment 示例：

```yaml
volumeMounts:
  - name: frontend-config
    mountPath: /usr/share/nginx/html/config
volumes:
  - name: frontend-config
    configMap:
      name: frontend-config
```

Node 或 Nginx 服务都可以读取 JSON 文件，前端通过 `fetch` 获取：

```javascript
fetch('/config/web.config.json')
  .then(res => res.json())
  .then(cfg => console.log(cfg));
```

> ✅ 优点：可以在运行时更新配置，无需重建镜像

------

### 2.2 Node vs Nginx

- **Node**：直接读取挂载的 JSON 文件即可，容器内修改后无需重启服务（取决于服务实现）
- **Nginx**：静态文件服务，修改挂载文件后，需要重启 Nginx 或重启 Pod 才能生效

> 📝 小技巧：JSON 文件路径可通过 Dockerfile 的 `VOLUME` 或 Kubernetes `volumeMounts` 预留，让 ConfigMap 自动覆盖

其实直接用 Nginx 是最稳妥的，BFF 层很多时候并没有必要，都是后端的职能，后端提供了 VO 就没必要折腾了（99% 的团队是用不上 BFF 的），因为我看到团队中的 BFF 层的作用基本就是提供了文件静态服务，提供了配置，就加入了一个 node 后端框架和服务，属实无必要，反而增加了程序复杂性，前端需要启动 node 服务才能跑起来，如无必要勿增实体。

------

## 三、小结 ✨

| 类别       | 方式             | 注入时机 | 优缺点                     |
| ---------- | ---------------- | -------- | -------------------------- |
| 构建时注入 | Env / VITE_MODE  | 镜像构建 | 简单，无法运行时修改       |
| 构建时注入 | Tag              | 镜像构建 | 镜像带版本信息，方便回滚   |
| 构建时注入 | HTML `<label>`   | 页面生成 | 初始化直接可用，构建后固定 |
| 运行时注入 | JSON + ConfigMap | 容器启动 | 可动态修改，支持 k8s       |

💡 总结经验：

- **开发环境**：构建时注入 + 标签即可快速迭代
- **生产环境**：运行时注入 + ConfigMap，更灵活，方便运维

当然，还可以让后端提供一个配置接口~ 这是最动态的了

------

***END***

---