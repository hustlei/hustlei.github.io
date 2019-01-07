---
layout: post
title: C# 调用python脚本
category: 编程语言
group: Coding
tags: [混合编程]
keywords: [C#, python]
description: C#调用python脚本

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# C#调用Python脚本步骤

## 安装IronPython

+ 到http://ironpython.codeplex.com/下载IronPython。
+ 安装IroPython。也可以不安装，下载“Binaries”版本，仅将IronPython.dll, Microsoft.Scripting.dll, Microsoft.Dynamic.dll拷贝到目标目录就可以了。

## 创建项目

+ 创建一个C#的控制台应用程序。
+ 添加引用： 浏览到IronPython的安装目录中，添加对IronPython.dll，Microsoft.Scripting.dll 两个dll的引用。

## 添加Python文件到当前的项目中

+ 创建一个文本文件命名为：hello.py, 编辑如下

~~~ python
def welcome(name):
    return "hello " + name
~~~

+ 把该文件添加的当前的项目中。
+ 设置"复制到输出目录"为始终复制，避免运行时找不到文件。

## C#中调用python脚本文件

* 引用命名空间

~~~ csharp
using IronPython.Hosting;
using Microsoft.Scriptin.Hosting;
~~~

* 调用代码

~~~ csharp
ScriptRuntime pyRuntime=Python.CreateRuntime();
dynamic pyobj=pyRuntime.UseFile("hello.py");
//使用.net4.0的语法创建了一个动态对象，然后用动态对象调用方法。
Console.WriteLine(pyobj.welcome("Nick"));
~~~

* 复杂参数传递

在C#调用python时可以直接传递数组或对象，如:

~~~ csharp
ScriptRuntime pyRuntime=Python.CreateRuntime();
dynamic pyobj=pyRuntime.UseFile("hello.py");
double[] x={1, 2, 3};
Console.WriteLine(pyobj.welcome(x));
~~~

~~~ python
def welcom(x)
	return "the 2th value of x is: "+'%f'%x[1]
~~~