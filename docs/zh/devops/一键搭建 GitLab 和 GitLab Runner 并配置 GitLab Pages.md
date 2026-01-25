---
title: 一键搭建 GitLab 和 GitLab Runner 并配置 GitLab Pages
date: 2025-06-11
categories:
  - DevOps
---

# 一键搭建 GitLab 和 GitLab Runner 并配置 GitLab Pages

使用 Docker Compose，可以快速实现 GitLab 的自托管部署，提升代码管理和 CI/CD 流程的自动化。GitLab 是一个功能丰富的 Git 仓库管理平台，提供 Git 存储库托管、代码审查、持续集成和部署（CI/CD）等功能。而 GitLab Runner 是 GitLab 的 CI/CD 组件，负责执行 CI/CD 作业。

## 一、准备工作

1. **Docker 和 Docker Compose 安装**：如果你的系统尚未安装 Docker 和 Docker Compose 需要先进行安装

   ```shell
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker --now
   ```

2. 配置 Docker 国内源（如果你可以直接拉国外镜像不需此操作）

   ```shell
   sudo mkdir -p /etc/docker

   sudo tee /etc/docker/daemon.json <<-'EOF'

   {

       "registry-mirrors": [

       	"https://docker-0.unsee.tech",

           "https://docker-cf.registry.cyou",

           "https://docker.1panel.live"

       ]

   }
   EOF

   # 重启docker服务
   sudo systemctl daemon-reload && sudo systemctl restart docker
   ```

3. 创建数据存储目录

   在宿主机上为 GitLab 和 GitLab Runner 创建必要的存储目录

   ```shell
   mkdir -p /srv/gitlab/data /srv/gitlab/logs /srv/gitlab/config /mnt/host/gitlab-pages /etc/gitlab-runner
   ```

## 二、创建 Docker Compose 文件

以下是一个使用 Docker Compose 一键搭建 GitLab 和 GitLab Runner 的配置模板和 docker compose 的使用命令：

- 创建文件

```shell
sudo vim  /srv/gitlab/docker-compose.yml
```

```yaml
version: "3.8"
services:
  gitlab:
    image: gitlab/gitlab-ee:latest
    container_name: gitlab
    restart: always
    hostname: 192.168.0.122
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://192.168.0.122'
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
    ports:
      - "8888:80"
      - "443:443"
      - "2222:22"
    volumes:
      - /srv/gitlab/data:/var/opt/gitlab
      - /srv/gitlab/logs:/var/log/gitlab
      - /srv/gitlab/config:/etc/gitlab
      - /mnt/host/gitlab-pages:/var/www/gitlab/pages
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      retries: 5
      start_period: 1m
      timeout: 10s

  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    container_name: gitlab-runner
    restart: always
    depends_on:
      - gitlab
    volumes:
      - /etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock
      - /mnt/host/gitlab-pages:/mnt/host/gitlab-pages
    environment:
      - CI_SERVER_URL=http://192.168.0.122:8888/  # 同样修改为新的端口
      - REGISTRATION_TOKEN=S6CqjbRUF9Rfj6XyUE-P
```

- 启动（在 docker-compose.yml 目录下）

```shell
sudo docker-compose up -d
```

- 停止（在 docker-compose.yml 目录下）

```shell
sudo docker-compose down
```

# 三、GitLab 和 GitLab Runner 管理与配置

以下是一些常用的操作和故障排除步骤。

## 1. 获取 GitLab Root 密码

安装完成打开 GitLab 地址，这时候是登录不上的 需要先获取 root 账号密码：

```shell
sudo docker exec -it gitlab-primary cat /etc/gitlab/initial_root_password
```

这将输出 GitLab Root 用户的初始密码，这个密码文件只保留 24 小时，需要及时修改密码。

## 2. 检查 GitLab 容器健康状态

检查 GitLab 容器的健康状态，可以使用以下命令：

```shell
sudo docker inspect --format '{{.State.Health.Status}}' gitlab
```

如果状态不正常，可以尝试重启 GitLab 容器：

```shell
sudo docker restart gitlab
```

## 3. 停止并删除 GitLab Runner 容器

若需要停止并删除 `gitlab-runner` 容器，可以执行以下步骤：

- 停止容器

```shell
sudo docker stop gitlab-runner
```

- 删除容器

```shell
sudo docker rm gitlab-runner
```

- 检查容器状态

确认 `gitlab-runner` 容器已经停止并删除：

```shell
sudo docker ps -a
```

此时，你应该只看到正在运行的 `gitlab` 容器。

## 4. 配置和注册 GitLab Runner

进入 `gitlab-runner` 容器并注册 Runner：

```shell
sudo docker exec -it gitlab-runner bash
gitlab-runner register
```

## 5. 配置 GitLab Pages

为了启用 GitLab Pages，你可以修改 GitLab 的配置文件。以下是启用 Pages 的步骤：

1. 进入 GitLab 容器：

   ```shell
   sudo docker exec -it gitlab /bin/bash
   ```

2. 修改配置文件 `/etc/gitlab/gitlab.rb`：

   ```shell
   vi /etc/gitlab/gitlab.rb
   ```

   设置以下参数：

   ```ruby
   gitlab_rails['gitlab_shell_ssh_port'] = 2222
   pages_external_url "http://wiki-gitlab.cn"
   gitlab_pages['enable'] = true
   ```

3. 重新配置和重启 GitLab：

   ```shell
   gitlab-ctl reconfigure
   gitlab-ctl restart
   ```

## 6. 网络配置和端口问题

- **重启网络服务**：

  如果修改了网络设置，可以重启网络服务：

  ```shell
  sudo systemctl restart systemd-networkd
  ```

- **修改端口**：

  如果你需要修改 GitLab 的 SSH 端口，可以在 `/etc/gitlab/gitlab.rb` 文件中进行修改（建议直接在 docker-compose.yml 修改即可）：

  ```ruby
  gitlab_rails['gitlab_shell_ssh_port'] = 2222
  ```

  修改后，执行 `gitlab-ctl reconfigure` 重载配置。

## 7. 查看 GitLab 日志

如果 GitLab 容器出现问题，可以通过以下命令查看日志：

```shell
sudo docker logs gitlab
```

---

END

---

