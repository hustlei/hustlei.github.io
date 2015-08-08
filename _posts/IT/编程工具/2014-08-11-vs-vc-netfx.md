---
layout: post
title: vs2010,vs2013,vc2010,vc2013,.netframework2.0,.netframework4.0
category: 编程工具
group: IT
tags: [Visual Studio, Visual C++, .NET Framework]
keywords: [Visual Studio 2008,Visual Studio 2010,Visual Studio 2012,Visual Studio 2013, Visual C++ 2010, Visual C++ 2013, .net framework 2.0, .net framework 4.0]
description: Visual Studio工程设置及源代码结构管理

author: lileilei
revision:
    editor: lileilei
    date: 2014-09-27
---

微软的产品，无论是visual studio，visual C++ redist还是.net framework, 甚至windows都不停的更新，但是很多并不能做到向前兼容，使用的时候很容易出错。比如：

+ vc2013编译的程序无法在xp上运行
+ .net framework 2.0程序无法在.net framework 4.0上运行
+ vc2013 dist无法运行vc2010编译的程序，vc2010无法运行vc2008编译的程序
+ vs2013无法在xp上安装

作为一个喜欢新版本的人，总是喜欢用最新的软件，但是却常常弄出无法运行的程序，怎么都找不到解决方法，事实上，了解一下各个版本之间的差异，这些问题都可以避免。

# vs各个版本差异

+ vs 2008帮助文件十分好用
+ vs 2010编译的程序在xp上运行很好
+ vs 2013程序不能执行在xp上运行，但支持metro程序

# vc20xx编译程序如何运行

需要安装对应版本的vc redist运行库，也可以静态链接运行库

# vc2012、vc2013编译程序如何在xp上运行

详见本文链接

不同的工具集需要安装不同版本的vc redist运行库。

# .net framework2.0, .net framework4.0 差异

.net 运行时(clr)有四个版本clr1.0(建议抛弃)，clr1.1，clr2.0，clr4.0

clr4.0本质上和clr2.0很多功能是兼容的，但微软强力推荐clr4.0，导致很多程序无法运行，当然还是建议.net framwork4.0的程序在clr4.0上运行。

# 各个windows兼容性

不同windows的kernel32.dll等库上函数也不相同，win7上编译的程序在xp上就可能出现无法找到入口函数。

# 相关链接

+ [使 VC2013 编写的程序运行在其它电脑上](http://www.easyx.cn/skills/View.aspx?id=165)[](http://blog.sina.com.cn/s/blog_8bedb8210102v9cn.html)
+ [如何使用VS 2013发布一个可以在Windows XP中独立运行的可执行文件](http://www.zhihu.com/question/25415940/answer/30803949)
+ [让用VS2012/VS2013编写的程序在XP中顺利运行](http://blog.csdn.net/asanscape/article/details/38752655)
+ [.NET 4.0 无法直接运行 .NET 2.0 程序的问题](http://www.cnblogs.com/hongcing/archive/2010/02/10/1666880.html).
+ [.NET Framework 各个版本的关系？如何安装2.0,3.0,4.0？向下兼容？](http://blog.csdn.net/dijkstar/article/details/30971523)