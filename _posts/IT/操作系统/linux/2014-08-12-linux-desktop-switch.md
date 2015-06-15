---
layout: post
title: linux桌面切换
category: 操作系统
group: IT
tags: [linux]
keywords: [linux, 虚拟终端]
description: linux桌面切换，linux虚拟终端

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# 虚拟终端简介

终端，可以对系统进行控制，所以又称为控制台，一台计算机的输入/输出设备就是一个物理的控制台。如果在一台计算机上用软件的方法实现了多个互不干扰、独立工作的控制台界面，就是实现了多个虚拟控制台。

虚拟终端是在个人电脑上虚拟的一个终端。虚拟终端的目的是达到个人电脑及其用户能够与大型计算机的连接。

现代的大型计算机也内部使用虚拟终端。比如Linux以及其它大多数基于个人电脑的类似Unix的操作系统假装有六至十个这样的“虚拟”的终端。

通常情况下，Linux默认启动6个虚拟终端。如果启动方式选择直接启动X Window，那么X Window在第7个虚拟终端上。

虚拟控制台的选择可以通过按下Alt+Fn(n=1~6)组合键来访问6个虚拟控制台（也可以用Ctrl+Alt+Fn）。例如，用户登录后，按Alt+F2组合键，用户又可以看到“Login:”提示符，此时看到的是第二个虚拟控制台。如果此时再按Alt+F1组合键，就可以回到第一个虚拟控制台。

> 用tty命令可以查看当前终端(控制台)

虚拟控制台使得Linux成为一个真正的多用户操作系统。在不同的控制台上，可以同时接受多个用户登录，也允许一个用户进行多次登录。用户可以在某一个虚拟控制台上的工作尚未结束时，切换到另一虚拟控制台开始另一项工作。例如，开发软件时，可以在一个控制台上进行编辑，在另一个控制台上进行编译，在第三个控制台上查阅信息。

在X Window图形操作界面中按Alt+Ctrl+Fn组合键(n=1~6)就可以进入控制台字符操作界面(Alt+Fn不行)。这就意味着用户可以同时拥有X Window以及6个控制台操作界面，在控制台操作界面中按Alt+Ctrl+F7（或者Alt+F7）组合键即可回到刚才的X Window图形操作界面。也就是说，用Alt+Ctrl+Fn组合键即可实现字符界面与X Window界面的快速切换。

总结如下：

linux 7个终端之间可以用`Ctrl+Alt+Fn`或`Alt+Fn`(n=1~7)相互切换，但从第7个终端(图形界面)切换到其他终端必须用`Ctrl+Alt+Fn`(n=1~6)形式。

# linux从图形界面进入文本界面

linux默认进入x window界面，如果想用纯文本界面可以用`Ctrl+Alt+Fn`(n=1~6)切换到文本界面，但是图形界面依然在运行通过`Alt+F7`或`Ctrl+Alt+F7`就可以重新切换到图形界面。

# linux默认进入文本界面

网上有很多方法，在ubuntu 10.10以后版本上个人推荐用如下方法：

1. sudo gedit /etc/default/grub  (gedit可以用vi等代替)
2. 找到 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
3. 改为 GRUB_CMDLINE_LINUX_DEFAULT="quiet splash text"
4. 运行 `sudo update-grub` 或者`sudo update-grub2`

# linux从文本界面进入图形界面

一般来说使用`startx`命令就可以启动，但是我个人用的是xubuntu(ubuntu的一个版本）这个命令不行，可以采用一下方法

+ `sudo service lightdm start` 启动图形界面，并直接切换到图形界面(第7终端)
+ `sudo lightdm`或`sudo lightdm&` 启动图形界面，但需要用户切换到图形界面，并且在登录后会自动切换回文本界面，用户需要再一次切换到图形界面。