---
layout: post
title: c让人抓狂的特性
category: C
group: Coding
tags: [c语言]
keywords: [c语言]
description: c语言，糟糕特性

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

# c语言让人抓狂的特性

## 数组作为函数参数

当C语言函数参数为数组时，在函数内数组将变为指针，如果数组不是字符串的话，将完全没有办法知道该数组的长度。唯一的办法是增加一个参数传递数组长度。

假如有一个函数声明如下

`double area(double x[], double y[])`

则在函数内x, y将变为指针，用`sizeof(x)/sizeof(x[0])`得到的结果为1，完全没有办法知道数组的长度。(因为sizeof(x)的长度是指double指针的长度)

解决方法：可以将数组长度传递到函数，例如用如下方式声明：

~~~ c
double area(double x[], int m, double y[], int n);
//m, n分别表示x, y数组的长度；
~~~
