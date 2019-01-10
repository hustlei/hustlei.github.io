---
loyout: post
title: 为什么不用powershell
subtitle: 
category: 编程环境
group: Coding
tags: [命令行, 脚本]
keywords: [命令行, 脚本, powershell]
description: 为什么不用powershell

author: lileilei
revision:
    editor: lileilei
    date: 2018-12-11
---

+ 目录
{:toc}

本来对powershell无感，但是看到powershell作为windows的下一代脚本，不仅接替cmd，部分命令兼容bash，并且还能够在linux下运行，功能超过shell，非常强大，憧憬着比cmd更好的体验，windows下用shell各种不便，顺便了解了一下。

## powershell的特点

+ powershell兼容部分shell命令名
    - 比如ls等，但是只是dir等命令的别名，参数也不太一样。
+ powershell兼容部分cmd命令
    - dir等命令可以直接用
    - doskey等命令需要这样用`doskey /exename=powershell.exe ls=dir`真心不方便
    - title命令不能用需要$host.ui.RawUI.WindowTitle=xx,不方便
    - cmd设置环境变量用set path=xx%path%就ok了，但是powershell需要$env:path="xxx;"+$env:path
+ powershell基于.net framework，面向对象，可以调用.net的一些库，功能强大。
    - 确实功能强大，但是大多数命令都变成了get-xxmethod，set-xxmethod这样的
    - powershell更像是一个编程语言，作为脚本很强大，在控制台中用很不方便
+ powershell控制台支持扩展，有很多线程的扩展可以安装，比如行编辑功能
    - 确实有这些功能，但是win7等没有安装.net framework4.5,很多安装不了，必须折腾一下，升级powershell和.net framework
    
## powershell命令本身特殊的地方

### ps1脚本执行有不关闭控制台的方法

bat执行后控制台不关闭很简单，直接在bat文件最后添加cmd就ok了。powershell脚本末尾添加powershell命令不管用。当然bat末尾添加powershell命令，脚本执行完后也一样会关闭。

怎样才能让脚本执行完后打开powershell控制台不关闭呢？需要在脚本末尾添加如下命令：

```powershell
PowerShell -NoExit
```

### powershell设置环境变量

可以使用如下代码：

`$env:path= "C:\Program Files\Notepad++;"+$env:path`

也可以使用

`$env:path+= ";C:\Program Files\Notepad++"`

### powershell设置控制台标题

`$host.ui.RawUI.WindowTitle="new title"`

`$host.ui.RawUI.WindowTitle=$host.ui.RawUI.WindowTitle+"title"`

与`$host.ui.RawUI.WindowTitle+="title"`相同

### 命令别名加入参数

在cmd中使用

```bat
doskey cargo1=cargo $* --target i686-pc-windows-msvc
```

后执行cargo1 xxx，实际上会执行cargo xxx --target i686-pc-windows-msvc

在powershell中实现该功能需要定义function。具体如下：

```
function cargofun { cargo $args --target i686-pc-windows-msvc};
Set-Alias cargo1 cargofun
```


### 打开powershell并执行语句

在ps1脚本中，尾部添加如下语句，可以在脚本执行完后打开powershell控制台，并执行function和set-alias命令。

```
PowerShell -NoExit -Command {
    $Host.UI.RawUI.WindowTitle += ' - rust4win7up'; 
    Write-host 'PS: Ready for copile rust progam running on win7,8,10!' }
```

在bat中可以用如下命令

```
powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle += ' - rust4win7up'; Write-host 'PS: Ready for copile rust progam running on win7,8,10!'"
```

注意在ps1中可以把命令代码放在大括号{}中，代码可以换行。在bat中，只能把代码放在引号内，并且不能换行。

## 不用powershell的理由

+ 本人用win7，不想安装.net 4.5等等庞大的东西
+ 不喜欢get-xx,set-xx这些语法
+ powershell alias还没有doskey好用
+ powershell更改title，更改环境变量不方便等等
+ 本人更多的是在控制台上使用命令，可以说cmd比powershell更方便
+ 安装clink等小工具能让cmd也支持行编辑功能
+ 使用cmder可以使cmd控制台更强大
+ 2018年后msys2可以比较完整的支持shell，gcc，emacs，vim，甚至可以安装qt,gtk,python

所以，小的批处理用bat(cmd+clink)。控制台用msys2，果断放弃powershell。








