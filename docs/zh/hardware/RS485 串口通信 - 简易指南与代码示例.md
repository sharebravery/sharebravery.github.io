---
title: RS485 串口通信 - 简易指南与代码示例
date: 2025-06-11
categories:
  - 硬件与系统
tags:
  - Hardware
---


# RS-485 串口通信：简易指南与代码示例

# 1. RS-485 介绍

> RS-485 是一种**物理层通信标准**，定义了电气特性、传输速率、线路拓扑等细节

RS485 是一种广泛应用于工业领域的半双工串行通信协议。RS485 可以支持多达 32 个设备在同一总线上通信。RS485 的最大传输速率可以达到 10Mbps，但实际应用中，速率和传输距离成反比关系。

RS485 使用**差分信号传输**，这意味着它通过一对互补信号线（通常标记为 A 和 B）传输数据。

在 RS485 总线的两端需要连接终端电阻（通常为 120 欧姆），以匹配线路阻抗，防止信号反射。

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240624154659.png)

RS-485 与 RS-232 的差异只体现在物理层上，它们的协议层是相同的，也是使用串口数据包的形式传输数据。

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/1719215652979.jpg)

# 2. RS485 为何更抗干扰

这里说一下为什么 RS485 会更为抗干扰：

我们知道普通的 TTL 串口只适合短距离传输。TTL 通信是通过电压的高低变化来传输数据的，由于其单端传输方式，对静电和电磁干扰非常敏感，容易受到干扰而导致信号周期混乱，从而造成数据错误。因此，TTL 适合的传输距离通常较短。

而 RS485 使用两根互相扭绞的线*（A 和 B 线）*来传输数据，**当一根线上的电压升高时另一根线上的电压会相应降低**，这就是前面所说的**差分信号传输**，接收端可以通过对比两根线的**电压差**来过滤干扰信号。这样就可以有效抵消外部电磁干扰。

总线的两端加上的终端电阻也可以减少信号反射和误码率。

# 3. 简单的通信测试

接线时记住 A 对 A，B 对 B

- 查看波特率

  ```shell
  stty -F /dev/ttyACM0 # ttyACM0 替换为自己的串口
  ```

- 设置波特率

  ```shell
  stty -F /dev/ttyACM0 115200
  ```

- 接收端

  ```shell
  cat /dev/ttyACM0
  ```

- 发送端

  ```shell
  echo "Hello, RS485" > /dev/ttyACM0
  ```

# 4. 回环测试

在硬件上，普通的 TTL 串口信号通过一个转换芯片（这种芯片可以将 TTL 电平的单端信号转换为 RS-485 电平的差分信号）处理后可以转换为 RS-485 信号。

我进行了单机测试，将 A 和 B 端连接在一起进行回环测试，结果证实 RS-485 确实不能进行回环通信。

# 5. 使用 C 程序测试 RS-485

## 5.1 发送端 sender.c

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <string.h>

#define SERIAL_PORT "/dev/ttyACM0"
#define BAUDRATE B115200 // 波特率，与串口模块配置一致
#define DELAY_US 1000000 // 发送间隔，单位微秒

