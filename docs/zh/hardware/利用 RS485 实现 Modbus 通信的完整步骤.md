---
title: 利用 RS485 实现 Modbus 通信的完整步骤
date: 2025-06-11
categories:
  - 硬件与系统
---

# 利用 RS485 实现 Modbus 通信的完整步骤

# 1. 关于 Modbus

> Modbus 是一种通用的工业通信协议，广泛应用于自动化领域中设备之间的通信。它最初由 Modicon（现在的施耐德电气）于 1979 年开发，是一个开放标准的协议。

在 OSI 模型中，Modbus 通常被归类为应用层协议，可以说**RS485** 是 OSI 模型中的**物理层**实现，负责电气和机械特性，**Modbus** 则通常处于 OSI 模型的**应用层**，负责定义数据传输的结构、规则和协议。

Modbus 协议支持多种通信介质和网络，包括 RS232、RS485、TCP/IP，通常用于建立主从结构的通信，主站发送请求（查询）给从站，从站响应请求并返回数据。

> **协议类型**：
>
> - **Modbus RTU**：基于串行通信，通常使用 RS-232 或 RS-485 接口。
> - **Modbus ASCII**：基于 ASCII 编码的串行通信协议。
> - **Modbus TCP**：基于 TCP/IP 网络通信的协议，以太网为基础。

**一主多从**

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/6ad6f828d03e90b8b9e19558e2818db8.png)

# 2. 交叉编译 libmodbus

由于我们需要使用 libmodbus 这个库，而我将在 ARM 开发板上运行，所以需要下载 libmodbus 的库进行交叉编译

## 2.1 下载 libmodbus

[github libmodbus](https://github.com/stephane/libmodbus/releases)

我这里下载了最新的 3.1.10

解压

```shell
tar -zxvf libmodbus-3.1.10.tar.gz
```

## 2.2 配置编译环境

解压后进入`libmodbus-3.1.10`目录

```shell
./configure --host=arm-linux-gnueabihf --prefix=/usr/local/arm-libmodbus
```

如果你没有安装 ARM 的交叉编译工具，则

```shell
sudo apt install gcc-arm-linux-gnueabihf
```

## 2.3 编译并安装库

```shell
make
sudo make install
```

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240627093518.png)

# 3. 复制编译好的文件到 ARM 板

在板子上运行引用到 libmobus 的库还需要将编译好的库文件和头文件复制到 ARM 板上

## 3.1 打包库文件

进入`/usr/local/arm-libmodbus`目录打包

```shell
cd /usr/local/arm-libmodbus
sudo tar czvf arm-libmodbus.tar.gz lib include
```

## 3.2 安装库

将压缩包丢到板子上后进行解压

```shell
tar xzvf arm-libmodbus.tar.gz
```

复制文件

```shell
sudo cp -r lib/* /usr/lib/
sudo cp -r include/* /usr/include/
```

此时库安装完毕

# 4. C 程序测试 Modbus RTU

> Modbus 协议定义了数据的帧格式，包括地址、功能码、数据区域和校验等部分
>
> 如果直接使用 RS485 通信，没有固定的数据格式和通信流程，需要自行处理数据帧的校验、错误检测和恢复等问题

前面准备工作已经做完了，接下来写个 C 程序来测试使用 Modbus RTU，使用 RS485 接口

我下面的代码特地将波特率抽了出来放在一个头文件中，你也可以直接写死或者进行外部传参

## 4.1 master.c

```c
#include <stdio.h>
#include <modbus.h>
#include <errno.h>
#include "config.h"

int main()
{
    modbus_t *ctx;
    uint16_t tab_reg[32];

    // 创建新的 RTU，波特率设置为 115200
    ctx = modbus_new_rtu("/dev/ttyACM0", BAUD_RATE, 'N', 8, 1);

    // 设置 Modbus 从机 ID 为 1
    modbus_set_slave(ctx, 1);

    // 连接到 Modbus 从机
    if (modbus_connect(ctx) == -1)
    {
        fprintf(stderr, "连接失败: %s\n", modbus_strerror(errno));
        modbus_free(ctx);
        return -1;
    }

    // 从地址 0 开始读取 10 个寄存器
    if (modbus_read_registers(ctx, 0, 10, tab_reg) == -1)
    {
        fprintf(stderr, "读取失败: %s\n", modbus_strerror(errno));
        modbus_free(ctx);
        return -1;
    }

    for (int i = 0; i < 10; i++)
    {
        printf("寄存器 %d: %d\n", i, tab_reg[i]);
    }

    // 关闭连接并释放 Modbus
    modbus_close(ctx);
    modbus_free(ctx);
    return 0;
}
```

## 4.2 slave.c

```c
#include <stdio.h>
#include <modbus.h>
#include <errno.h>
#include "config.h"

int main()
{
    modbus_t *ctx;
    modbus_mapping_t *mb_mapping;

    // 创建新的 RTU，波特率设置为 115200
    ctx = modbus_new_rtu("/dev/ttyACM0", BAUD_RATE, 'N', 8, 1);

    // 设置 Modbus 从机 ID 为 1
    modbus_set_slave(ctx, 1);

    // 连接到 Modbus 主机
    if (modbus_connect(ctx) == -1)
    {
        fprintf(stderr, "连接失败: %s\n", modbus_strerror(errno));
        modbus_free(ctx);
        return -1;
    }

    // 分配 Modbus 映射（100 个保持寄存器）
    mb_mapping = modbus_mapping_new(0, 0, 100, 0);
    if (mb_mapping == NULL)
    {
        fprintf(stderr, "映射失败: %s\n", modbus_strerror(errno));
        modbus_free(ctx);
        return -1;
    }

    while (1)
    {
        uint8_t query[MODBUS_RTU_MAX_ADU_LENGTH];
        // 从 Modbus 主机接收查询
        int rc = modbus_receive(ctx, query);

        if (rc > 0)
        {
            // 回复查询
            modbus_reply(ctx, query, rc, mb_mapping);
        }
        else if (rc == -1)
        {
            fprintf(stderr, "接收失败: %s\n", modbus_strerror(errno));
            break;
        }
    }

    // 释放 Modbus
    modbus_mapping_free(mb_mapping);
    modbus_close(ctx);
    modbus_free(ctx);
    return 0;
}
```

## 4.3 config.h

放置配置的头文件，注意头文件保护符

```c
#ifndef CONFIG_H
#define CONFIG_H

#define BAUD_RATE 115200

#endif // CONFIG_H
```

## 4.4 Makefile

写个简单的 Makefile 方便编译

```makefile
CC = arm-linux-gnueabihf-gcc
CFLAGS = -Wall -I/usr/local/arm-libmodbus/include/modbus
LDFLAGS = -L/usr/local/arm-libmodbus/lib -lmodbus

all: master slave

master: master.o
	$(CC) -o master master.o $(LDFLAGS)

slave: slave.o
	$(CC) -o slave slave.o $(LDFLAGS)

master.o: master.c config.h
	$(CC) $(CFLAGS) -c master.c -o master.o

slave.o: slave.c config.h
	$(CC) $(CFLAGS) -c slave.c -o slave.o

clean:
	rm -f master slave *.o
```

## 4.5 运行结果

使用`chmod +x [file]`给文件权限，运行成功你可以看到以下信息，代表基于 RS485 的 Modbus 通讯成功

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240627112118.png)

如果只是简单测试通讯，那么到这里就可以了。

---

相关文章：

[RS-485 串口通信：简易指南与代码示例](https://sharebravery.github.io/linux/RS485.html)

_END_
