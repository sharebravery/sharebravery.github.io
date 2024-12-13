# Linux GPIO 快速点灯测试方法

### 1. 导出 GPIO

首先，你需要导出 GPIO 引脚，使其可以被操作。假设 `GPIO1_C5` 对应的 GPIO 编号是 53：

```
echo 53 | sudo tee /sys/class/gpio/export
```

### 2. 设置 GPIO 方向为输出

设置 GPIO 引脚为输出模式：

```
echo "out" | sudo tee /sys/class/gpio/gpio53/direction
```

### 3. 拉高 GPIO 电平（点亮 LED）

将 GPIO 引脚的电平设置为高：

```
echo 1 | sudo tee /sys/class/gpio/gpio53/value
```

### 4. 拉低 GPIO 电平（熄灭 LED）

将 GPIO 引脚的电平设置为低：

```
echo 0 | sudo tee /sys/class/gpio/gpio53/value
```

### 5. 释放 GPIO

完成操作后，释放 GPIO 引脚：

```
echo 53 | sudo tee /sys/class/gpio/unexport
```



## 以下是完整的操作过程

将“53”修改为自己要测试的引脚号即可

```shell
# 导出 GPIO
echo 53 | sudo tee /sys/class/gpio/export

# 设置方向
echo "out" | sudo tee /sys/class/gpio/gpio53/direction

# 设置值
echo 0 | sudo tee /sys/class/gpio/gpio53/value
echo 1 | sudo tee /sys/class/gpio/gpio53/value

# 取消导出 GPIO
echo 53 | sudo tee /sys/class/gpio/unexport

```

# 使用C语言操作

使用C语言来操作/sys/class/gpio  
