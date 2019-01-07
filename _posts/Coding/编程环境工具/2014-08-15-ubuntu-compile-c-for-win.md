---
layout: post
title: ubuntu下交叉编译windows c程序
category: 编程工具
group: Coding
tags: []
keywords: [交叉编译, c语言, ubuntu, xubuntu]
description: ubuntu(xubuntu)交叉编译c语言

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

# 简介

采用mingw32可以在linux下直接编译c程序输出为windows下的exe程序或dll链接库。

个人编译的纯c程序（不含winapi），主要是c99程序，通常采用gcc/cc编译调试后，再用mingw输出win目标文件。

> linux下目标程序及共享库与windows下的应用程序及链接库不同。

# 具体步骤

1. 安装mingw

    sudo apt-get install mingw32 mingw32-binutils mingw32-runtime

    即使不输入mingw32-binutils和mingw32-runtime也会自动安装

2. 编译

    i586-mingw32msvc-gcc hello.c -o hello.exe

3. 个人习惯

    alias cl='i586-mingw32msvc-gcc -std=c99'

    cl *.o -mdll -o test.dll

    cl hello.c -o hello.exe


# mingw命令

* C compiler: i586-mingw32msvc-gcc
* C++ compiler: i586\-mingw32msvc\-g++
* Linker for dynamic libs: i586-mingw32msvc-g++
* Linker for static libs: i586-mingw32msvc-ar
* Debugger: i586-mingw32msvc-gdb

