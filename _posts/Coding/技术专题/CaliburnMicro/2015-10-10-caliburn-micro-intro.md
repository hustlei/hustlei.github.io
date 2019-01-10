---
layout: post
title: Caliburn.Micro简介
category: .net框架
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

# Caliburn.Micro简介
Caliburn.Micro的定位是一个轻量级的MVVM框架，事实上是Caliburn框架精简了90%的代码(当然，据说保留了90%的功能)。CM由C#编写，可用于.net下的任何编程语言，除了支持winform、wpf外，还支持windows phone、android、ios跨平台开发以及winRT开发。CM精简，特点鲜明，思路清晰，不过度设计，有很好的扩展性和可测试性。当然，指望一个框架做所有事情是不现实的，用牛刀来杀鸡可能杀的爽快，不过学习的时间成本和后期维护成本都很高。

另外，Caliburn.Micro的实现方式和MVVMLight等完全不同，CM的ViewModel和View完全分离，CM会把View和ViewModel通过反射加载到一个容器中，当你调用ViewModel时，CM自动将ViewModel绑定到View上。所以，初学的时候会稍微难上手。

# 主要功能
Caliburn.Micro框架中包含了很多功能，包括

+ **Convention**（协定）
+ **Action**
+ **Window Manager**
+ **Screen和Conductor**
+ Coroutine（协同）
+ EventAggregator（弱事件）
+ Logging等等

其中有些功能都是锦上添花之作，比如EventAggregator等，在Prism等框架中都有介绍。CM的核心思路是它的Convention，Action、以及Window Manager, Screen和Conductor。

## Conventions以及binding
协定，也就是智能匹配的意思，是CM核心功能之一，也是和其他MVVM最大不同的地方。

+ CM会根据xxxViewModel自动找到xxxView，并把xxxViewModel作为xxxView的dataContext；
+ CM会自动把ViewModel中的属性绑定到View的同名控件上，比如ViewModel里名为t1的属性，View有一个名为t1的textbox控件，则CM会自动把t1属性绑定在textbox的Text上。
+ CM制定了一系列匹配的规则，不仅有view/viewmodel、属性，还有方法、快捷键等等。
+ 在CM可以用协定代替Command和Binding，当然ViewModel也会自动被设置为View的dataContext，还是可以直接用Binding的。
+ 协定还有一种默认匹配方式：给控件命名的时候如txt_abc这样加下划线Caliburn会把这个名字分开成txt和abc两个属性，它会把abc属性绑定到控件的txt属性上。
+ 如果不想用协定，可以关闭该功能；也可以只在某一个View上关闭。

> 目前版本协定还不支持路由事件，所以对树、tab等需要在父对象上处理事件的情况不太方便。

### 自定义View/ViewModel绑定
CM可以关联多个View到同一个ViewModel，也可以在一个View内关联多个ViewModel。

关联多个ViewModel到一个View非常简单，只要将View的某个UI元素命名为xxView，就可以自动匹配对应ViewModel，当然创建用户控件看上去会更加清晰。

关联多个View到同一个ViewModel的方法有3个：

1. 对于 ViewModels.MainViewModel 会自动关联 Views.MainView，如果在windowManager创建新窗口时,ViewModel参数设为MainViewModel，为context参数设置值为vxx,那么将会自动将窗口的ViewModel关联到Views.Main.vxx。
2. 在UI代码里添加 View.Model 附加属性(可以和View.Context附加属性一起使用，单独使用View.Model附加属性也可以)。
3. 自定义 convention 规则，比较麻烦，小项目不建议。

## Action Message
CM结合了Blend中的TriggerAction，直接将ViewModel中的方法绑定到View控件上，而不用Command。CM对Action进行了很多扩展，包括可以传入多个参数，参数支持绑定，可以通过CanExecute作执行前判断并设置控件的Enable等，是CM核心功能之一。使用Action在xaml里绑定事件方法确实很爽，但是如果使用代码动态设置事件就没那么方便了，或许可以通过ViewModel里对应方法里对动作行为进行多分支设置。

TriggerAction经过简单配置也可以再Xaml里绑定快捷键。但是我们通常会把快捷键放在xml配置文件里，让用户可以修改快捷键，暂时还没有找到实现的方法。动态修改快捷键貌似也不容易。

