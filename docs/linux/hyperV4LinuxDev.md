# 使用 Hyper-V 进行高效嵌入式 Linux 开发

在进行嵌入式开发时，通常需要在 Windows 上安装虚拟机软件。常用的有 VMware，但如果主要进行软件层面的开发，我建议使用 Windows 自带的 Hyper-V 进行虚拟化管理。这不仅使用方便，无需安装第三方软件，而且体验极佳，几乎是原生体验。

## 1. 开启 Hyper-V 服务

### 1.1 打开控制面板，启用以下服务后重启电脑

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623224944.png)

如果你也想使用 WSL，可以同时开启 Windows Subsystem for Linux。

## 2. 创建虚拟机

按下 `Win + S` 快捷键，搜索 Hyper-V Manager。如果你前面开启了 Hyper-V 服务，就能找到它。

### 2.1 点击快速创建

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623225412.png)

### 2.2 选择所需的操作系统

然后按提示一步步进行。我这里选择了 Ubuntu，最好使用需要密码登录的选项，不要选自动登录，否则可能会无法进入系统。

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623225600.png)

## 3. 虚拟机扩容

由于快速创建的虚拟机默认存储空间较小，所以需要进行扩容

### 3.1 创建完成后，点击设置虚拟机

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623230214.png)

### 3.2 在后续的编辑页面中更改为自己想要的大小，例如 40GB

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623230419.png)

### 3.3 在 Ubuntu 中扩展刚才的空间

安装 `gparted` 工具：

```shell
sudo apt install gparted
```

安装好后，打开 `gparted` 的 GUI 页面。会有弹窗，点击 `Fix` 按钮，然后耐心等待光标转圈，不要急于操作。

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623231330.png)

未分配的空间是你刚才在虚拟机设置中新增的未使用空间。

在你要扩展的分区（例如 `desktop-rootfs`）上右键，点击 `Resize/Move`，然后选择扩展大小即可。完成后点击提交。

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623232435.png)

查看结果：

```shell
df -h
```

## 4. 开启 SSH 服务

系统默认未安装 SSH 服务。

- 安装 SSH：

```shell
sudo apt install openssh-server
```

- 启动并设置其在系统启动时自动启动：

```shell
sudo systemctl start ssh
sudo systemctl enable ssh
```

- 查看状态：

```shell
sudo systemctl status ssh
```

- 其他服务：

安装 `net-tools` 即可使用 `ifconfig` 查看 IP 地址：

```shell
sudo apt install net-tools
```

安装并配置 Git：

```shell
sudo apt install git
```

```shell
git config --global user.email "your_email@example.com"
git config --global user.name "your_username"
```

## 5. 网络配置

那么，使用 Hyper-V 创建的虚拟机如何与 Windows 和开发板通讯呢？

使用 Hyper-V 配网非常简单，初始配置就可以和 Windows 互通，不需要过多配置，只需注意与开发板的通信。

### 5.1 开发板使用 USB 网卡连接到 Windows 主机

这是最简单的方法，插上即用：

- Windows 无需配置
- 开发板指定一个 IP 地址
- Ubuntu 使用默认网卡即可（我这里自动分配了 172 开头的 IP 地址）

### 5.2 开发板自带 Wi-Fi 模块

如果开发板自带 Wi-Fi 模块，所有设备进行局域网同网段通信：

- Windows 无需配置
- 开发板连接到与 Windows 相同的路由器（保证是同网段）
- Ubuntu 切换网卡，操作如下：

找到 Virtual Switch Manager：

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623234033.png)

选择新建虚拟 Switch，选择外部网络：

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623234516.png)

此时 Windows、开发板、Ubuntu 都被路由器分配了同网段的 IP 地址，就可以互相通信了。

### 5.3 开发板使用网线连接到 PC 主机

- 在 Windows 上为新接入的以太网设备分配同网段的静态 IP 地址：

![](https://cdn.jsdelivr.net/gh/sharebravery/album/20240623235419.png)

- 在开发板上设置同网段的 IP 地址：

```shell
ifconfig -a # 查看网口
ifconfig eth0 192.168.0.120 # 设置和 Windows 配置的静态 IP 同网段的地址
```

- Ubuntu 无需配置，我这里使用的是外部网络的网卡，会分配一个 IP。

经测试，使用这个方法此时 Windows 可以与 Ubuntu 和开发板互通，但开发板不能直接与 Ubuntu 通信，不过这已经足够使用了。

使用 Hyper-V 创建的虚拟机体验很好，推荐使用。配置好后，可以使用 VS Code 的 SSH Remote 插件连接到 Ubuntu 进行开发，体验更舒适。

---

_END_

---
