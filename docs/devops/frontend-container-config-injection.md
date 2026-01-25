---
title: Frontend Container Config Injection Guide (Docker/K8s) 🐳
date: 2025-09-28
categories:
  - DevOps
tags:
  - Docker
  - Kubernetes
---

# Frontend Container Config Injection Guide (Docker/K8s) 🐳

So, you're building a frontend application. It works perfectly on `localhost`. Then you deploy it to Dev, Staging, and Production, and suddenly you realize you're rebuilding your Docker image just to change `API_URL` from `dev-api.com` to `prod-api.com`.

Stop doing that. Seriously.

Let's talk about how to inject configurations into your frontend containers without losing your mind (or your build minutes). We'll look at the "Old School" build-time methods and the "Cloud Native" runtime methods.

---

## 1. Build-Time Injection (The "Hardcoded" Way) 🛠️

The philosophy here is simple: **The config is baked into the image.**
It's rigid, it's fast, and it means if you want to change a config, you build a new image.

### 1.1 Environment Variables (The Classic)

You pass `ARG` during the docker build.

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY . .

# Define your build argument
ARG VITE_MODE=production
# Bake it into the build command
RUN pnpm run build:${VITE_MODE}

CMD ["node", "server/index.js"]
```

**CI/CD Pipeline:**
```yaml
script:
  - |
    # Determine the mode based on the branch
    if [ "$BRANCH" == "main" ]; then
      VITE_MODE=prod
    else
      VITE_MODE=dev
    fi
  - docker build --build-arg VITE_MODE=${VITE_MODE} -t myapp:${VITE_MODE} .
```

> **The Verdict**: Simple? Yes. Flexible? No. Once that image is built, it thinks it's in Production forever.

### 1.2 Tag Injection (The Version Stamp)

Sometimes you just want to know *what* version is running. Injecting the Git SHA is perfect for this.

```shell
docker build -t myapp:dev-$(git rev-parse --short HEAD) .
```

This is great for debugging ("Which commit broke the build?"), but terrible for actual application logic configuration.

### 1.3 HTML Injection (The "Script Tag" Hack)

You write the config directly into the `index.html` during the build process.

```html
<!-- index.html -->
<label id="STORE_INIT" style="display:none;">
{
  "API_URL": "http://api.example.com",
  "APP_NAME": "TEST_APP"
}
</label>
```

**JS Access:**
```javascript
const config = JSON.parse(document.getElementById('STORE_INIT').innerText);
console.log(config.API_URL);
```

> **The Verdict**: It works, zero network requests needed. But again, you can't change this without redeploying HTML.

---

## 2. Runtime Injection (The "Cloud Native" Way) ⚡

This is where the magic happens. **Your image is generic.** It doesn't know if it's in Dev or Prod until it wakes up.

### 2.1 JSON Config + Kubernetes ConfigMap

This is the holy grail. Your frontend app fetches a `config.json` file when it loads. In Docker/Kubernetes, you mount a ConfigMap over that file.

**The Config File (`/public/config/web.config.json`):**
```json
{
  "API_URL": "http://api.example.com",
  "APP_NAME": "TEST_APP"
}
```

**The Kubernetes Deployment:**
```yaml
volumeMounts:
  - name: frontend-config
    mountPath: /usr/share/nginx/html/config # Mount directly into Nginx root
volumes:
  - name: frontend-config
    configMap:
      name: frontend-config # The K8s object holding the real values
```

**The Frontend Code:**
```javascript
// Fetch config before the app fully bootstraps
fetch('/config/web.config.json')
  .then(res => res.json())
  .then(config => {
    window.APP_CONFIG = config;
    mountApp(); // Start Vue/React/Angular
  });
```

> **The Verdict**: You can promote the *exact same Docker image* from Staging to Production. You just change the ConfigMap. 10/10.

### 2.2 The "BFF" Debate (Node vs Nginx)

I often see teams spinning up a Node.js BFF (Backend for Frontend) just to serve this config or act as a proxy.

**Hot Take**: Unless you need server-side rendering (SSR) or complex aggregation, **you probably don't need a Node server.**

-   **Node**: Requires maintenance, security patching, memory overhead.
-   **Nginx**: It serves static files. It's bulletproof. It consumes 5MB of RAM.

If your "Backend for Frontend" is just serving a JSON file and proxying an API, delete it. Use Nginx and a ConfigMap. Keep your architecture boring. Boring is good.

---

## Summary ✨

| Strategy | Injection Time | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Env / Build Args** | Build Time | Simple, standard. | Requires rebuild for config changes. |
| **HTML Injection** | Build Time | No network request latency. | Hardcoded. |
| **JSON + ConfigMap** | Runtime | **Write Once, Run Anywhere.** | Requires an async `fetch` on load. |

**My Advice**:
-   **Local/Dev**: Do whatever is fastest (Env vars).
-   **Production**: Runtime Injection with ConfigMaps. Your DevOps engineer will love you.
