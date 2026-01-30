---
title: Building a WeEngine WeChat Management System on ECS
date: 2020-08-08
categories:
  - DevOps
tags:
  - DevOps
---

# Building a WeEngine WeChat Management System on ECS

## 1. Installing WeEngine

### 1.1 Setting up the Environment with Baota Panel
Installing **WeEngine** requires a LAMP environment (Linux + Apache + MySQL + PHP). To save our precious life for more exciting things, we'll use the Baota Linux Panel to simplify this process.

![Baota Panel Setup](https://pic.downk.cc/item/5f2d57a114195aa594fd029e.png)

### 1.2 Download and Unzip WeEngine
Download the installation package:
```bash
https://cdn.w7.cc/download/WeEngine-Laster-Online.zip
```

### 1.3 Create Directory
Log in to your server via Xshell and create a `WeEngine` folder under `/www/wwwroot/default`.

### 1.4 Upload Files
Use Xftp to upload the unzipped `install.php` file to the `WeEngine` directory.

### 1.5 Add Site in Baota
In Baota Panel, add a new website. Make sure to check the "Create Database" option and remember the username and password.

### 1.6 Run Installation Wizard
Visit `your-domain/install.php` in your browser. Register and log in to your WeEngine account.

<img src="https://pic.downk.cc/item/5f2e36db14195aa594472f0e.png" alt="Installation Wizard" style="zoom:75%;" />

### 1.7 Fix Permissions
If you encounter permission issues, run the `chown` command in Xshell:

```bash
chown -R www /www/wwwroot/default
```

If it complains about `.user.ini`, try running the command without `-R` or ignore that specific file.

### 1.8 Verify Environment
If WeEngine detects any errors, click "Fix Exceptions" and follow the instructions.

![Environment Check](https://pic.downk.cc/item/5f2e371614195aa594474813.png)

### 1.9 Configure Database
Enter the database credentials you created in step 1.5.

![Database Config](https://pic.downk.cc/item/5f2e373b14195aa5944757db.png)

### 1.10 Wait for Download
Sit back while the system downloads necessary files.

<img src="https://pic.downk.cc/item/5f2e37cf14195aa594478ad4.png" alt="Downloading" style="zoom:75%;" />

### 1.11 Login
Finally, set up your system admin account and log in.

## 2. Managing WeChat Official Accounts

### 2.1 Create an Account
Go to the WeChat Official Platform (https://mp.weixin.qq.com/) and register an account.

![WeChat Reg](https://pic.downk.cc/item/5f2e3f9e14195aa5944a867b.png)

### 2.3 Check WeEngine Version
Go to the WeEngine console and check for updates.

### 2.4 Add Platform
In the sidebar, select "Platform Management" and click "Add Platform".

<img src="https://pic.downk.cc/item/5f2e3fb814195aa5944a9070.png" />

### 2.5 Manual Addition
Select "Create New Official Account" and choose manual addition.

<img src="https://pic.downk.cc/item/5f2e3fe114195aa5944a9ebb.png" />

### 2.6 Fill Information
Fill in all the details for your WeChat Official Account.

<img src="https://pic.downk.cc/item/5f2e3ff514195aa5944aa863.png" />

### 2.7 AppId and AppSecret
You can find your AppId and AppSecret in the "Basic Configuration" section of the WeChat Official Platform.

![AppSecret](https://pic.downk.cc/item/5f2e400d14195aa5944ab489.png)

### 2.8 Configure Developer Info
In the WeChat backend, add developer information. Copy the Token and Key provided by WeEngine into the WeChat "Basic Configuration".

<img src="https://pic.downk.cc/item/5f2e403414195aa5944ac31a.png" alt="Token Key" style="zoom:75%;" />

### 2.9 Test
Once connected, test the integration to ensure everything is working smoothly.
