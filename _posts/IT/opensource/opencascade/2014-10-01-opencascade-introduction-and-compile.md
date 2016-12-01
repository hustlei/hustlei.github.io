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

## 与其他几何引擎比较
目前，几何造型引擎主要有3个，商业引擎：ACIS和Parasolid ，开源引擎Opencascade。

在国内ACIS应用相对比较多，国内有几所高校（如重庆大学、华中科大、清华大学等）有使用ACIS进行项目应用，并且由若干硕士、博士论文发表。ACIS学习曲线比较陡峭，公开资料比较稀缺，需要购买单独的技术支持服务。考虑到成本因素，在项目开发初期不建议使用该平台。比较适合有充足资金的项目。

Open CASCADE（简称OCC）为开源社区比较成熟的基于BREP结构的建模引擎，能够满足二维三维实体造型和曲面造型，国内研究和使用它的单位也越来越多。OCC可以分为建模、可视化和数据管理（OCAF）三大模块。其中建模为核心组件；可视化组件基于OpenGL，相对其他的三维可视化OpenGL平台（如Coin3d，Open Inventor， Ogre3d， OSG， VTK等）,功能简单，并且显示效果比较差，不能充分利用GPU硬件加速；OCAF采用树的方式管理数据，使用比较复杂，效率比较低，并且不适合自定义扩展。因此，不推荐使用OCC的可视化和数据管理组件。

## 基于Opencascade的CAD软件
FreeCAD是一款基于Open CASCADE和Coin3d的CAD软件，支持2d和3d。支持Python，跨平台，使用简单。但是缺少清晰的软件架构，代码组织比较杂乱，不易读懂。FreeCAD适合用户用来建立简单模型，不适合CAD研究和开发者。

HeeksCAD与FreeCAD类似，缺少清晰的软件架构，不适合CAD研究和开发者。

AnyCAD
与其说AnyCAD是AnyCAD是一款CAD软件，不如说AnyCAD是一个基于Open CASCADE的三维建模和可视化平台。基于AnyCAD，AnyCAD团队开发了AnyCAD Free，AnyCAD Viewer，AnyCAD Design Suites等产品，并且提供.Net SDK供第三方产品集成。但是是收费的。

pythonOCC 提供一個完整的Python包裝的OpenCascade三维建模/可視化库。

## Opencascade下载

Opencascade源代码可以从官网[[www.opencascade.com](https://www.opencascade.com/)]下载。

+ 可以选择最新版本也可以选择老版本。（近保含5.5版以后的）
+ 可以选择安装版也可以选择压缩包下载，都包含了源代码，文档，示例以及测试文件。安装版还包含了依赖的第三方库以及编译好的dll及lib文件。

在官网的[开发者页面](https://dev.opencascade.org/index.php?q=home/resources)上也可以找到git地址，可以直接clone到本地。

也可以再官网的[gitweb](http://git.dev.opencascade.org/gitweb/)上直接浏览或下载源码。

Opencascade还有一个社区版本，即OCE，由非官方人员维护，算是Opencascade的一个分支吧。可以再github上查看，地址为<http://git.dev.opencascade.org/gitweb/>，貌似大名鼎鼎的FreeCAD用的就是OCE，有兴趣可以查看，本人没有接触过。

# Opencascade目录结构

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


# 在windows下编译Opencascade

## 直接编译Opencascade
直接双击msvc.bat打开vs，就可以编译了。

如果你的vc版本和或者想编译不同构架(x86/x64)的occt，则需要先进行设置，然后编译：

+ 设置custom.bat中的变量
    - VCVER:Visual Studio版本(vc8, vc9, vc10, vc11 or vc12)默认是vc10，我的是vs2013我就改为vc12
    - VCVARS:Visual C++工具路径
    - ARCH:系统构架(32 or 64),影响CSF_OPT_*变量
    - CSF_OPT_*：搜索第3方库的路径，建议不改
+ 第三方库
    - 第三方库默认只根据你下载的版本安装某一个版本。比如我的opencascade6.9默认安装的就是vc10 32位的
    - 第三方库的vc10，vc12等并不需要和你编译occt的vc版本相同，只是如果不同的话，运行的时候就需要两个版本的vc运行时都要有
    - 但是第3方库的版本的位数必须和你要编译的位数相同，如果是64位，就不能编译为32位了。如果你要编译32位的，但是没有安装32位第三方库，你就需要自己下载32位库了，下载方法参考本文最后小节
        * 如果第三方库是你自己下载的，那么就需要在custom中修改为你自己下载的名字。
+ 通过msvc.bat启动Visual Studio
    - note:有时会出现msvc执行后没反应的情况，可以在cmd内执行msvc.bat
+ 编译

**找不到VS的问题**

例如我用的是vs2013（vc12），但是编译opencascade6.9的时候用msvc.bat就找不到vs。这是因为msvc里没有设置vs2013的位置。可以这样解决：在msvc.bat的`set "PRJFILE=%~dp0\adm\msvc\%VCVER%\OCCT.sln"`前一行添加如下代码，然后打开msvc就ok了

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

Opencascade6.9.0(包括以后版本)的示例中，引用了CASROOT等很多环境变量，所以需要设置环境变量后（可以在bat中设置系统变量然后在bat中直接start示例）再打开程序：

~~~ batch
set "CASROOT=C:\OpenCASCADE6.9.0\opencascade-6.9.0\"
~~~

opencascade6.8.0不需要。

opencascade6.9.0(包括以后版本)中包含了很多引用系统变量的地方，类似`casroot  = getenv("CASROOT");`，如果没有设置CASROOT等环境变量会导致编译的组件到其他电脑无法运行。所以，无论是编译OCCT还是自己编写程序调用OCCT，都要先根据env.bat文件中的变量设置环境变量。


# 相关链接

+ [opencascade官网下载](http://www.opencascade.org/getocc/download/loadocc/)
+ [opencascade github下载](http://diyhpl.us/cgit/oce/)
+ [opencascade社区版下载](http://diyhpl.us/cgit/oce/)

+ [opencascade简介](http://www.opencascade.org/occt/overview/)
+ [opencascade官方文档](http://dev.opencascade.org/doc/overview/html/index.html)
+ [opencascade reference](http://dev.opencascade.org/doc/refman/html/index.html)