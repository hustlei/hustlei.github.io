---
layout: post
title: C++/CLI数组
category: C++
group: IT
tags: [c++]
keywords: [C++/CLI, 托管C++，数组, array]
description: C++/CLI, 托管C++，数组, array

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-10
---

* 目录
{:toc}

C++/CLI（Common Language Infrastructure，通用语言框架）可以简单的认为就是.NET运行的托管C++。

# C++/CLI 数组

+ C++/CLI数组只能用array<>声明
+ C++/CLI数组只能是句柄类型

声明方式如下：

~~~ cpp
//存储值类型数据的数组
array<double>^ p；
//存储句柄类型(类只能是句柄)数据的数组
array<Point^>^ p1；
//n维数组,例如3维
array<int,3>^ p2;
//一维数组初始化
p = gcnew array<double>(10);
//多维数组初始化
p2 = gcnew array<int,3>(10,5,6);
//数组调用
p[0] = p2[0,1,2];
~~~

> C++/CLI引用类型声明时必须声明为跟踪句柄类型，并用gcnew初始化`Point^ p = gcnew Point();`
> 
> > 结构可以是句柄类型也可以是值类型