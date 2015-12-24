---
layout: post
title: Visual Studio工程选项Any CPU,x86,x64
category: 编程工具
group: IT
tags: [Visual Studio]
keywords: [Visual Studio, VS, 源代码结构]
description: Visual Studio工程设置及源代码结构管理

author: lileilei
revision:
    editor: lileilei
    date: 2014-09-27
---

Any CPU平台下：生成的程序是兼容的，也就是说编译生成的软件在32位操作系统下会以32位的软件模式运行，而在64位操作系统下则会以64位的软件模式运行。

x86平台下：强制生成的软件为32位软件，不管操作系统是32位还是64位都是以32位模式运行。

x64平台下：与x86类似，强制生成为64位软件，只能在64位模式运行。

 
关于以不同的模式运行，在有些情境中并不是只要软件能运行就行，还要考虑到与该软件交互的一些模块的运行模式。比如如果.NET程序以64位模式运行，但是该机器上的Oracle客户端是32位的话，连接数据库就会有异常。比如如果.NET程序以64位模式运行，但是该程序调用了32位动态链接库，调用就会出现异常。

所以以什么模式运行还是要考虑到具体情境的，所以Any CPU的平台并不是都适用，这也是x86和x64平台存在的意义。