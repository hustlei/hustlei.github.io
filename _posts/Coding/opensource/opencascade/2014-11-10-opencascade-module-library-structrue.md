---
layout: post
title: OpenCascade模块及库组织方式
category: OpenSource
group: Coding
tags: [OpenCascade]
keywords: [opencascade]
description: opencascade模块，opencascade文件结构，opencascade库文件，opencascade dll文件，opencascade模块和库

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---

* 目录
{:toc}

# Opencascade模块及类库结构
OCCT由C++ Class组成, 这些类用于：定义数据结构（几何模型， 显示和图形选取）、实现复杂算法、提供API。class被分组放在package中，package放在toolkit（library，每个都是一个独立的dll文件）中管理，toolkit被分组放在不同的module中。即OCCT的组织方式为

+ Opencascade库被分为6个主要模块(module)
+ 每个模块包含多个类库/工具箱(toolkit/library)
+ 每个类库包含多个包(package)
+ 每个包包含多个类(class)
 
层次关系如下：

+ module（模块）            //共6个模块
    - library/toolkit(库/工具)//ps:每个库都是一个单独的dll文件
        * package（包）       //库中同一个包内的类具有相同的前缀
            * class（类）        //类命名方式为：<package-name>_<class-name>.cxx (or .hxx)

## opencascade模块库明细

OCCT共有6个模块，每个模块包含多个toolkit（每个toolkit都是一个单独的dll文件），每个

+ Opencascade共有57个类库(dll)
    - Foundation（基础类模块）
        * TKernel.dll
        * TKMath.dll
    - Modeling Data（模型数据模块）
        * TKG2d.dll
        * TKG3d.dll
        * TKGeomBase.dll
        * TKBRep.dll
    - Modeling Algorithms（建模算法模块）
        * TKBO.dll
        * TKBool.dll
        * TKFeat.dll
        * TKFillet.dll
        * TKGeomAlgo.dll
        * TKHLR.dll
        * TKMesh.dll
        * TKOffset.dll
        * TKPrim.dll
        * TKShHealing.dll
        * TKTopAlgo.dll
        * TKXMesh.dll
    - Visualization（可视化模块）
        * TKIVtk.dll
        * TKMeshVS.dll
        * TKNIS.dll
        * TKOpenGl.dll
        * TKService.dll
        * TKV3d.dll
        * TKVoxel.dll
    - Application Framework（程序框架模块）
        * FWOSPlugin.dll
        * PTKernel.dll
        * TKBin.dll
        * TKBinL.dll
        * TKBinTObj.dll
        * TKCAF.dll
        * TKCDF.dll
        * TKLCAF.dll
        * TKPCAF.dll
        * TKPLCAF.dll
        * TKPShape.dll
        * TKShapeSchema.dll
        * TKStdLSchema.dll
        * TKStdSchema.dll
        * TKTObj.dll
        * TKXml.dll
        * TKXmlL.dll
        * TKXmlTObj.dll
    - Data Exchange（数据交换模块）
        * TKBinXCAF.dll
        * TKIGES.dll
        * TKSTEP.dll
        * TKSTEP209.dll
        * TKSTEPAttr.dll
        * TKSTEPBase.dll
        * TKSTL.dll
        * TKVRML.dll
        * TKXCAF.dll
        * TKXCAFSchema.dll
        * TKXDEIGES.dll
        * TKXDESTEP.dll
        * TKXmlXCAF.dll
        * TKXSBase.dll
+ windows上安装的opencascade的bin目录中有66个dll文件

    其中9个是示例DRAW项目的(自己编写程序也可以引用)

    - KDCAF.dll
    - TKDraw.dll
    - TKIVtkDraw.dll
    - TKQADraw.dll
    - TKTObjDRAW.dll
    - TKTopTest.dll
    - TKViewerTest.dll
    - TKXDEDRAW.dll
    - TKXSDRAW.dll

# Opencascade模块类库简介

## Foundation 模块

Kernel/Tkernel

Math Utilities/TKMath

## Modeling Data 模块

2D Geometry Types/TK2d

3D Geometry Types/TK3d

Geometry Utilities/TKGeomBase

Topology/TKBRep

Properties of shapes

## Modeling Algorithms 模块

TKBO
TKBool
TKFeat
TKFillet
TKGeomAlgo
TKHLR
TKMesh
TKOffset
TKPrim
TKShHealing
TKTopAlgo
TKXMesh

Geometric Tools

Topological Tools

Construction of Primitives

Boolean Operations

Fillets and Chamfers

Offsets Drafts and Sweeps

Features

Hidden Line Removal

Sewing

Shape Healing

Shape Translation

VRML Format

## Visualization 模块

TKIVtk
TKMeshVS
TKNIS
TKOpenGl
TKService
TKV3d
TKVoxel


3D Graphics

3D Visualization

Application Interactive Services

Presentation

Attribute Management

Mesh Visulization Services

Images and Drivers

New Interactive Services(NIS)

Voxels


## Application Framework 模块

FWOSPlugin
PTKernel
TKBin
TKBinL
TKBinTObj
TKCAF
TKCDF
TKLCAF
TKPCAF
TKPLCAF
TKPShape
TKShapeSchema
TKStdLSchema
TKStdSchema
TKTObj
TKXml
TKXmlL
TKXmlTObj



## Data Exchange 模块

TKBinXCAF
TKIGES
TKSTEP
TKSTEP209
TKSTEPAttr
TKSTEPBase
TKSTL
TKVRML
TKXCAF
TKXCAFSchema
TKXDEIGES
TKXDESTEP
TKXmlXCAF
TKXSBase


General Definitions

IGES

STEP

Extended Data Exchange


# 相关链接

+ [opencascade简介](http://www.opencascade.org/occt/overview/)
+ [opencascade官方文档](http://dev.opencascade.org/doc/overview/html/index.html)
+ [opencascade reference](http://dev.opencascade.org/doc/refman/html/index.html)

+ [opencascade造型引擎功能介绍](http://www.cnblogs.com/amtf/articles/2285775.html)
+ [Open CASCADE基础类简介](http://www.tuicool.com/articles/ZBfUVn)