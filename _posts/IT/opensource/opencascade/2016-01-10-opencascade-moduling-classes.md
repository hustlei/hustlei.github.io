---
layout: post
title: OpenCascade类型及对象系统
category: OpenSource
group: IT
tags: [OpenCascade]
keywords: [opencascade]
description: opencascade基础

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---

* 目录
{:toc}

# Opencascade建模类型

OpenCascade 是一个庞大的系统，内容异常丰富，对于无论是学习图形学、计算几何、曲线曲面造型、实体造型的人来说，都是一个很好的参考资料，可以参考和借鉴其中一些算法的实现，加深对一些理论知识的理解。


opencascade的类库包含组件，组件由3个方面组成

+ 模型数据类型
    - 基础类型：数据类型
    - geometry：
        * 解析几何
        * 参数几何
    - Topology
+ 模型操作方法(包含在数据对象内)
    - 直接建模(Make...)
    - 约束建模(in 2D)
    - 运算(intersect, boolean, etc.)
+ 展示

> 几何体分为为解析几何体和参数化几何体，可以采用不同的方法建立

# 模型数据类型

## 基础数据

+ Sdandard Type
    - Standard_Integer
    - Standard_Real
    - Standard_Boolean
    - Standard_CString(char *)
    - Standard_ExtString(short *)
    - Standard_False
    - Standard_True
+ Handles

> handles包装的数据类型可以自动回收内存

## 几何geometry数据

在opencascade模型数据类型有两种

+ Geometry：用于表示可以用数学描述的简单形状
+ Topology：指结构化几何体（用于划定几何边界，群组区域组成复杂形体）

### Geometry

+ Basic(Simple, analytic)2D&3D
    - gp(基础实体)
    - TColgp(基础实体几何)
    - gce(直接建模操作)
    - GccAna(约束建模操作)
    - Adaptor2d,Adaptor3d(实体和计算信息)
    - CPnts(线上的点)
    - LProp(本地属性)
    - Convert(变换)
+ Advanced(complex, analytic & parametric)
    - 2D
        * Geom2d
        * TColGeom2d
        * GCE2d
        * Geom2dGcc
        * Geom2dAPI
        * Geom2dAdaptor
        * GCPnts
        * Geom2dLProp
        * Geom2dConvert
    - 3D
        * Geom *
        * TColGeom *
        * GC
        * GeomAPI
        * GeomAdaptor
        * GCPnts
        * GeomLProp
        * GeomConvert
+ other
    - GeomAbs(Enumeration for geometric algorithms)
    - GccEnt(Conversion to qualified line/circle for GccAna)
    - Precision(标准精度值)
    - GeomTools(Dump, read, write)

> Advanced的每个包的作用可以参考basic内包得出
>
> 带 * 号表示用handle操作


