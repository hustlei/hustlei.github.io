---
layout: post
title: gdb调试c语言简介
category: 编程工具
group: Coding
tags: []
keywords: [gdb]
description: gdb调试c语言

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# 简单步骤

+ 编译程序(带调试信息)`gcc -g file.c -o test.exe`
+ 启动gdb`gdb test(程序名)`
+ 列出代码`(gdb) l`
+ 设置断点`(gdb) break n(行号)`
+ 运行/单步运行`(gdb)r/ (gdb)n/ (gdb)s`
+ 打印变量`(gdb) p i(变量名)`

# 调试简介

1. 编译程序(加入调试信息）

    `gcc -g test.c -o test`

2. 启动gdb

    `gdb test`

3. (gdb)环境操作
    * 基本操作
        + `(gdb) l` 列出原代码
        + `(gdb) r` 运行(run命令)
        + `(gdb) n` 运行下一句
        + `(gdb) next n` 运行n行代码（不会进入函数内部）
        + `(gdb) s` 进入下一行代码执行（会进入函数内部）
        + `(gdb) step n` 执行n行代码
        + `(gdb) until n` 运行到第n行或，到函数
        + `(gdb) until n ifcondition` 
        + `(gdb) finish` 继续执行到函数结束
        + `(gdb) c` 继续运行(continue命令)
        + `(gdb) kill` 停止执行
        + `(gdb) q` 退出调试(quit命令)
    * 断点操作
        + `(gdb) break n` 在第8行设置断点
        + `(gdb) clear` 清除断点
        + `(gdb) clear func` 清除函数func处的断点
        + `(gdb) clear nth` 清除第nth行处断点
        + `(gdb) d` 删除所有的断点或观察点(delete命令）
        + `(gdb) delete n` 删除第n个断点，观察点
        + `(gdb) delete range` 删除指定的断点，观察点
        + `(gdb) disable n/range` 禁用指定断点，观察点
        + `(gdb) enable n/range` 启用指定断点，观察点
        + `(gdb) enable once n` 断点一次有效，经过后设置为无效
        + `(gdb) enable del n` 断点一次有效，经过后删除
    * 打印变量
        + `(gdb) p i` 打印变量i的值    


# 参考文件

[GDB调试手册](http://www.programlife.net/gdb-manual.html)


