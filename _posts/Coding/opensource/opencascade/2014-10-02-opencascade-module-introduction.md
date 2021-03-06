---
layout: post
title: OpenCascade功能及模块简介
category: OpenSource
group: Coding
tags: [OpenCascade]
keywords: [opencascade, OCCT]
description: opencascade框架，opencascade简介，opencascade模块简介，opencascade功能简介

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-02
---

* 目录
{:toc}

# Opencascade功能简介
OpenCASCADE是面向对象的用3D建模引擎，开源并且有相对完整的帮助文档（只要英文）。OpenCASCADE（以下用OCCT代替）主要用于快速开发复杂领域特定的CAD/CAM/CAE软件，国内逐步也有不少人开始使用。

OCCT用C++编写，OCCT也编写了java和.net/C#的封装，但是要收费。国内软件公司anycad也有对OCCT的C#封装，在网上有个免费版（免费版很老，并且有bug），正式版也是要收费的；开源软件narocad也有OCCT的封装，并且分别用P/Invoke和CLI两种方式给出了封装代码（OCCT版本是6.5-6.5.5），CLI方式的封装我没有用成功过，P/Invoke方式又有不少限制，有兴趣可以试试；网上也有不少python方式的OCC封装，个人没有用过。

建模引擎最重要的就是建模和模型运算两个方面，OCCT提供的主要功能有：

+ 创建基本几何体及复杂曲面
+ 几何体布尔操作
+ 倒角，斜切，镂空，偏移等操作
+ 几何空间关系计算（法线，点积，叉积，投影，拟合等）
+ 几何体分析（质心，体积，曲率等）
+ 空间变换（平移，缩放，旋转）

OCCT将所有功能分为了六个模块（最小模块是基础类库模块，最大的类库模块是模型运算类库模块），各模块主要功能如下:

+ 基础类
    - Foundation Classes 包含了其他所有模块都依赖的最基本的底层功能，如基本数据结构、基本几何体（点、线、面、圆柱、平面等初级几何体）、代数算法、集合、异常、内存管理等等。
+ 模型数据
    - Modeling Data 包含了表示 2D 和 3D 几何和拓朴模型的数据结构（类）。包括几何体、拓扑结构等的数据结构。（基础的B样条操作，以及Foundation Class中基本几何体转换为样条曲线曲面，都在内）
+ 建模算法
    - Modeling algorithms 包含了大量的几何算法和拓朴算法。样条曲线、基本几何体、曲线曲面的创建、操作都包含在内。
    - Mesh包含了模型对象的网格化算法等。
+ 可视化
    - Visualization 包含了在图形设备上显示模型和选择模型功能。
+ 程序框架
    - Application Framework提供了一个可用的操作程序特定数据(用户属性)和常用的函数（保存/恢复，undo/redo，复制/粘贴，跟踪CAD修改等。）个人认为主要是CAD文档管理的相关功能。
+ 数据交换
    - Data Exchange提供与流行数据格式交互操作的功能，并通过形状修复功能改进不同CAD软件间的兼容性。

> 如果仅仅使用 Opencascade 中的算法，Foundation, Modeling Data, Modeling algorithms三个模块可以单独拿出来使用。 

各模块间的依赖关系如下：

