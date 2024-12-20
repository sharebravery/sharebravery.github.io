# 静态库和动态库的对比

静态库的代码在编译时被嵌入到可执行文件中， 动态库文件一般以**.so、.dll**为结尾，在程序运行阶段被加载。

### 比较总结

| 特性           | 静态库                                       | 动态库                                 |
| -------------- | -------------------------------------------- | -------------------------------------- |
| **链接时间**   | 编译时链接，库的代码被嵌入到可执行文件中     | 运行时链接，程序需要加载动态库         |
| **文件大小**   | 可执行文件较大，因为包含库的代码             | 可执行文件较小，库代码存放在外部       |
| **依赖性**     | 不依赖外部库，所有内容都包含在可执行文件中   | 需要外部动态库，程序运行时依赖它们     |
| **内存使用**   | 每个程序都有自己独立的库副本，内存占用大     | 多个程序可以共享一个库副本，内存更节省 |
| **版本更新**   | 如果库更新，需要重新编译所有程序             | 可以单独更新库文件，程序无需重新编译   |
| **跨平台支持** | 需要为每个平台分别编译静态库                 | 同一个动态库可以跨平台（需适配平台）   |
| **部署**       | 部署时无需考虑库文件，但需要包含库的所有代码 | 需要确保目标系统中有适当版本的动态库   |

### 适用场景

- **静态库：** 当需要更简单的部署，且对执行文件的大小没有太多要求时，静态库更适合。适用于嵌入式系统或需要离线安装的程序。
- **动态库：** 当多个程序需要共享相同功能，且希望能够在不重新编译的情况下更新库时，动态库更有优势。适用于大型系统、操作系统内核模块、插件式架构等。