# 探索IEC 61499：工业自动化的创新之路

> IEC 61499 defines a domain-specific modeling language for developing distributed industrial control solutions. IEC 61499 extends IEC 61131-3 by improving the encapsulation of software components for increased re-usability, providing a vendor independent format, and simplifying support for controller-to-controller communication. Its distribution functionality and the inherent support for dynamic reconfiguration provide the required infrastructure for Industry 4.0 and industrial IoT applications.

> IEC 61499 定义了一种用于开发分布式工业控制解决方案的领域特定建模语言。IEC 61499 通过改进软件组件的封装以提高可重用性、提供独立于供应商的格式以及简化对控制器到控制器通信的支持来扩展 IEC 61131-3。其分布式功能和对动态重新配置的固有支持为工业 4.0 和工业物联网应用提供了所需的基础设施。

# 关于IEC61499

IEC61499和IEC 61131-3最大的区别就是IEC61499更多的从整个系统层面考虑，是分布式的整体系统，在分布式系统中，各个部分都具有智能，并且可以顺利地相互通信，因此系统作为一个整体运行。而IEC61131-3设计之初就没考虑到整体系统的联动，只是针对于单个设备。

现如今IEC61131-3在工业上被广泛使用，尽管IEC61499早已被提出，但没有得到什么应用，更多的只是作为学术上的研究。一方面工业行业比较趋于稳定，国内外都没有很大的动力去进行变革，截至现在国内外也没有多少公司在进行这方面的研究探索。

IEC61131-3支持五种不同的编程语言，IEC61499却只支持FB（功能块）的拖拽进行编辑使用，缺少更为灵活的编程方式，这一点对于底层开发人员来说不算友好。

# 4diac最小案例演示IEC61499

下面，使用[4diac](https://eclipse.dev/4diac/ )来和树莓派来演示IEC61499：

4diac需要我们关注的是由eclipse修改来的IDE和forte运行时，

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/4diac.png)

## 实现最小案例Blink——闪烁的LED

### 一、IDE拖拽功能块

#### 1. 创建新项目Blink2

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/4diac_new_20240619162217.png)

#### 2. 在Blink2App中拖拽以下模块并按图连线

- E_CYCLE中设置**T#500ms**
- QX中设置QI为**1**
- QX中设置PARAMS为树莓派上要控制的LED引脚，我这里为21

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619162950.png)

#### 3. 在System Configuration中拖拽以下模块重命名并连线

- 注意这里的URL后面需要修改为自己的板子的地址

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/image-20240619163119400.png)

#### 4. 映射模块

选择这些模块映射到设备上

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619165915.png)

#### 5. 在设备中连接START

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619163415.png)

#### 6. 最终项目结构

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619163544.png)

### 二、树莓派部署FORTE

#### 1. 交叉编译FORTE

打开连接，按照文档一步步操作即可

[Cross-compiling for the RPI](https://eclipse.dev/4diac/en_help.php?helppage=html/installation/raspi.html)

- 需要注意的是FORTE之前使用WiringPi来操作引脚，现在最新版已改为使用sysFs，而树莓派23年10月后更新了系统，对于sysFs可能废弃了，所以最新版树莓派系统上直接运行FORTE是有问题的，太老的系统也会缺少一些运行库，我这里经过测试选用了23年十月的系统

  ![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/6f90bc79fc9f7e5354c6633fd73864e.png)

#### 2. 在IDE上导出forte.fboot

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619164006.png)

将得到的文件命名为forte.fboot并和编译得到的forte二进制文件一起上传至树莓派

给forte权限

```shell
chmod +x ./forte
```

#### 3. 指定运行端口（可选，如果需要）

运行并注意System Configuration的地址要和树莓派的地址一直，可以查看修改

```shell
./forte -c localhost:61500 
```

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619165212.png)

### 三、通讯测试

#### 1. 部署Blink2

在Blink2上右键部署，并选择Monitor System以监听变化

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619165532.png)

#### 2. 监听变化

选中所有模块，选择watch

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240619165746.png)



#### 3. 闪烁的LED

可以看到指定引脚的LED开始可闪烁，可以在E_CYCLE调整闪烁间隔

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/d287b6651195070f8fc485a1d408a36.jpg)

## 4diac多设备案例演示

#### 1. 添加设备

接着刚才的Blink2项目，在System Configuration中我们添加一个设备

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240621141505.png)

这两个设备分别代表两个树莓派，地址即为树莓派的地址

#### 2. 复制一份第一个设备的FB

在Blink2App中复制并映射到新的设备上

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240621142651.png)

#### 3. 连接START

不要忘了连接到START上，点击RasPi2的Test1_RES

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240621142958.png)

#### 4. 最终目录结构

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240621143044.png)

#### 5. 部署应用

- 在Blink2App上右键部署

- 重新导出forte.fboot放到两个板子上
- 记得给forte权限（`chmod +x ./forte`）

此时应可以看到两个板子的灯开始了闪烁



---

参考资料：

- https://eclipse.dev/4diac/en_help.php?helppage=html/parameters/parameters.html
- https://blog.csdn.net/M3242257672/article/details/128862674

*END*

---

