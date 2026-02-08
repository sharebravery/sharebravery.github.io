---
title: 上帝说要有光
date: 2025-06-11
categories:
  - 硬件与系统
tags:
  - Linux
  - GPIO
---

# Linux GPIO 入门：点个灯

嵌入式开发的 Hello World 就是点灯。能控制一个 LED 的亮灭，就能控制继电器、电机。

Linux 有句话："一切皆文件"。连硬件引脚也是文件。我们可以像写文本文件一样，通过读写特定的系统文件来控制电压高低。

## 核心流程：sysfs 接口

我们用 `sysfs` 接口操作 GPIO。修改文件系统里的配置，直接指挥硬件干活。

```mermaid
graph LR
    A[用户空间] -->|写文件| B(sysfs 文件系统)
    B -->|驱动调用| C[内核空间]
    C -->|控制寄存器| D((GPIO 引脚))
    D -->|电流通断| E[LED]
```

## 实战：五步点灯

假设我们要控制 `GPIO53`（对应的物理引脚需查阅开发板手册）。

### 1. Export 导出引脚

告诉内核："这个引脚归我管了"。这会在 `/sys/class/gpio/` 下生成一个新文件夹 `gpio53`。

```bash
# 导出 53 号引脚
echo 53 | sudo tee /sys/class/gpio/export
```

### 2. 设置方向

引脚是用来读（输入，如按钮）还是写（输出，如 LED）？这里我们要控制 LED，所以是输出。

```bash
# 设置为输出模式
echo "out" | sudo tee /sys/class/gpio/gpio53/direction
```

### 3. 点亮 LED

写入 `1` 代表高电平（通常是 3.3V 或 1.8V），LED 亮起。

```bash
# 高电平，LED 亮
echo 1 | sudo tee /sys/class/gpio/gpio53/value
```

### 4. 熄灭 LED

写入 `0` 代表低电平（GND），LED 熄灭。

```bash
# 低电平，LED 灭
echo 0 | sudo tee /sys/class/gpio/gpio53/value
```

### 5. Unexport 释放引脚

用完记得释放资源。

```bash
# 释放引脚
echo 53 | sudo tee /sys/class/gpio/unexport
```

## 完整脚本

保存为 `blink.sh`，修改 `PIN_NUM` 即可使用。

```bash
#!/bin/bash
PIN_NUM=53

echo "Testing GPIO $PIN_NUM..."

# 1. Export
echo $PIN_NUM | sudo tee /sys/class/gpio/export > /dev/null

# 2. Set Output
echo "out" | sudo tee /sys/class/gpio/gpio$PIN_NUM/direction

# 3. Blink 3 times
for i in {1..3}
do
    echo "ON"
    echo 1 | sudo tee /sys/class/gpio/gpio$PIN_NUM/value
    sleep 0.5
    echo "OFF"
    echo 0 | sudo tee /sys/class/gpio/gpio$PIN_NUM/value
    sleep 0.5
done

# 4. Cleanup
echo $PIN_NUM | sudo tee /sys/class/gpio/unexport > /dev/null
echo "Done!"
```

## 性能问题

`sysfs`（echo/cat）方式简单直观，适合 shell 脚本和调试。但在高性能场景下（比如 PWM 波形或快速翻转 IO），效率极低。每次操作都涉及文件系统 IO 和用户态/内核态切换。

正经的 C/C++ 程序推荐用 `libgpiod` 或者直接操作寄存器（mmap）。但如果只是想点个灯，`echo 1` 足够了。
