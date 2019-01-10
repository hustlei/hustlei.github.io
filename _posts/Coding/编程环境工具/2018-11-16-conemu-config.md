---
layout: post
title: ConEmu设置
subtitle: 
category: 编程环境
group: Coding
tags: [conemu]
keywords: [conemu]
description: conemu

author: lileilei
revision:
    editor: lileilei
    date: 2018-11-10
---

+ 目录
{:toc}

ConEmu是一个非常好用的终端，支持标签切换功能，可以在conemu中同时打开cmd,powershell,msys2 bash,wsl等等。自定义选项多，非常好用。

以下为个人常用配置，可以按喜好修改。

## 设置默认启动的任务/shell

1. 打开Settings对话框
2. 选择General选项
3. 在Choose your startup task or even a shell with argumens后的下拉框中选择最常用的项。比如cmd或msys2等

## 设置颜色

1. 打开Settings对话框
2. 选择General选项
3. 在Choose color scheme后的下拉框中选择。
    + 我选择Tomorrow项
    
## 设置单实例模式

1. 打开Settings对话框
2. 选择General选项
3. 点击选中Single istance mode

这样就只能启动一个conemu了，conemu支持多标签，所以启动一个就ok了。

## 设置字体

1. 打开Settings对话框
2. 选择General>>Fonts选项
3. 在Main console font下选择Size为14
4. 取消Monospace选项

**中文字体重叠问题**

勾选Monospace选项在某些命令，比如git中会出现中文字体重叠。所以要取消Monospace选项


## 设置背景图片

1. 打开Settings对话框
2. 选择General>>Backgroudn选项
3. 选中background image
4. 点击path后的...按钮选择图片

设置后每个shell的背景都会变为图片。比较华丽，个人喜欢简洁，基本不设置这个。

## 标签栏改为下方显示

1. 打开Settings对话框
2. 选择General>>Tab bar选项
3. 选中Tabs on bottom

## 修改标签的标题

conemu的标签标题默认显示为“序号+控制台名称”，但是msys2在conemu中显示的是工作路径。怎么设置标签标题呢？

1. 打开Settings对话框
2. 选择General>>Tab bar选项
3. 在Console后的文本框内输入%加一个字母的格式文本，意义如下：
    - %s: 显示shell标题
    - %c: shell序号
    - %n: shell应用程序的名称，比如cmd.exe,bash.exe等等
    - %p: 显示PID
    - %d: 显示工作路径
    - %%: 百分号（转义）

也可以组合输入几个：比如默认的就是：<%c> %s。

建议使用%s，或者%n

## conemu打开多个标签时，在win7上任务栏只显示一个预览

1. 打开Settings对话框
2. 选择General>>Task bar选项
3. 在Task buttons组中选择Active console only(ConEmu window)

如果选择了Show all consoles。则在win7和win7以上版本的windows上，鼠标移动到任务栏conemu图标上会预览所有shell。任务栏上conemu标签也显示为重叠标签。个人不喜欢。

## 取消任务栏conemu图标上的shell图标

默认任务栏的conemu图标上会叠加显示一个小的shell图表，比如cmd图标，msys2的图标等。个人不喜欢，通常去掉。

1. 打开Settings对话框
2. 选择General>>Task bar选项
3. 在Task buttons组中取消选择Show overlay icon

## 为conemu配置Msys2

1. 打开Settings对话框
2. 选择Startup>>Tasks选项
3. 添加MSYS2 MinGW 64
    + 点击+号增加Task
    + 设置Task名字为:Msys2::MinGW64
    + Commands中添加脚本`set MSYSTEM=mingw64 & c:\msys64\usr\bin\bash --login -i`
4. 添加MSYS2 MSYS
    + 点击+号增加Task
    + 设置Task名字为:Msys2::Msys
    + Commands中添加脚本`set MSYSTEM=MSYS & c:\msys64\usr\bin\bash --login -i`
    
选中Default task for new console这会在每次点击新建标签时自动打开该任务。

个人就习惯把cmd作为conemu打开后的默认任务，而把Msys2 MinGW64作为新建标签的默认任务。

## 为cmd配置clink

clink基于GNU的readline库，使用clink能够为cmd命令行提供readline一样的功能。配置方法如下：

1. 打开Settings对话框
2. 选择Fetures选项
3. 点击Use Clink in prompt，会提示设置方法
4. 点击Use Clink in prompt后的...按钮，打开clink网站
    + 下载Clink portable包
    + 解压后，将Clink包中所有文件拷贝到C:\Program Files\ConEmu\ConEmu\clink目录下
5. 选中Use Clink in prompt选项

重新打开的cmd标签就都支持readline功能了

## 不显示状态栏

conemu的状态栏，感觉没啥用，我通常都不显示状态栏。方法如下：

1. 打开Settings对话框
2. 选择Fetures>>Status bar选项
3. 取消选择Show status bar选项

## emacs中C-V不能翻页的问题

conemu中Ctr+V默认为粘贴，所以会导致conemu中emacs C-V不能翻页。

如果用emacs多，建议设置如下：

1. 打开Settings对话框
2. 选择Keys & Macro>>Paste选项
3. Paste mode #1(Ctrl+V)下，勾选Do nothing

> 这样设置后整个conemu内如果用msys2等Ctrl+V都不能粘贴，但是可以用shift+Insert粘贴，cmd内不受影响。
> 所以，如果不用emacs的话，就不用这么设置了。

## 为conemu设置当前目录打开的右键菜单

1. 打开Settings对话框
2. 选择Intergration选项
3. 在command:{cmd} -cur_console:n中修改cmd为你喜欢的shell
3. 点击第一个Register就ok了
