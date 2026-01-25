---
title: Building a MediaWiki Knowledge Base
date: 2020-08-07
categories:
  - DevOps
tags:
  - DevOps
---

# Building a MediaWiki Knowledge Base

## 1. Environment Setup

### 1.1 LAMP Stack
Installing **MediaWiki** requires a LAMP environment (Linux + Apache + MySQL + PHP). We'll use the Baota Linux Panel to make this painless. Life is too short to configure Apache conf files manually for the 100th time.

![Baota Setup](https://pic.downk.cc/item/5f2d57a114195aa594fd029e.png)

## 2. Download & Upload

### 2.1 Remote Access
Log in to your ECS server using Xshell and use Xftp for file transfer.

### 2.2 Download MediaWiki
You can download it locally or directly on the server:

```bash
wget https://releases.wikimedia.org/mediawiki/1.29/mediawiki-1.29.1.tar.gz
```

Unzip it:
```bash
tar -zxv mediawiki-1.29.1.tar.gz
```

### 2.3 Prepare Directory
Create a folder (e.g., `old`) under `/www/wwwroot/default` and move the unzipped files there.

<img src="https://pic.downk.cc/item/5f2d575a14195aa594fcdcdc.png" alt="Directory Setup" style="zoom:75%;" />

### 2.4 Permissions
Grant permissions to the `www` user:
```bash
chown -R www /www/wwwroot/default
```

### 2.5 Add Website
Add the site in Baota Panel.

![Add Site](https://pic.downk.cc/item/5f2d5fff14195aa594016dad.png)

## 3. Installation

![Install Screen](https://pic.downk.cc/item/5f2d6a5214195aa59405b15d.png)

### 3.1 Language
Set your preferred language.

![Language](https://pic.downk.cc/item/5f2d6ac714195aa59405ddf8.png)

### 3.2 Database
Select **SQLite** for a simpler setup if you don't expect massive traffic immediately.

![Database](https://pic.downk.cc/item/5f2d6d0914195aa5940733ae.png)

## 4. Final Steps

Download the generated `LocalSettings.php` file and upload it to the root directory of your website. Boom, you have a Wiki!
