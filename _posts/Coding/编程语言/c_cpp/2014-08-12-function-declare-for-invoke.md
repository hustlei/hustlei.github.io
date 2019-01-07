---
layout: post
title: 函数调用方式
category: C
group: Coding
tags: [c语言]
keywords: [__stdcall, __cdecl]
description: 函数调用方式，__stdcall, __cdecl

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---


函数的两种调用方式：

1. __stdcall
    + __stdcall是Pascal程序的缺省调用方式，因此，stdcall调用约定又称为passcal调用约定
    + 声明的语法为:`int __stdcall function(int a, int b)`
    + 参数从右向左压入堆栈。
    + 函数自身修改堆栈。
    + win32通常用该调用方式，WINAPI实际上就是__stdcall
    + 在C#中，函数只支持__stdcall的调用方式
    + VC将函数编译后会在函数名前面加上下划线前缀，在函数名后加上"@"和参数的字节数。`int f(void *p)`编译后名称为`_f@4`(在外部汇编语言里可以用这个名字引用这个函数)
2. __cdecl
    + C调用约定（即用__cdecl关键字说明）
    + 定义语法是：int __cdecl function(int a,int b)
    + 按从右至左的顺序压参数入栈
    + 函数本身不清理堆栈，由调用者把参数弹出栈。每一个调用它的函数都包含清空堆栈的代码，所以产生的可执行文件大小会比调用_stdcall函数的大。
    + 对于传送参数的内存栈是由调用者来维护的，因此，可以实现可变参数的函数(如printf只能使用该调用约定）。
    + __cdecl是C和C++程序的缺省调用方式。
    + VC将函数编译后会在函数名前面加上下划线前缀。
