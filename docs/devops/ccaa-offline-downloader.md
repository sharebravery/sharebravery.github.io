---
title: Building an Offline Download Server with CCAA
date: 2020-08-10
categories:
  - DevOps
tags:
  - DevOps
---


# Building an Offline Download Server with CCAA

### 1. Install CCAA (CentOS + Caddy + AriaNg + Aria2)

CCAA is a one-click script that sets up a complete download station.

#### 1.1 Run the Script

**Overseas Servers:**
```bash
bash <(curl -Lsk https://raw.githubusercontent.com/helloxz/ccaa/master/ccaa.sh)
```

**Mainland China Servers:**
```bash
bash <(curl -Lsk https://raw.githubusercontent.com/helloxz/ccaa/master/ccaa.sh) cdn
```

![CCAA Install](https://pic.downk.cc/item/5f2d57a114195aa594fd029e.png)

Enter `1` and hit Enter to start.

#### 1.2 Configuration
After installation, the script will output:
- Access Address
- Aria2 RPC Key
- File Browser Username & Password
**Save these!**

#### 1.3 Firewall
Open port `6080` in your server's security group settings.

#### 1.4 Login
Visit the address provided.

![CCAA Login](https://pic.downk.cc/item/5f2e36db14195aa594472f0e.png)

#### 1.5 Set RPC Key
In AriaNg settings, enter the RPC key you saved earlier.

![RPC Key](https://pic.downk.cc/item/5f2e371614195aa594474813.png)

#### 1.6 Management Commands

```bash
# Enter Management Menu
ccaa

# Check Status
ccaa status

# Start/Stop/Restart
ccaa start
ccaa stop
ccaa restart

# Check Version
ccaa -v
```

## 2. Start Downloading

Create a new download task in the web interface and enjoy your private download server!

![Download Task](https://pic.downk.cc/item/5f2e37cf14195aa594478ad4.png)
