---
layout: post
title: 3D软件格式及转换
category: 3d建模
group: Design
tags: [3d]
keywords: [3d建模格式]
description: 3D软件格式及转换

author: lileilei
revision:
    editor: lileilei
    date: 2016-11-10
---

## 三维模型格式

通常，三维建模软件的输出格式分为三类。 
  
1. 第一类:商业内核级别的数据格式

    如ACIS商业内核的sat数据格式(*.sat 扩展名为SAT的文件)；ParaSolid内核的X_T数据格式(*.X_T)。 
2. 第二类:公共级别的数据格式

    如Step的*.stp；IGES的*.igs
3. 第三类:专用级的数据格式，就是每个软件自己特有的数据文件格式

    如SW的SLDPRT，PROE的PRT等。 
    
> 当前大多数三维软件都是使用的ACIS、Parasolid、Opencascade这三个内核之一，很少有软件单独开发三维模型内核引擎的。
    
## 常用的三维软件及格式
目前机械行业常用的三维造型软件有Proe，Solidworks，CATIA，UG，Inventor等

PRO/E是第一个采用参数化建模的产品，在全球有很多的用户。但PRO/E曲面功能不是太强，所以往往整车厂并不采用它作为主要设计软件。从三维设计、分析、仿真/优化、数控加工、布线系统到产品数据管理等各方面都有相应模块，产品覆盖企业设计和管理全流程。它的销售方式是根据企业不同阶段、不同层次的需求，购买相应的模块，逐步扩充形成完整的产品研发系统，保证了企业在CAD/CAE/CAM/PLM方面有统一的数据平台。能打开的文件格式有IGES，ACIS（.sat），DXF，VDA，SET，STEP，STL，VRML，I-DEAS(.mfl和.pkg)等。 

Solidworks 是一种中端的三维设计软件，以其简单易学、界面友好的特点在中小企业获得很大的市场，能保存的文件格式有\*.slprt， JPEG，STEP，IGES，PART等。

CATIA产品主要应用在航空、汽车行业，其曲面造型功能尤为突出。欧洲大部分汽车公司都采用其作为车身设计的软件。生成的文件格式为IGS、part、model、STL、IGES、CATPart、CATProduct等。

UG被当今许多世界领先的制造商用来从事工业设计、详细的机械设计以及工程制造等各个领域。主要应用于汽车、机械、计算机、模具设计等领域，在造型和模具设计方面很有优势。能输入和输出 的文件格式有PRT，parasolid、step、IGES等。

SpaceClaim是一款三维实体直接建模软件。它为工程和工业设计人员提供了充分的自由和
空间以轻松表达最新的创意，设计人员可以直接编辑模型而不用担心模型的来源，同时可以为CAE分析、快速原型和制造提供简化而准确的模型。SpaceClaim能保存的常见格式: rsdoc,dxf,obj,pdf,stl,xaml,jpg,png.

## 三维软件格式转换
    
软件间文件的传输最让人头痛了，常出现破面甚至模型全乱的情况。

针对不同内核软件使用相应商业内核的三维软件作为中间软件能将数据转换的错误减少到最低。当然使用专也的格式转换软件也可以。

### 中间软件转换 
  
CAXA 实体设计是个拥有ACIS、Parasolid两种商业内核的三维软件，因此，可以借CAXA来做为中间桥梁，保证数据的完整性。 
  
CAXA实体设计选择不同商业内核的方法是：工具-->选项-->零件里，在“新零件所用的缺省核心”处选择。 
  
这样，可以将不同商业内核的文件由CAXA输入，转换商业内核(方法：拾取零件-->右键-->零件属性-->常规-->内核 选择)，后再保存。方便不同商业内核间软件文件的转换。 
  
常用软件所使用的商业内核简介： 
  
Parsolid 有：UG、SolidWorks等； 
  
ASIC 有：CATIA、PRO/E 2001、AutoDESK等。
常见的格式转换软件

### 三维模型格式转换软件

常见的格式转换软件有3DTransVidia、TransMagic、CADfix等。

3DTransVidia是一款功能强大的三维CAD模型数据格式转换与模型错误修复软件，可以针对几乎所有格式的三维模型进行数据格式间的转换，以及模型错误的修复操作。 3DTransVidia可以实现Pro/E、UG、CATIA V4、CATIA V5、SolidWorks、STL、STEP、IGES、Inventor、ACIS、VRML、AutoForm、Parasolid等三维CAD模型数据格式间的相互转换，如：把STEP格式的模型转换成CATIA V5可以直接读取的.CATPart或.CATProduct格式、把IGES格式的模型转换成UG可以直接读取的.prt格式等。

TransMagic是业内领先的三维CAD转换软件产品开发商，产品致力于解决制造业互通操作之间所面临的挑战性问题。TransMagic提供独特的多种格式转换软件产品，使得模型能够在3D CAD/CAM/CAE系统之间快速转换。支持的文件类型从CATIA V4， CATIA V5， Unigraphics， Pro/ENGINEER， Autodesk Inventor， AutoCAD (via \*.sat)， SolidWorks，还有ACIS， Parasolid， JT， STL， STEP and IGES。可以浏览、修复、交换3D CAD数据。

CADfix是针对至今还没有解决的数据转换的问题，它能自动转换并重新利用原有的数据。它能发现模棱两可、不一致、错乱的几何问题，并能通过CADfix进行修复。CADfix在可能的情况下支持全自动转换的方式，在自动方式不能完全解决问题的情况下CADfix另外还提供交互式可视化的诊断和修复工具。CADfix提供给用户分级式的自动、半自动工具，通过五级处理方式来处理模型数据，每一级处理既可以用用户化的自动"向导"来处理，也可以用交互式工具来处理。当自动"向导"处理方式可行的话，CADfix还提供批处理方式的工具来处理大量的模型数据。
