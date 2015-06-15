---
layout: post
title: C# .net 调用非托管代码
category: 编程语言
group: IT
tags: [.net]
keywords: [C#非托管代码]
description: C#非托管代码调用

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

# C# .net dll简介

MarshalAsAttribute 类
指示如何在托管代码和非托管代码之间封送数据。可将该属性应用于参数、字段或返回值。
该属性为可选属性，因为每个数据类型都有默认的封送处理行为。
大多数情况下，该属性只是使用 UnmanagedType 枚举标识非托管数据的格式。
例如，默认情况下，公共语言运行库将字符串参数作为 BStr 封送到 COM 方法，但是可以通过制定MarshalAs属性，将字符串作为 LPStr、LPWStr、LPTStr 或 BStr 封送到非托管代码。某些 UnmanagedType 枚举成员需要附加信息。



*用来表示非托管指针，用new创建
^用来表示托管指针，用gcnew创建
所以两者用玩后要用delete清除，要不然是有内存泄露的。