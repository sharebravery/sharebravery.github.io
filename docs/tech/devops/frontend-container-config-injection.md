---
title: 前端容器化配置注入
date: 2025-09-28
categories:
  - DevOps
tags:
  - Docker
  - Kubernetes
---

# 前端容器化配置注入

前端应用频繁改配置，每次都重新打镜像很蠢。这篇聊几种配置注入方式。

最近和一个团队合作，看到他们用 Node 起了个 BFF 层，结合 K8s 注入配置。研究了一下主流方案，整理成两类：**构建时注入**和**运行时注入**。

---

## 构建时注入

配置在构建镜像时就固定了。灵活性差，但实现简单。

### 环境变量注入

Dockerfile 示例：

```dockerfile
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY . .

# 使用不同的 Vite 模式
ARG VITE_MODE=production
RUN pnpm run build:${VITE_MODE}

CMD ["node", "server/index.js"]
```

注：纯前端项目只需要 VITE_MODE，不需要 NODE_ENV。Vite 会根据 mode 自动设置 NODE_ENV。

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
  - docker build --build-arg VITE_MODE=${VITE_MODE} -t myapp:${VITE_MODE} .
```

问题：构建时环境变量直接写进镜像，运行时改不了。

---

### 标签注入

镜像名称带上构建信息：

```shell
docker build -t myapp:dev-$(git rev-parse --short HEAD) .
```

镜像名自带版本信息，方便回滚。

---

### HTML 内嵌配置

把配置写入 HTML：

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

好处是初始化时直接可用，不用额外请求。坏处是构建后改不了。

---

## 运行时注入

镜像不包含配置，配置在容器启动时注入。

### JSON 配置文件 + ConfigMap

前端从 `/config/web.config.json` 获取配置：

```json
{
  "API_URL": "http://api.example.com",
  "APP_NAME": "TEST_APP"
}
```

Kubernetes Deployment：

```yaml
volumeMounts:
  - name: frontend-config
    mountPath: /usr/share/nginx/html/config
volumes:
  - name: frontend-config
    configMap:
      name: frontend-config
```

前端通过 fetch 获取：

```javascript
fetch('/config/web.config.json')
  .then(res => res.json())
  .then(cfg => console.log(cfg));
```

运行时可以改配置，不用重建镜像。

---

### Node vs Nginx

- **Node**：直接读取挂载的 JSON 文件，修改后是否重启取决于服务实现
- **Nginx**：静态文件服务，修改配置后需要重启 Nginx 或 Pod

其实直接用 Nginx 最稳妥。BFF 层很多时候没必要，都是后端的职能。我看到的 BFF 层作用就是提供静态文件服务和配置，为此加了一整套 Node 后端框架，属实无必要。反而增加复杂性，前端还得启动 Node 服务才能跑。如无必要，勿增实体。

---

## 对比

| 类别       | 方式             | 注入时机 | 优缺点                     |
| ---------- | ---------------- | -------- | -------------------------- |
| 构建时注入 | Env / VITE_MODE  | 镜像构建 | 简单，运行时改不了         |
| 构建时注入 | Tag              | 镜像构建 | 镜像带版本信息，方便回滚   |
| 构建时注入 | HTML `<label>`   | 页面生成 | 初始化直接可用，构建后固定 |
| 运行时注入 | JSON + ConfigMap | 容器启动 | 可动态修改，支持 K8s       |

实际使用：

- 开发环境：构建时注入 + 标签，快速迭代
- 生产环境：运行时注入 + ConfigMap，灵活，方便运维

当然，还可以让后端提供配置接口，这是最动态的方案。
