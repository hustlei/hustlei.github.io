---
layout: post
title: linux shell(bash)快捷键
category: linux
group: IT
tags: [linux, shell]
keywords: [linux, shell]
description: linux shell 快捷键, linux, bash

author: lileilei
revision:
    editor: lileilei
    date: 2016-12-12
---

* 目录
{:toc}

Linux的缺省Shell是Bash，熟练运用下面的快捷键将对提高Bash的操作有很多好处。如果你用过Emacs的话，你会发现它们的很多操作都是相同的，因为Bash默认使用的是Emacs按键绑定，当然你也可以修改为其他的方式，比如vi绑定。本文总结了shell在Emacs按键绑定下的快捷键使用方式，也就是shell默认快捷键。入门用户可以参考本文，也可以把本文作为一个参考备忘文档。

> Bash 默认为 emacs 编辑模式。如果你的 Bash 不在 emacs 编辑模式，可通过`set -o emacs`设置。

# 控制命令

+ `Ctrl + l`：清屏（与clear命令效果相同）
+ `Ctrl + o`：执行当前命令，并选择上一条命令
+ `Ctrl + s`：阻止屏幕输出(当前正在执行的命令不在打印信息)
+ `Ctrl + q`：允许屏幕输出(使用Ctrl+s命令后，可以用Ctrl+q恢复)
+ `Ctrl + c`：终止当前正在执行的命令
+ `Ctrl + z`：挂起命令，把当前进程转到后台运行，使用`fg`命令恢复。
+ `Ctrl + d` : 退出当前 Shell

> `^S、^Q、^C、^Z` 是由终端设备处理的，可用 stty 命令设置。

# 编辑命令

## 光标移动

+ `Ctrl + a` ：移到命令行首
+ `Ctrl + e` ：移到命令行尾
+ `Ctrl + f` ：前移（向右移动）一个字符
+ `Ctrl + b` ：后退（向左移动）一个字符
+ `Alt + f` ：前移（向右移动）一个单词
+ `Alt + b` ：后退（向左移动）一个单词
+ `Ctrl + xx`：在命令行首和光标之间移动

# 文本修改

## 补全、删除、粘贴
+ `tab` : 自动补全命令
+ `Ctrl + u` ：从光标处删除至命令行首
+ `Ctrl + k` ：从光标处删除至命令行尾
+ `Ctrl + w` ：从光标处删除至字首
+ `Alt + d` ：从光标处删除至字尾
+ `Ctrl + d` ：删除光标处（或光标后）的字符（如果光标前后都没有字符，即命令行为空的时候，则会退出shell）
+ `Ctrl + h` ：删除光标前的字符(与backspace键相同)
+ `Alt + Backspace`：与 Ctrl + w 类似，分隔符有些差别
+ `Ctrl + y` ：粘贴至光标后

## 改变大小写
+ `Alt + c` ：从光标处更改为首字母大写的单词
+ `Alt + u` ：从光标处更改为全部大写的单词
+ `Alt + l` ：从光标处更改为全部小写的单词

## 交换字符、单词位置
+ `Ctrl + t` ：交换光标处和之前的字符（ESC+t相同）
+ `Alt + t` ：交换光标处和之前的单词

# 重新执行命令

+ `Ctrl + p`：历史中的上一条命令
+ `Ctrl + n`：历史中的下一条命令
+ `Alt + .`：使用上一条命令的最后一个参数（会直接在当前光标位置显示）
+ `Ctrl + r`：搜索之前使用过的命令
+ `Ctrl + g`：从历史搜索模式退出

# Bang (!) 命令

Bang命令算不上快捷键键，但是使用可以快捷的进行一些操作，比如重新执行之前命令、修改上一条命令并执行等等。

+ `!!`：执行上一条命令
+ `!cc`：执行最近的以cc开头的命令，如`!l`会执行ls命令
+ `!$`：打印上一条命令的最后一个参数，并回车执行。与`Alt + .`相似，但是会自动执行
+ `!*`：上一条命令的所有参数
+ `!cc:p`：仅打印以!cc的输出，但不执行，如`!l:p`会显示ls
+ `!$:p`：打印输出!$的输出
+ `!*:p`：打印输出!*的输出
+ `^blah`：删除上一条命令中第一个blah，然后执行
+ `^blah^foo`：将上一条命令中的 blah 替换为 foo，然后执行
+ `^blah^foo^`：将上一条命令中所有的 blah 都替换为 foo，然后执行

# 参考文档

+ [linux shell 快捷键. ](http://blog.chinaunix.net/uid-361890-id-342066.html)
