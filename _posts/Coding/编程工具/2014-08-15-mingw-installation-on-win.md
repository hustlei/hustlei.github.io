---
layout: post
title: windows上安装设置mingw和msys
category: 编程工具
group: Coding
tags: []
keywords: [mingw, msys]
description: windows上安装设置mingw及msys

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-15
---

* 目录
{:toc}

# 简介

MinGW是Mininalist GNU on Windows的缩写

+ 以windows平台为目标的GNU工具集
+ 编译器包括c/c++, Ada, Fortran, obj-C
+ 可以在linux及windows平台上生成windows程序，而不需要第三方C运行库
+ 相比Cygwin，体积小，使用方便
+ Dev-C++使用的编译工具就是MinGW

MinGW项目还提供了MSYS工具，用于在windows上模拟linux shell环境。MSYS是“Minimal SYStem”的缩写，大意是最小的系统，是一个Bourne Shell命令行解释器，可以用来替换MS的cmd.exe，也是MinGW的补充。如果不喜欢用windows的cmd，可以使用MSYS代替。

在<http://www.mingw.org/wiki>可以找到下载地址

# MSYS和MinGW安装

## MSYS独立安装

+ 下载MSYS(在<http://www.mingw.org/wiki/MSYS>点击MSYS 1.0.11)
+ 安装MSYS
+ 找到msys启动文件(D:\msys\1.0\msys.bat)
+ 可以添加msys.bat的快捷方式到桌面

## MinGW 安装和配置

+ 下载mingw-get-setup.exe（[地址](http://sourceforge.net/projects/mingw/files/latest/download)）
+ 安装mingw-get（可以指定安装位置，例如D:\MinGW）
+ 运行mingw-get（与运行D:\MinGW\libexec\mingw-get\guimain.exe相同）
+ 选中要安装的包，右键可以指定安装或删除
    - 个人习惯安装mingw-developer-toolkit(会自动选中mingw32-base)
    - 可以选择安装msys（和独立安装msys结果一样，独立安装可以指定独立的安装位置）
+ 点击Installation菜单的Apply Changes安装或删除指定的包
+ 如果安装了msys
    - 找到msys/1.0/etc文件夹
    - 打开fstab文件（如果没有该文件，则新建一个）
    - 在文档尾部增加`D:\MinGW  /mingw`
    - 确保文档尾部有至少一个空行
    - 然后打开msys.bat,在bash模拟器中就可以使用mingw工具了
+ 如果没有安装msys
    - 在windows的path环境变量中加入`D:\MinGW\bin`
    - 在cmd中就可以用MinGW工具了