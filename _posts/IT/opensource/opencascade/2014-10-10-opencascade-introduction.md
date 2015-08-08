---
layout: post
title: OpenCascade基本框架介绍
category: OpenSource
group: IT
tags: [OpenCascade]
keywords: [opencascade]
description: opencascade框架，opencascade编译，opencascade简介，opencascade目录结构，opencascade依赖关系，opencascade下载

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---

* 目录
{:toc}

# opencascade简介

OpenCASCADE 是一套开放源代码的CAD/CAM/CAE几何模型核心，这一套函数库系统原来是著名的CADCAM软体EUCLID的开发平台，源自于法国的Matra Datavision公司。OpenCASCADE是一个真正工业级的3D建模工具，基于OpenCASCADE可以快速的开发其他CAD系统，能够处理2D或3D建模的各种问题，比如建立实体模型、提供布尔操作、面角操作（倒角、圆角）、计算实体属性、可视化操作、数据格式转换等。

OpenCASCADE是面向对象的C++类库，这些类库被分成了六个类库模块（最小类库模块是基础类库模块，最大的类库模块是模型运算类库模块），这些类库模块及其内容如下表:

|----------+------------+------------+------------+----------------+----------|
|基类      |建模数据类  |建模运算类  |可视化类    |数据转换类      |应用框架  |
|----------+------------+------------+------------+----------------+----------|
|- 内核类  |- 二维几何体|- 基本体构造|- 二维三维  |- IGES          |- 数据框架|
|- 数学工具|- 三维几何体|- 布尔操作  |- 通用体系  |- STEP AP203    |- 数据存储|
|          |- 几何体工具|- 倒角圆角  |- 二维可视化|- STEP AP214    |- 应用界面|
|          |- 拓扑      |- 偏移草图  |- 三维可视化|- 扩展数据      |          |
|          |            |- 缝补扫掠  |            |- exchange(XDE) |          |
|          |            |- 特征      |            |                |          |
|          |            |- 缝补扫掠  |            |                |          |
|          |            |- 消除隐藏线|            |                |          |
|          |            |- 几何工具  |            |                |          |
|          |            |- 拓扑工具  |            |                |          |
|----------+------------+------------+------------+----------------+----------|



Opencascade提供了二维和三维几何体的生成、显示和分析，以及应用框架服务和数据格式转换功能。

在建模和模型运算方面提供的主要功能有：

+ 创建基本几何体及复杂曲面
+ 几何体布尔操作
+ 倒角，斜切，镂空，偏移等操作
+ 几何空间关系计算（法线，点积，叉积，投影，拟合等）
+ 几何体分析（质心，体积，曲率等）
+ 空间变换（平移，缩放，旋转）


# Opencascade结构及windows下编译方法

## Opencascade目录结构

+ adm: 编译OCCT的管理工具
    - cmake:包含CMake编译过程文件
    - msvc:包含Visual C++ 2005, 2008, 2010, 2012 和 2013的工程文件, 可以在windows上用visual studio编译OCCT
+ inc: 包含所有的OCCT头文件
+ src: 包含OCCT源码，根据开发模块组织存放。
+ win32: 存放不同平台编译的目标文件
    - vc10： 用Visual C++ 2010在优化模式编译好的库和可执行文件
        * lib: .lib导出库
        * bin: exe,dll目标文件
+ data: 包含各种不同格式的模型文件。都是occ支持的格式。
+ doc: OCCT的文档（html和pdf格式）。
+ dox: OCCT的文档源代码(markdown格式)
+ drv: 包含用WOK(Workshop Organization Kit用以组织大型项目和开发团队)生成的源代码
+ samples: 示例程序
+ tests: OCCT测试脚本(Tk/TCL)

> 不同版本略有不同，上述为6.8版

## VS直接编译Opencascade

+ 设置custom.bat中的变量
    - VCVER:Visual Studio版本(vc8, vc9, vc10, vc11 or vc12)默认是vc10，我的是vs2013我就改为vc12
    - VCVARS:Visual C++工具路径
    - ARCH:系统构架(32 or 64),影响CSF_OPT_*变量
    - CSF_OPT_*：搜索第3方库的路径，建议不改
        * 第三方库的文件夹默认是带有vc10的，如`freeimage-3.16.0-vc10-64`,建议把所有类似的带有vc10的第三方库文件夹改为自己版本，我自己就改为`freeimage-3.16.0-vc12-64`
        * 另外，注意第3方库的版本的位数，如果是64位，就不能编译为32位了，当然可以自己下载32位库
+ 通过msvc.bat启动Visual Studio
    - note:有时会出现msvc执行后没反应的情况，可以在cmd内执行msvc.bat
+ 编译


事实上，如果使用的不是vs2010编译的时候，还有一个非常简单但是有一点点风险（一般情况下没问题）的方法，即直接修改msvc.bat

