---
layout: post
title: cl.exe编译c程序
category: 编程工具
group: IT
tags: []
keywords: [cl.exe]
description: cl.exe编译c语言

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# 简介

所有编译器选项都区分大小写。

nasm cl link是windows c 工具链

+ 使用 NMAKE 生成输出文件。
+ 使用 BSCMAKE 支持类浏览。

# 编译器选项列表

## 优化

选项 作用 
/O1 创建小代码 
/O2 创建快速代码 
/Os 代码大小优先 
/Ot 代码速度优先 
/Ox 使用最大优化 (/Ob1gity /Gs) 

## 代码生成

**/clr 启用 C++ 的托管扩展并产生在公共语言运行库上运行的输出文件**
/GL 启用全程序优化 
/Gm 启用最小重新生成 

## 输出文件

/Fe 重命名可执行文件 
/Fo 创建对象文件 


## 预处理器

**/D 定义常数和宏** 
**/E 将预处理器输出复制到标准输出** 
**/I 在目录中搜索包含文件 **

## 语言

/Zs 只检查语法 

## 链接

**/LD 创建动态链接库** 
/link 将指定的选项传递给 LINK 
**/MD 使用 MSVCRT.lib 编译以创建多线程 DLL**
**/ML 使用 LIBC.lib 编译以创建单线程可执行文件**
**/MT 使用 LIBCMT.lib 编译以创建多线程可执行文件**
/LDd 创建调试动态链接库
/MDd 使用 MSVCRTD.lib 编译以创建调试多线程 DLL 
/MLd 使用 LIBCD.lib 编译以创建调试单线程可执行文件 
/MTd 使用 LIBCMTD.lib 编译以创建调试多线程可执行文件 

## 杂项

**/c 编译但不链接 **
/Tc 指定 C 源文件 
/Tp 指定 C++ 源文件 
**/W3 设置警告等级** 
**/w 禁用所有警告** 
**/Wall 启用所有警告，包括默认情况下禁用的警告**


## 示例

cl *.c /LD  /D_DLL_E /Fe:test.dll

cl *.c /Fe:test.exe /W3 /Ox /Ot /I"include"