int main()
{
    int fd;
    struct termios options;

    // 打开串口
    fd = open(SERIAL_PORT, O_RDWR | O_NOCTTY | O_NDELAY);
    if (fd == -1)
    {
        perror("open_port: Unable to open port");
        return 1;
    }

    // 获取当前串口配置
    if (tcgetattr(fd, &options) != 0)
    {
        perror("tcgetattr failed");
        close(fd);
        return 1;
    }

    // 设置波特率
    cfsetispeed(&options, BAUDRATE);
    cfsetospeed(&options, BAUDRATE);

    // 无校验，8 位数据位，1 位停止位
    options.c_cflag &= ~PARENB;
    options.c_cflag &= ~CSTOPB;
    options.c_cflag &= ~CSIZE;
    options.c_cflag |= CS8;

    // 设置为本地连接，使能接收
    options.c_cflag |= (CLOCAL | CREAD);

    // 设置为原始模式
    options.c_lflag &= ~(ICANON | ECHO | ECHOE | ISIG);

    // 禁用软件流控制
    options.c_iflag &= ~(IXON | IXOFF | IXANY);

    // 禁用硬件流控制
    options.c_cflag &= ~CRTSCTS;

    // 设置新的串口设置
    if (tcsetattr(fd, TCSANOW, &options) != 0)
    {
        perror("tcsetattr failed");
        close(fd);
        return 1;
    }

    // 循环发送数据
    char write_buffer[256];
    while (1)
    {
        // 获取用户输入
        printf("Enter message to send (max 255 characters): ");
        fgets(write_buffer, sizeof(write_buffer), stdin);

        // 移除换行符
        write_buffer[strcspn(write_buffer, "\n")] = 0;

        // 发送数据
        int bytes_written = write(fd, write_buffer, strlen(write_buffer));
        if (bytes_written < 0)
        {
            perror("write failed");
            close(fd);
            return 1;
        }
        printf("Sent: %s\n", write_buffer);

        usleep(DELAY_US); // 发送间隔
    }

    // 关闭串口
    close(fd);

    return 0;
}
```

## 5.2 接收端 recriver.c

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>
#include <string.h>

#define SERIAL_PORT "/dev/ttyACM0"
#define BAUDRATE B115200 // 波特率，与串口模块配置一致

int main()
{
    int fd;
    struct termios options;

    // 打开串口
    fd = open(SERIAL_PORT, O_RDWR);
    if (fd == -1)
    {
        perror("open_port: Unable to open port");
        return 1;
    }

    // 获取当前串口配置
    if (tcgetattr(fd, &options) != 0)
    {
        perror("tcgetattr failed");
        close(fd);
        return 1;
    }

    // 设置波特率
    cfsetispeed(&options, BAUDRATE);
    cfsetospeed(&options, BAUDRATE);

    // 无校验，8 位数据位，1 位停止位
    options.c_cflag &= ~PARENB;
    options.c_cflag &= ~CSTOPB;
    options.c_cflag &= ~CSIZE;
    options.c_cflag |= CS8;

    // 设置为本地连接，使能接收
    options.c_cflag |= (CLOCAL | CREAD);

    // 设置为原始模式
    options.c_lflag &= ~(ICANON | ECHO | ECHOE | ISIG);

    // 禁用软件流控制
    options.c_iflag &= ~(IXON | IXOFF | IXANY);

    // 禁用硬件流控制
    options.c_cflag &= ~CRTSCTS;

    // 设置新的串口设置
    if (tcsetattr(fd, TCSANOW, &options) != 0)
    {
        perror("tcsetattr failed");
        close(fd);
        return 1;
    }

    // 循环接收数据
    while (1)
    {
        char read_buffer[256];
        int bytes_read = read(fd, read_buffer, sizeof(read_buffer) - 1);
        if (bytes_read < 0)
        {
            perror("read failed");
            close(fd);
            return 1;
        }
        read_buffer[bytes_read] = '\0';
        printf("Received: %s\n", read_buffer);
    }

    // 关闭串口
    close(fd);

    return 0;
}
```



## 5.3 Makefile

为了方便编译，这里附上一个简单的 Makefile

```makefile
CC = arm-linux-gnueabihf-gcc
CFLAGS = -Wall

all: sender receiver

sender: sender.c
	$(CC) $(CFLAGS) -o sender sender.c

receiver: receiver.c
	$(CC) $(CFLAGS) -o receiver receiver.c

clean:
	rm -f sender receiver
```

先运行接收端再运行发送端

send:

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240625172956.png)

receive:

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240625173041.png)

可以进行进一步的优化，将`SERIAL_PORT`等由外部传参而入，这样方便对多个串口进行测试。

---

参考资料：

https://doc.embedfire.com/mcu/stm32/f407batianhu/std/zh/latest/book/RS485.html

*END*

---

