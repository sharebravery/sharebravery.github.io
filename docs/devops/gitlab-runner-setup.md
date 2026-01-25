---
title: One-Click GitLab & Runner Setup with Docker Compose
date: 2025-06-11
categories:
  - DevOps
tags:
  - GitLab
  - Git
---

# One-Click GitLab & Runner Setup with Docker Compose

Using Docker Compose, we can quickly achieve a self-hosted deployment of GitLab, boosting code management and CI/CD automation. GitLab Runner is the CI/CD component responsible for executing jobs.

## 1. Preparation

1. **Install Docker & Docker Compose**:
   ```shell
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker --now
   ```

2. **Configure Docker Registry Mirror** (Optional, for better speeds in some regions):
   ```shell
   sudo mkdir -p /etc/docker
   sudo tee /etc/docker/daemon.json <<-'EOF'
   {
       "registry-mirrors": [
           "https://docker.1panel.live"
       ]
   }
   EOF
   sudo systemctl daemon-reload && sudo systemctl restart docker
   ```

3. **Create Data Directories**:
   ```shell
   mkdir -p /srv/gitlab/data /srv/gitlab/logs /srv/gitlab/config /mnt/host/gitlab-pages /etc/gitlab-runner
   ```

## 2. Docker Compose Configuration

Create `/srv/gitlab/docker-compose.yml`:

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
      - CI_SERVER_URL=http://192.168.0.122:8888/
      - REGISTRATION_TOKEN=YourTokenHere
```

- **Start**: `sudo docker-compose up -d`
- **Stop**: `sudo docker-compose down`

## 3. Management & Configuration

### 1. Get Initial Root Password
The password file is only kept for 24 hours.
```shell
sudo docker exec -it gitlab-primary cat /etc/gitlab/initial_root_password
```

### 2. Check Health
```shell
sudo docker inspect --format '{{.State.Health.Status}}' gitlab
```

### 3. Register GitLab Runner
Enter the container and register:
```shell
sudo docker exec -it gitlab-runner bash
gitlab-runner register
```

### 4. Configure GitLab Pages
To enable Pages, modify `/etc/gitlab/gitlab.rb` inside the container:

```ruby
gitlab_rails['gitlab_shell_ssh_port'] = 2222
pages_external_url "http://wiki-gitlab.cn"
gitlab_pages['enable'] = true
```

Then reconfigure:
```shell
gitlab-ctl reconfigure
gitlab-ctl restart
```

### 5. Troubleshooting
If things go sideways, check the logs:
```shell
sudo docker logs gitlab
```

---
*Automate all the things!*
