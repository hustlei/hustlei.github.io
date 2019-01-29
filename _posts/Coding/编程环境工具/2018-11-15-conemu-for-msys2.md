---
layout: post
title: ConEmu配置msys2
subtitle: 为msys2更换conemu终端
category: 编程环境
group: Coding
tags: [msys2, conemu]
keywords: [msys2, conemu]
description: conemu手动添加msys2 task

author: lileilei
revision:
    editor: lileilei
    date: 2018-11-10
---

+ 目录
{:toc}

ConEmu是一个非常好用的终端，支持标签切换功能，可以在conemu中同时打开cmd,powershell,msys2 bash等等。自定义选项多，非常好用。

conemu默认只有一个msys2任务，但是msys2有msys、mingw32、mingw64三个启动方式。怎么分别配置呢？

# MSYS2三种启动方式的区别
MSYS2启动方式里有三种方式，三种方式的区别仅在于PATH路径的不同：

+ MSYS2 MSYS：PATH包括opt/bin，不包括mingw64/bin和mingw32/bin
+ MSYS2 MinGW 64bit：PATH包括mingw64/bin, 不包括ming32/bin和opt/bin
+ MSYS2 MINGW 32bit：PATH包括mingw32/bin,不包括mingw64/bin和opt/bin

这三个路径用于安装应用程序或命令，比如mingw64就用于安装64位的mingw gcc等。

三种启动方式都是通过调用msys2_shell.cmd，不同仅在于设置了变量 set MSYSTEM=xx

+ MSYS2 MSYS：`set MSYSTEM=MSYS`
+ MSYS2 MinGW 32bit：`set MSYSTEM=MINGW32`
+ MSYS2 MinGW 64bit：`set MSYSTEM=MINGW64`

通过msys2_shell.cmd启动时，都默认使用mintty虚拟终端。msys2_shell.cmd启动msys2时相当于运行了如下命令：

~~~bat
rem 启动MSYS2 MSYS2
set MSYSTEM=MSYS
"c:\msys64\usr\bin\mintty" "c:\msys64\usr\bin\bash" --login
~~~

~~~bat
rem 启动MSYS2 MINGW32
set MSYSTEM=MINGW32
"c:\msys64\usr\bin\mintty" "c:\msys64\usr\bin\bash" --login
~~~

~~~bat
rem 启动MSYS2 MINGW64
set MSYSTEM=MINGW64
"c:\msys64\usr\bin\mintty" "c:\msys64\usr\bin\bash" --login
~~~

> 上述命令中c:\msys64为msys2安装目录
>
> bash为默认shell，可以用zsh,csh等替换

自己运行Msys2时可以不使用mintty虚拟终端。直接运行如下命令就OK：

~~~bat
rem 启动MSYS2 MSYS2
set MSYSTEM=MSYS
"c:\msys64\usr\bin\mintty" "c:\msys64\usr\bin\bash" --login
~~~

~~~bat
rem 启动MSYS2 MINGW32
set MSYSTEM=MINGW32
"c:\msys64\usr\bin\bash" --login
~~~

~~~bat
rem 启动MSYS2 MINGW64
set MSYSTEM=MINGW64
"c:\msys64\usr\bin\bash" --login
~~~

# 在conemu中配置MSYS2

## conemu中MSYS2的问题

虽然conemu中可以自动生成MSYS2的TASK，但是没法区分MSYS,MINGW32,MING64三种情况。

所以建议在conemu中手动配置msys2。

## conemu中设置MSYS2

以MSYS2 MingGW64为例：

1. 打开conemu的settings对话框
2. 选择Startup>>Tasks选项
3. 点击+号，新建一个Task
4. 修改Task名字为Msys2::MingGW64
5. 在commands下文本框内输入如下代码：

~~~bat
set MSYS2_PATH_TYPE=inherit & set MSYSTEM=mingw64 & set "D=C:\msys64" & %D%\usr\bin\bash.exe --login -i -new_console:C:"%D%\msys2.ico"
~~~

MSYS2_PATH_TYPE=inherit表示合并windows系统的path变量。

> 如果安装了zsh并想默认使用zsh可以，把代码里的bash改为zsh
>
> 打开后会自动把工作目录设置为msys64/home/%user%下
>
> **注意修改D变量值到msys2的安装目录**

也可以修改conemu自动生成的msys2 task，方法如下：

打开settings对话框，选择Startup>>Tasks选项。选择Bash::Msys2-64节点，可以看到默认定义如下：

~~~bat
set CHERE_INVOKING=1 & set "PATH=%ConEmuDrive%\msys64\usr\bin;%PATH%" & %ConEmuBaseDirShort%\conemu-msys2-64.exe -new_console:p %ConEmuDrive%\msys64\usr\bin\bash.exe --login -i -new_console:C:"%ConEmuDrive%\msys64\msys2.ico"
~~~

首先需要删除set CHERE_INVOKING=1，否则打开后工作路径会自动设置为C:\users\administrator。

添加set MSYS2_PATH_TYPE=inherit合并windows path环境变量，设置了之后可以调用notepad之类的命令，否则不行。

添加set MSYSTEM选择启动模式。

最终如下：

~~~bat
set MSYS2_PATH_TYPE=inherit & set MSYSTEM=mingw64 & set "PATH=%ConEmuDrive%\msys64\usr\bin;%PATH%" & %ConEmuBaseDirShort%\conemu-msys2-64.exe -new_console:p %ConEmuDrive%\msys64\usr\bin\bash.exe --login -i -new_console:C:"%ConEmuDrive%\msys64\msys2.ico"
~~~

不建议用这种方式，关闭比较慢。

## conemu中backspace删除汉字问题

如果在msys2中用pacman -S conemu安装conemu。在conemu中启动MSYS2后，会出现按一次backspace删除两个汉字，光标显示在中文文字上等问题。

不论怎么设置都改变不了这个问题，只能到官网重新下载conemu最新版安装。或者使用cmder自带的conemu。

ConEmu官网下载地址<https://conemu.github.io/>

## conemu中配置gcc链接库路径问题

在pacman中安装了SDL等库，但是gcc链接的时候就是提示找不到sdl。

解决方法：在Startup>Envirenment对话框中配置

~~~
set LIBRARY_PATH=C:\msys64\mingw64\lib
~~~

