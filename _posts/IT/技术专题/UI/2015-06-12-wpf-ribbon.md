---
layout: post
title: WPF Ribbon免费控件库
category: UI
group: IT
tags: [WPF]
keywords: [WPF, Ribbon]
description:  Microsft Ribbon for WPF，Fluent Ribbon，Fluent Ribbon Control Suite，WPF Ribbon Control

author: lileilei
revision:
    editor: lileilei
    date: 2014-06-12
---

* 目录
{:toc}

# WPF Ribbon简介

在进行Ribbon开发前，如果不熟悉可以自行了解一下Ribbon 的[基本概念和参考模式](https://msdn.microsoft.com/en-us/library/dn742393.aspx)

![Ribbon](https://i-msdn.sec.s-msft.com/dynimg/IC725016.png)

目前，有3个免费且与microsft官方有紧密关系的Ribbon控件库：

+ WPF Ribbon Control
    - microsof最早发布的ribbon控件
    - Office 2007界面
    - 需要获得授权（不收费）才可以下载
    - 停止更新
    - 个人感觉还不错
+ Microsoft Ribbon for WPF
    - 微软在WPF Ribbon Control之后发布的
    - 免费Ribbon控件
    - 2010年为最后版，不再更新
    - 个人感觉界面有点丑，好像不清晰
+ Fluent Ribbon
    - 开源的Ribbon库
    - office 2010界面
    - MSDN上也有相关介绍，不太清楚和microsft有什么关系
    - 个人感觉非常漂亮，非常好

建议采用Fluent Ribbon。

# WPF Ribbon Control

微软最早发布的Ribbon控件，界面与Office2007相同，下载需要[获得授权](https://profile.microsoft.com/RegSysProfileCenter/wizard.aspx?wizid=5fed1051-2e7b-4049-8177-0fdaae5f475c&lcid=1033)（[可参考这里](http://www.cnblogs.com/gnielee/archive/2010/05/10/wpf4-ribbon-quick-access-toolbar.html)）。微软已停止对其更新。

![](http://hustlei.qiniudn.com/FluentRibbon/WPFRibbonControl.png)

# Microsft Ribbon for WPF

微软在WPF Ribbon Control之后新发布的官方免费Ribbon控件，2010年发布最终版本，MSDN下载地址为<http://www.microsoft.com/en-us/download/details.aspx?id=11877>。

可以直接在msdn上下载Microsoft Ribbon for WPF Source and Samples.msi或者Microsoft Ribbon for WPF.msi安装。

![](http://hustlei.qiniudn.com/FluentRibbon/WPFRibbon.png)

# Fluent Ribbon

开源Ribbon控件库，在[MSDN Ribbon](https://msdn.microsoft.com/zh-cn/gg678593.aspx?ocid=aff-n-cn-win-2011Mar-51CTO)上也有提到过。界面同office2010，2013相同，完全免费。官方网站为<https://github.com/fluentribbon/Fluent.Ribbon>。

支持多种皮肤，同时还有Button，ComboBox等常规控件，支持多国语言。

最早在codeplex上，名称为Fluent Ribbon Control Suite，后来改名为Fluent Ribbon，后又迁移到github上。至今仍在更新。

![](http://hustlei.qiniudn.com/FluentRibbon/FluentRibbon.png)


# 参考链接

+ [WPF Ribbon和Fluent Ribbon(msdn)](https://msdn.microsoft.com/zh-cn/gg678593.aspx?ocid=aff-n-cn-win-2011Mar-51CTO)
+ [Fluent Ribbon官方网站](https://github.com/fluentribbon/Fluent.Ribbon)
+ [WPF Ribbon Control授权链接](https://profile.microsoft.com/RegSysProfileCenter/wizard.aspx?wizid=5fed1051-2e7b-4049-8177-0fdaae5f475c&lcid=1033)
+ [Ribbon基本概念(msdn)](https://msdn.microsoft.com/en-us/library/dn742393.aspx)
+ [Ribbon介绍参考](http://kb.cnblogs.com/page/70182/)