## Window Manager
Caliburn Micro的窗口管理器(Window manager)可以用ViewModel直接创建View并显示，你只需要传递一个ViewModel实例给窗口管理器，窗口管理器就会自动查找对应的View，并作为一个窗口或对话框打开，在打开前还可以进行配置(可以配置View中的依赖属性)。

## Screen和Conductor
作为一个Presentation的框架，各个UI部件（Widget或者叫Pad）的管理是必不可少的。Screen就是用来表示UI部件的，它定义了一些列UI部件的生命期管理函数，比如Activated，DeActivated，TryClose等，并且可以通过GetView可以获得对应的View对象。因为Screen实现了很多功能，所以个人建议所有ViewModel都继承自Screen。

Conductor可以用来管理Screen，不同的Screen可以用一个Conductor来管理，Conductor也使用了策略模式允许更改对Screen的处理；继承Conductor<>的ViewModel可以调用ActiveItem等方法管理继承自Screen的ViewModel；Conductor本身也是个Screen，因为Conductor也继承了Screen类。

## MVVM 与 NotifyPropertyChanged
MVVM框架中，ViewModel都需要实现INotifyPropertyChanged接口，从而实现在ViewModel属性更改时能够自动发出事件告知View。在CM中， ViewModel通常可以继承自PropertyChangedBase或Screen。(Screen继承自PropertyChangedBase，如果继承自Screen，则ViewModel可以被当做窗口一样进行激活、关闭等操作。)

相关继承关系如下：

+ INotifyPropertyChangedEx 继承自 INotifyPropertyChanged
+ IScreen 和 IConductor 都继承了 INotifyPropertyChangedEx
+ PropertyChangedBase 继承自 INotifyPropertyChangedEx
+ ViewAware 继承了 PropertyChangedBase 和 IViewAware
+ Screen 继承了 ViewAware 和 IScreen
+ Conductor 继承了 Screen 和 IConductor

在CM中，继承自PropertyChangedBase可以保证NotifyProperty方式发起的事件都在UI线程上。另外，CM中还有一个特殊的集合BindableCollection继承自ObservableCollection，也同样可以保证发起的事件在UI线程上执行。

## Event Aggregator
事件聚合器，很容易让你的应用程序的多个部分发送消息给对方的服务。事件聚合器是针对具有多个视图模型较大的应用程序时会更有用。当你的应用程序有很多个view-models（视图模型）需要沟通，这将非常有用。向事件聚合器订阅你的对象（如view-models），并指定他们应该听什么类型的消息，定义（接收端）对象当收到这样的消息会做些什么。这样，当应用程序的一端发布的消息，事件聚合器可以确保匹配的订阅对象接受它，并执行相应的操作。

## Coroutines
协同程序，定义了一组程序的执行，简化了异步编程。比如说在网络中下载图片并显示，通常来说需要显示BusyIndicator，后台线程去网络读取图片，读取成功后Invoke到UI线程，取消BusyIndicator，显示图片。CM提供了一个IResult接口，大大的简化了异步编程，结合ActionMessage，为AOP的扩展提供了可能。

在CM中，ViewModel内的任何action都可以通过返回IResult或IEnumerable<IResult>来应用协同。IResult可以访问函数相关的View、FrameworkElement trigger等信息。

## 配置性和扩展性
CM通过Bootstrapper配置框架和加载程序，你只需要继承Bootstrapper并在应用程序启动前创建它的一个实例，就可以了。WPF应用通常可以把继承自Bootstrapper的类作为资源放在Application的资源字典内，当然也可以在App类的构造函数内new一个继承自Bootstrapper的类。在Bootstrapper的继承类里可以通过重载一些方法来配置IOC容器、加载View的程序集位置、应用程序的部分事件(Startup、Exit、unhandledexception)。

CM移除掉了原Caliburn的一些IOC实现，作为一个通用框架，最常用办法就是使用工厂模式结合配置文件提供可配置性，使用IOC来解耦组件间（比如View和ViewModel）的依赖。可以重载Bootstrapper的部分方法来配置自己的IOC容器，如MEF,Unity等, 使用IOC容器加载程序集。

## Design-time support
设计时支持，CM中的ActionMessage是继承自Blend中的TriggerAction的，也就是说可以在Blend编辑ActionMessage，大大方便了使用。


