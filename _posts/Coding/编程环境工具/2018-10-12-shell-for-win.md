---
layout: post
title: windows上模拟linux环境及虚拟终端工具
category: 编程环境
group: Coding
tags: [shell]
keywords: [shell,msys2,cmder]
description: windows上模拟linux环境中，可以运行大多数shell命令，可以运行基本的shell脚本。

author: lileilei
revision:
    editor: lileilei
    date: 2018-11-10
---

+ 目录
{:toc}

一直想在windows上使用shell，以及一些工具。在2018年以前使用各种模拟工具都很不理想。2018年后突然发现msys2,Babun,WSL都非常强大了。并且一些控制台程序也集成了git等工具。

## windows上的虚拟终端工具

+ ConEmu：支持多标签，支持多种shell环境: cmd,powershell,Msys2,Cygwin,WSL等等。
+ Cmder: 定制了ConEmu，不会设置的话，Cmder比原版Conemu好用，自带git。
+ xshell: 用的人也挺多
+ SecureCRT: 不了解

## windows上模拟linux环境

+ Cygwin：一个在windows平台上运行的类UNIX模拟环境，是一款自由软件，但是毕竟庞大，运行比较慢。
+ Msys2：集成了pacman和Mingw-w64的Cygwin升级版。易用性非常高。
+ Babun：一个 Windows 上的开箱即用的壳程序，基于 Cygwin，胜于 Cygwin。
+ WSL(windows subsystem linux)：win10里边自带的ubuntu子操作系统。

建议用MSYS2或Bambun。


