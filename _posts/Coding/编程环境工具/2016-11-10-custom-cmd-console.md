---
layout: post
title: 自定义cmd控制台窗口
subtitle: 使用bat脚本配置cmd控制台颜色及大小
category: [cmd]
group: Coding
tags: [bat, cmd]
keywords: [bat, cmd]
description: bat cmd

author: lileilei
revision:
    editor: lileilei
    date: 2016-11-10
---

通过批处理，可修改cmd窗口标题、大小、字体及背景颜色等，下面逐一为你介绍。
下面的方法，可在cmd窗口中直接输入代码命令，也可以将代码命令写入bat文件中使用。


~~~bat
::改变窗口大小
mode con cols=80 lines=80

::设置cmd窗口的标题
title="窗口标题"

::改变字体及背景颜色
color    [fb]
::例如：color    0a     
~~~

color 命令说明：

+ F:前景颜色，即字体颜色
+ B:背景颜色，即CMD窗口的背景颜色

用一个十六进制数字指定颜色，可以为以下任何值之一:

<pre>
     0 = 黑色                     8 = 灰色
     1 = 蓝色                     9 = 淡蓝色
     2 = 绿色                     A = 淡绿色
     3 = 湖蓝色                   B = 淡浅绿色
     4 = 红色                     C = 淡红色
     5 = 紫色                     D = 淡紫色
     6 = 黄色                     E = 淡黄色
     7 = 白色                     F = 亮白色
</pre>


如果没有给定任何参数，该命令会将颜色还原到 CMD.EXE 启动时
的颜色。这个值来自当前控制台窗口、/T 开关或DefaultColor 注册表值。

如果用相同的前景和背景颜色来执行 COLOR 命令，COLOR 命令会将 ERRORLEVEL 设置为 1。

例如: "color 0F " 在 背景色为 黑色上 设置字体颜色为 亮白色
