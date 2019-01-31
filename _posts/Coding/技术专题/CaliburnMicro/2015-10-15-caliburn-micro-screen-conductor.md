---
layout: post
title: Caliburn.Micro中的Screen和Conductor
category: Caliburn.Micro
group: Coding
tags: [Caliburn.Micro]
keywords: [Caliburn.Micro, MVVM, WPF框架, .NET框架]
description:  Caliburn.Micro MVVM框架简介

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---

+ 目录
{:toc}


## Screen和Conductor
作为一个Presentation的框架，各个UI部件（Widget或者叫Pad）的管理是必不可少的。Screen就是用来表示UI部件的，它定义了一些列UI部件的生命期管理函数，比如Activated，DeActivated，TryClose等，并且可以通过GetView可以获得对应的View对象。因为Screen实现了很多功能，所以个人建议所有ViewModel都继承自Screen。Conductor可以用来管理Screen，不同的Screen可以用一个Conductor来管理，Conductor也使用了策略模式允许更改对Screen的处理；继承Conductor<>的ViewModel可以调用ActiveItem等方法管理继承自Screen的ViewModel；Conductor本身也是个Screen，因为Conductor也继承了Screen类。

相关继承关系如下：

+ INotifyPropertyChangedEx : INotifyPropertyChanged
+ IScreen : IHaveDisplayName, IActivate, IDeactivate, IGuardClose, INotifyPropertyChangedEx
+ PropertyChangedBase : INotifyPropertyChangedEx
+ ViewAware : PropertyChangedBase, IViewAware
+ Screen : ViewAware, IScreen, IChild

从Screen派生和窗口管理有关的类的继承关系(可以查看了Window Manager、Screen和Conductor后再看)：

+ IConductor : IParent, INotifyPropertyChangedEx
+ ConductorBase<T> : Screen, IConductor, IParent<T>
    - AllActive : ConductorBase<T>
        * ConductorBaseWithActiveItem<T> : ConductorBase<T>, IConductActiveItem
            + Conductor<T> : ConductorBaseWithActiveItem<T>
            + OneActive : ConductorBaseWithActiveItem<T>

未完待续

# 参考链接

+ [WPF Resource 学习](http://wenku.baidu.com/link?url=J5y0P6ARZSGybirBpVzKB3SgfnHbLt4ThfKoAlm3xsq6Kl8xE95kqbXVOGk8YQg2ruR9zboGJc9tyVHiqzn1tTyN8ITCYSUG0D4ZyvgZZNq)
