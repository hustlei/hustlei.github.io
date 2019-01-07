---
layout: post
title: C#、托管C++(C++/CLI)相互调用
category: C++
group: Coding
tags: [c语言]
keywords: [C++/CLI, C++.NET, 托管C++，C#调用]
description: C++/CLI, C++.NET, 托管C++，C#调用，NativeC++

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-05
---

* 目录
{:toc}

C++/CLI（Common Language Infrastructure，通用语言框架）可以简单的认为就是.NET运行的托管C++。

# C++/CLI(托管C++)与native C++类

C++/CLI声明的类必须是ref类，即声明方式只能是：

~~~ cpp
ref class classname{};

ref struct name{};
~~~

C++中ref类也只能是托管类。这是最明显的托管C++类和非托管C++类的区别。

# C#调用C++/CLI类

C#可以调用Native C++类，也可以调用C++/CLI类，但是区别非常大。

C#调用C++/CLI类注意事项

+ C#可以直接调用ref类，和.net类库内其他类一样
    - ref类的变量(字段)不能使Native C++类类型，可以是指向Native C++类类型对象的指针
    - ref类内部可以直接使用Native C++类类型，只需要导入相关头文件即可
+ ref类的函数（方法）参数可以直接使用Native C++类类型，但是C#无法理解这些参数
    - 也就是说，public函数不要用Native C++类类型作为参数类型

C#可以调用Native C++类类型，无论使用Pinvoke还是其他方法，Native类类型作为参数都很难处理。当然也有处理的方法（目前我只知道C#调用Native C++ struct类型的方法）

# C++/CLI调用C#

在C++/CLI文件内引用C#类库文件和命名空间即可，例如：

~~~ cpp
#using "..\..\win32\LMath.dll"
using namespace My::LMath;
~~~