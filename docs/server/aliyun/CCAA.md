---
title: CCAA 打造离线下载服务器
date: 2020-08-10
tags:
  - 阿里云七天训练营
categories:
  - 后端笔记
---

# CCAA 打造离线下载服务器

### 一、 安装 CCAA(CentOS + Caddy + AriaNg + Aria)

#### 1.1 在服务器输入以下命令：

_#海外_

```
 bash <(curl -Lsk https://raw.githubusercontent.com/helloxz/ccaa/master/ccaa.sh)
```

_#国内_

```
bash <(curl -Lsk https://raw.githubusercontent.com/helloxz/ccaa/master/ccaa.sh) cdn
```

![在这里插入图片描述](./images/CCAA1-2020081011352273.png)

输入 1，回车开始安装

#### 1.2 填写相关信息

安装完毕后会提示访问地址、Aria2 RPC 密钥、File Browser 用户名、密码，记录保存.

#### 1.3 在服务器安全组设置里开放 6080 端口

#### 1.4 访问刚才提示的访问地址

![在这里插入图片描述](./images/CCAA2-20200810113623163.png)

#### 1.5 设置 RPC 密匙

![在这里插入图片描述](./images/CCAA3-202008101136312.png)

#### 1.6 管理 CCAA

```
#进入CCAA管理界面* ccaa

*#查看ccaa状态* ccaa status

*#启动ccaa* ccaa start

*#停止ccaa* ccaa stop

*#重启ccaa* ccaa restart

*#查看当前版本* ccaa -v
```

## 二、开始使用

#### 2.1 新建下载

![在这里插入图片描述](./images/CCAA4-20200810113646867.png)

​ END
<Valine></Valine>