![](http://hustlei.qiniudn.com/opencascade/dependence.png)


OCCT的模块(module)结构为

![](http://hustlei.qiniudn.com/opencascade/modules.png)


另外，OCCT还提供了一个Draw模块，Draw可以认为是一个测试模块，可以用于测试所有其他模块功能。也可以认为是一个示例软件，用户也可以使用Draw模块中的包或代码。


OCCT模块可以简单的列表（较为粗略，不全面）总结如下：

|---------------+-------------+------------+------------+----------------+----------|
|基类           |建模数据类     |建模运算类  |可视化类      |数据转换类       |应用框架   |
|---------------+-------------+------------+------------+----------------+----------|
|- 根类         |- 2D/3D几何体 |- 基本体构造  |- 二维可视化 |- IGES          |- 数据框架|
|- 基础数据结构  |- 拓扑结构    |- 布尔操作    |- 三维可视化 |- STEP AP203     |- 数据存储|
|- 数学工具      |- 曲线曲面创建|- 倒角圆角    |- 可视化选择 |- STEP AP214     |- 文档管理|
|- 内存管理      |- 曲线曲面变换|- 偏移草图    |- VTK显示方式|- STL            |- undo/redo|
|               |- BRep      |- 缝补扫掠    |             |- VRML          |- 复制/粘贴|
|               |            |- 特征       |             |- 扩展数据交换(XDE)|         |
|               |            |- 放样       |             |- 形状修复        |         |
|               |             |- 消除隐藏线 |             |                 |         |
|---------------+-------------+-------------+------------+-----------------+----------|


# 基础类(Foundation Classes)模块简介
基础类模块提供了OCCT其他模块需要用的最基础的数据结构和服务：

+ 原始类型，例如：布尔型(Boolean)、字符(Character)、整数(Integer)、实数(Real);
+ 字符串，包括ASCII和Unicode字符串
+ 集合类型，包括操作静态大小、动态大小的数据集合。例如：数组(array)、列表(list)、队列(queue)、集(set)、哈希表(hash table / data map)。
+ 常用数值算法、基本线性代数计算(加、成、向量和矩阵的转置、解线性系统等)
+ 表示物理量、支持日期和时间信息的基本类型
+ 异常类，程序运行被异常停止时，描述中断信息

还提供了各种通用服务，比如：

+ 动态创建对象的安全句柄(handle)，确保自动删除没有被引用的对象(智能指针/smart pointer)；
+ 可配置的内存优化管理器提高那些密集使用动态创建对象的程序的性能；
+ 扩展的运行时类型信息(RTTI)机制维持了一个完整的类型层次，并且提供了遍历它的方法；
+ C++流的封装；
+ 堆内存的自动管理，通过使用指定的分配器
+ 基本的表达式解释器，便于用户创建自定义脚本工具、生成表达式定义等；
+ 配置资源文件和定制消息文件的工具，有利于程序中多语言的支持；
+ 进度指示和用户中断接口，给用户提供一个使用统一和方便的方法与算法(甚至是底层算法)通信的可能。
+ 以及很多其他的...

# 建模数据(Modeling Data)模块简介
提供用于实现三维BRep(boundary representation)对象的数据结构。在BRep中，形状被表示为带有拓扑结构的几何图形。几何图形被理解为一个形状的数学描述，例如：曲线和曲面(简单的或规则的、Bizier、NURBS等)。拓扑结构是一种和几何对象绑定在一起的数据结构。

几何类型和工具提供的几何数据结构和服务，如下：

+ 点、向量、曲线和曲面的描述：
    - 它们在三维空间中的位置（使用轴和坐标系）
    - 它们的几何变换，包括移动、旋转、对称、缩放以及组合
+ 通过插值和近似创建参数化曲线和曲面；
+ 直接创建的算法；
+ 曲线曲面转换到NURBS形式；
+ 曲线（2D或3D）上点坐标的计算；
+ 几何对象间的极值的计算。

拓扑结构定义了简单几何实体之间的关系。一个基本拓扑几何实体，可以分解为低一级的子形状。

+ Vertex —— 对应一个点；
+ Edge —— 对应一条曲线，曲线每个端点有一个vertex；
+ Wire —— 一系列edge通过它们的vertex相连；
+ Face —— wires围成的一个平面(2D)或者曲面(3D)；
+ Shell —— 一组face通过它们的edge(组成shell的wire的edge)相连；
+ Solid —— 3D空间内的shells围成的一个封闭的有限的部件；
+ Compound solid —— 一组solid通过它们的边界（组成solid的face的shell的边界）相连。

复杂形状可以被定义为简单实体的装配。

三维几何模型在OCCT中可以保存为BREP格式。如想详细了解可以参考BREP格式白皮书。

# 建模算法(Modeling Algorithms)模块简介
包括大范围用于几何建模的几何算法和拓扑算法。总的来说，有两组算法：

+ 高层次建模算法，可用于实际设计；
+ 低层次的数学支持函数，用于建模API的基础；
+ 低层次的几何工具提供：
    - 计算2条曲线、2个曲面或者一个曲线和一个曲面的交点；
    - 投影点到2D或3D曲线上，点到曲面，3D曲线到曲面；
    - 根据约束创建直线和圆
    - 根据约束创建自由形式曲线或曲面（插值，逼近，蒙皮，间隙填充等等）
+ 低层次拓扑工具提供：
    - 细化(?Tessellate)形状；
    - 检查形状的正确定义；
    - 确定形状的局部和全局属性（导数、惯性矩等等）
    - 进行仿射变换；
    - 查找包含edge的平面
    - 转换形状到NURBS几何体
    - 缝合连接的拓扑结构（face和edge缝合为shell和wire）
    
顶层API提供了如下功能：

+ 创建原始几何体
    - 方盒子(Box)
    - 棱柱(Prism)
    - 圆柱(Cylinder)
    - 圆锥(Cone)
    - 球(Sphere)
    - 圆环(Torus)
+ 运动建模
    - Prism —— 线性扫掠
    - Revolution —— 旋转扫掠
    - Pipe —— 一般形式扫掠
    - Lofting —— 放样
+ 布尔操作，从源形状组合创建一个新的形状。以形状S1和S2为例：
    - Common，交集包括S1和S2中的共有的点
    - Fuse，并集包括S1或S2中拥有的所有点
    - Cut，差集包括在S1中但不在S2中的所有点
 
+ 局部修改的算法，例如：
    - 挖孔(Hollowing);
    - 抽壳(Shelling);
    - 使用草图角度创建锥形形状;
    - 倒圆角或斜切的算法；
+ 创建机械特征的算法，即：凹陷、凸起、沿平面或旋转表面的筋、沟或槽。

## 网格(Mesh)简介
提供使用三角面形式表示对象的相关功能。包括：

+ 保存和形状关联的曲面网格数据的数据结构，和处理数据结构的算法
+ 从BRep对象(形状)创建三角面网格的算法和数据结构
+ 显示网格的工具，以及相关的前、后处理器数据(标量或向量)

OCCT包含两个网格转换器

+ VRML转换器转换OCCT形状到VRML 1.0文件。
+ STL转换器转换OCCT形状到STL文件。STL格式在快速原型(3D打印)上应用十分广泛。

OpenCascade SAS还提供了高级的网格产品：

+ OpenCascade 网格框架(OMF)
+ Express Mesh

# 显示(Visualization)模块简介
提供用于各种对象图形化显示的算法，包括形状、网格等。OCCT的Visulization是基于CAD数据和图形显示分离的。显示可以根据用户自己的程序特殊性进行定制。还支持一个快速强大的交互选择机制。

OCCT提供的view涵盖从使用基本几何和拓扑结构（例如显示带控制点和节点的NURBS，渲染结构线用于评估参数化的速度和质量，或者渲染edge的参数化轮廓）的底层工具到使用光线跟踪（阴影、反射、透明、反锯齿等等）的实时渲染高级工具。

OCCT支持用OpenGl和Direct3D显示。新版的（好像是从6.8开始？）OCCT提供了使用VTK库显示的方法，可以参考VTK用户手册进行深入学习。

# 数据交换(Data Exchange)模块简介
用户基于OCCT可以开发和其他CAD软件交互的软件，可以读和写外部的CAD数据。数据交换可以平滑的运行，不管外部数据的质量如何。

DataExchange模块是根据不同CAD格式（IGES，STEP，STL，VRML等）进行库组织的。

+ 标准的数据交换允许查询、测试输入文件，转换内容到CAD模型，并且在一个完整的转换形状上运行有效性检查。下列格式现在是支持的：
    - STEP(AP203：机械设计，涵盖了通用的3D CAD；AP214：汽车设计）
    - IGES(直到5.3)
    - VRML和STL网格
+ 扩展的数据交换(XDE)允许转换几何数据附加的属性(颜色、图层、名字、材质等等)
+ 高级数据交换组件，支持与使用如下格式的CAD软件的互操作和数据适配（使用了形状修复Shape Healing）：
    - ACIS SAT
    - Parasolid
    - DXF

这些组件是基于和STEP、IGES接口相同的构架。

## 形状修复(Shape Healing)简介
提供算法用于修正和适配从其他CAD导入的形状的几何体和拓扑。包括但不限于如下操作：

+ 分析形状特性，//未完待续


# 应用框架(Application Framework)模块简介
Open CASCADE Application Framework (OCAF)管理基于应用程序/文档形式的应用数据。它使用一个引擎去简化CAD应用的开发。它有如下特征和服务：

+ 数据属性，管理应用程序数据，可以根据开发需要进行组织;
+ 数据保存 (open/save);
+ 在文档中修改和重新计算属性。使用OCAF可以很容易的表达修改历史和模型依赖的参数；
+ 管理多个文档；
+ 预定于的属性 (e.g. 保存尺寸);
+ Undo-Redo 和 复制-粘贴功能。

OCAF可以处理应用程序结构，开发者只需要创建应用程序特定的数据和GUI就可以了。

OCAF和其他CAD框架在组织应用程序数据的方式上是不同的。数据结构是基于引用key的而不是直接放在形状上的，在模型中形状数据、颜色、材质等都被附加到一个树形的结构中。OCAF把这些属性组织到OCAF文档中，OCAF文档使用OCAF Application管理。

# 绘图测试(Draw Test Harness)模块简介
Draw或者Test Harness是一个方便实用的OCCT测试工具。它可以测试各种算法或者创建原型。它包括：

+ 一个基于TCL语言的命令行解释器；
+ 一定数量的2D和3D viewer；
+ 一组预定义的命令

viewer支持缩放、平移、旋转和全屏操作。

基本命令提供了通用的服务，包括：

+ 获取帮助
+ 从文件中运行脚本
+ 获取文件中的命令
+ 管理view
+ 显示对象

另外还提供了如下命令

+ 创建和操作曲线、曲面(几何体)和形状
+ 访问visualization服务
+ 使用OCAF文档
+ 进行数据交换等等

用户也可以自定义命令。


# 相关链接

+ [opencascade简介](http://www.opencascade.org/occt/overview/)
+ [opencascade官方文档](http://dev.opencascade.org/doc/overview/html/index.html)
+ [opencascade reference](http://dev.opencascade.org/doc/refman/html/index.html)