例如我用的是vs2013（vc12），直接在`set "PRJFILE=%~dp0\adm\msvc\%VCVER%\OCCT.sln"`前一行添加如下代码，然后打开msvc就ok了

~~~ batch
set "DevEnvDir=%VS120COMNTOOLS%..\IDE"
set "VCVER=vc12"
~~~

## VS手动编译OpenCascade

如果vs版本和opencascade默认vs版本不同或有其他原因导致编译失败，可以通过如下方式手动设置和编译

### 第3方库安装

opencascade的示例都到了不少第3方库，在编译及运行程序的时候需要把第三方库的lib和dll文件加入搜索路径或复制到相应位置。dll文件都在第3方库安装后的bin文件夹内，直接复制到应用程序目录即可运行。

在windows上用opencascade-x.x.x.exe安装opencascade时，安装程序会根据系统环境自动安装合适的第3方库版本(包括版本和构架/32bit/64bit)。用户也可以自己到官网上选择需要的第3方库版本，所有第3方库下载链接汇总在 <http://www.opencascade.org/getocc/require/> 或<http://www.opencascade.org/getocc/download/3rdparty>。第3方库分为必须和可选两种，具体如下

+ 强依赖（必须的）
    - Tcl/Tk： 是运行 DRAW 测试程序所必须的。
    - FreeType： 是3D viewer中，文字表现所必须的。
+ 弱依赖（可选的）
    - TBB：intel线程库(threadingbuildingblocks.org上可以下载各个版本的绿色包)
    - gl2ps：openGL输出成PS/EPS
    - FreeImage：支持20多种图像类型(BMP、JPEG、PNG等)的图像处理库
    - VTK：开源3D图形、图像处理和系那是软件系统，为OCCT visualization提供改写版处理方式（Draw示例编译需要改组件）

> 好像自己编程调用opencascade库，第3方库不是必须的

### 编译顺序

+ Foundation Classes (FoundationClasses.sln)
+ Modeling Data (ModelingData.sln)
+ Modeling Algorithms (ModelingAlgorithms.sln)
+ Visualization (Visualization.sln)
+ Application Framework (ApplicationFramework.sln)
+ Data Exchange (DataExchange.sln)

> OCCT.sln包含了以上所有的内容
> 
> Draw.sln为示例

> 编译示例时，用vc12编译就只能用vc12编译的occt导出库。我在用vs2013(vc12)编译sample的时候用vc10编译的occt没有成功，用vs2013(vc12)重新编译的occt就可以了。

> 运行示例时，用vc12，vc10，vc9的dll都可以，与编译vs版本无关。

### OCC各个模块的依赖关系

![](http://hustlei.qiniudn.com/opencascade/dependence.png)

### OCCT示例不能运行

Opencascade6.9.0的示例中，引用了CASROOT变量（可以设置系统变量，也可以在windows批处理文件或cmd中设置），再打开程序：

~~~ batch
set "CASROOT=C:\OpenCASCADE6.9.0\opencascade-6.9.0\"
~~~

opencascade6.8.0不需要。

opencascade6.9.0中包含了很多引用系统变量的地方，类似`casroot  = getenv("CASROOT");`，会导致编译的组件到其他电脑无法运行，可以把引用系统变量的地方改为字符串重新编译。

# opencascade逻辑结构

## Opencascade的模块划分

OCCT由C++ Class组成, 这些类用于：定义数据结构（几何模型， 显示和图形选取）、实现复杂算法、提供API。

class被分组放在package中，package放在toolkit（library）中管理，toolkit被分组放在不同的module中。即OCCT的组织方式为

+ module（模块）
    - library/toolkit(库/工具)
        * package（包）
            + class（类）

OCCT的模块(module)结构为

![](http://hustlei.qiniudn.com/opencascade/modules.png)


OCCT模块简介

+ 基础类
    - Foundation Classes 包含了基本的底层功能。
+ 模型数据
    - Modeling Data 包含了表示 2D 和 3D 几何和拓朴模型的数据结构（类）。
+ 建模算法
    - Modeling algorithms 包含了大量的拓朴算法和几何算法。
    - Mesh包含了模型对象的网格化算法等。
+ 可视化
    - Visualization 包含了显示模型对象和模型对象的选择功能，一个基于OpenGL的显示系统。
+ 程序框架
    - Application Framework
+ 数据交换
    - Data Exchange

> 如果仅仅使用 Opencascade 中的算法，Foundation, Modeling Data, Modeling algorithms三个模块可以单独拿出来使用。 

# 相关链接

+ [opencascade官网下载](http://www.opencascade.org/getocc/download/loadocc/)
+ [opencascade github下载](http://diyhpl.us/cgit/oce/)
+ [opencascade社区版下载](http://diyhpl.us/cgit/oce/)

+ [opencascade简介](http://www.opencascade.org/occt/overview/)
+ [opencascade官方文档](http://dev.opencascade.org/doc/overview/html/index.html)
+ [opencascade reference](http://dev.opencascade.org/doc/refman/html/index.html)