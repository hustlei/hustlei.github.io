---
layout: post
title: cmd命令行增强工具clink
subtitle: 让windows下cmd命令行拥有行编辑(readline)能力
category: 编程环境
group: Coding
tags: [命令行]
keywords: [cmd, 命令行, readline, 行编辑, clink]
description: 让widows下cmd命令行拥有像linux下bash一样具有行编辑能力,能够使用ctrl+n，Ctrl+p上下翻等等

author: lileilei
revision:
    editor: lileilei
    date: 2018-12-12
---

+ 目录
{:toc}


linux下shell终端里有行编辑功能，在命令提示符下默认可以像emacs一样编辑输入的命令。比如：

+ Ctrl+p：显示上一条命令
+ Ctrl+n：显示下一条命令
+ Ctrl+a：移动光标到行首
+ Ctrl+e：移动光标到行尾
+ Ctrl+b：光标后退一个字符
+ Ctrl+f：光标前进一个字符
+ Ctrl+d：删除一个字
+ Ctrl+y：粘贴
+ 等等。

并且shell也可以把行编辑快捷键修改为vim的方式。非常方便。

而windows上的cmd上，只能使用箭头移动光标，每次都需要手离开大键盘区，复制粘贴选择也非常不方便。所以一直想找个windows上的能够支持行编辑功能的终端控制台。

此外，了解了一下powershell后，发现虽然功能强大，但是一堆像函数一样的都还有一个"-"的命令，不好看不好记。有学习powershell的时间，还不如直接用c#或者python。并且powershell有些命令还不如cmd好用，比如doskey，所以我基本放弃使用powershell了。平常使用msys2 shell，需要的时候，也使用一下cmd。

网上说powershell功能更强大，也可以设置行编辑功能，我也试了一下。但是发现需要设置权限，升级powershell到3.0以上版本，安装.net 4.5等等庞大的东西。在win7上非常不方便，并且powershell更像一个编程语言，命令都是get-xx，set-xx形式，不喜欢，果断放弃。

偶尔的机会发现了一个cmd神器：clink。clink可以让cmd控制台有shell一样的行编辑功能。

## clink安装

下载地址：<http://mridgers.github.io/clink/>

直接下载安装就ok。安装后打开cmd就会发现，cmd支持行编辑功能了。

## clink增强的cmd控制台的功能

安装好clink后，打开cmd控制台，就可以使用如下功能了：

### 和Bash一样的行编辑功能

> clink基于GNU的readline库，所以功能也和readline一样

可以使用的快捷键简单列举如下（仅列举部分常用的，不太全）

+ Tab: 命令补全
+ 编辑
    - Ctrl+@: set-mark，开始选择
    - Ctrl+b: 光标后移一个字符
    - Ctrl+f: 
    - Ctrl+a: 移动光标到行首
    - 

## 参考文档

[clink: 加强windows下的cmd](http://ju.outofmemory.cn/entry/20100)
[Clink: Powerful Bash-style command line editing](http://www.mamicode.com/info-detail-256230.html)




