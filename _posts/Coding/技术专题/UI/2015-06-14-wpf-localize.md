---
layout: post
title: WPF国际化/多语言支持
category: UI
group: Coding
tags: [WPF]
keywords: [WPF, UI, 本地化,全球化]
description:  WPF本地化，全球化,WPF支持多种语言

author: lileilei
revision:
    editor: lileilei
    date: 2014-06-12
---

* 目录
{:toc}

# 全球化/国际化/本地化概念

全球化(Globalization)=国际化(Internationalization)+本地化(Localization)。

+ 全球化，就是软件的目标市场并不是一个国家，而是多个国家或区域,全球化软件是为全球用户设计，面向全球市场发布的具有一致的界面，风格和功能的软件
+ 软件本地化是将一个软件产品按照特定国家/地区或语言市场的需要进行加工，使之满足特定市场上的用户对语言和文化的特殊要求的软件生产活动。
+ 国际化需要保证功能和代码设计能处理多种语言和文化习俗，在创建不同语言版本时，不需要重新设计源程序代码，这个说明国际化实际上是为本地化服务的，其实在软件开发过程中加入国际化的设计就是为了更好，更快的出本地化版本。

简单来讲

+ 软件国际化是指软件具有了处理不同语言,不同区域文化的**能力**,而不论软件本身是以何种语言开发的
+ 软件本地化则是指软件的用户界面及帮助文档等**已经是特定**的(本土的)语言
+ 全球化则包含了国际化和本地化两个流程

更简单的说，程序的"全球化"就是为各个文化制定"本地化"的界面，国际化指程序实现了在多种文化间切换并保持同样风格界面的功能。

# WPF多语言支持

## 多语言实现要求

不同的人，不同的软件对多语言有不同的要求，对于我个人来说，最好要能够实现如下功能。

+ 不同的语言创建不同的资源文件，如en-us.resource.dll, zh-cn.resource.dll, en-us.xaml, zh-cn.xaml
+ 新增语言不需要重新编译软件(非常重要)
+ 运行中可以动态修改语言(方便，不是必须)
+ 通过修改当前Culture(文化语言环境)就可以更改语言(方便国际化，不是必须)
 
> 实际上大多程序是在启动时根据配置文件或系统区域文化读取不同的资源文件。也就是说，改变语言需要重新启动程序。

## WPF多语言实现方法

国际化包含内容比较多，除了多语言外，还包括不同语言导致的控件显示空间及习惯问题，这里主要说多语言的实现方式。

对WPF程序实现国际化功能或进行本地化，有多种方式可以选择。

+ 使用资源字典文件(WPF换肤技术)
    - xaml资源字典不编译为baml时，新增支持语言无需重新编译
    - xaml资源字典编译为baml时，新增支持语言需重新编译
    - 可以实现程序运行中切换语言(DynamicBinding),也可不实现
    - 需要有一个原始.xaml文件才能翻译
    - 与Culture无关，更改Culture语言不变
+ BAML本地化工作流(使用LocBaml工具)
    - 这种方式操作相对繁琐
    - 不能方便的在程序运行过程中动态切换语言
    - 新增支持语言无需重新编译程序
    - 在没有任何源代码的情况下
+ 使用.resx资源文件(winform相同技术)
    - 添加新语言需要重新编译（或许用十分复杂的方法可以实现不用重新编译所有软件？）
    - 可以实现程序运行中切换语言(DynamicBinding),也可不实现
    - 需要有一个原始.resx文件才能翻译
    - 更改Culture语言改变，其他人可以方便的进行翻译，添加新语言
    - 更改Culture语言改变
+ 把需要本地化的资源绑定到XML文件
    - 把xml作为数据源绑定到UI(XmlDataProvider)
    - 也可以通过扩展一个xaml markup extension(标记扩展)来绑定xml数据
    - 可以实现程序运行中切换语言(DynamicBinding),也可不实现
    - 需要一个xml源文件才能翻译(*事实上.resx,.xaml文件都是xml文件*)
    - 与Culture无关，更改Culture语言不变

> 使用Binding技术是，DynamicBinding才能实现在运行中改变UI语言，否则使用StaticBinding时需要重启软件（但是有人测试说修改staticresource值后，引用的地方会自动修改）

> DynamicBinding比StaticBinding多消耗~20%的系统资源(CPU和内存)，即Static性能更好

+ .resx需要重新编译软件，不建议使用
+ 使用xml比使用xaml资源字典没有优势，所以个人也不想使用
+ 资源字典和LocBaml使用哪个呢？
    - 资源字典和Cultrue无关，如果要新增语言不重新编译就要暴露xaml资源字典文件
    - LocBaml不能动态切换
    - 事实上，多数程序都是需要重启才能切换语言的，完全可以在启动的时候选择语言，并且动态切换如果使用了dynamicbinding，效率会降低。
    - 所以，建议使用LocBaml。

# 参考链接

+ [WPF应用程序支持多国语言解决方案](http://blog.csdn.net/hustypf/article/details/7678655)
[](http://www.silverlightchina.net/html/study/WPF/2012/0419/15415_2.html)
+ [对应用程序进行本地化(msdn)](https://msdn.microsoft.com/zh-cn/library/ms746621.aspx)
+ [WPF国际化及系统默认执行过程](http://www.cnblogs.com/bear831204/archive/2009/02/12/1389318.html)
+ [WPF 全球化和本地化（图解）](http://www.cnblogs.com/cnblogsfans/archive/2008/04/12/1150401.html)
+ [.NET程序国际化方法](http://blog.csdn.net/isilent/article/details/7781745)
+ [WPF使用.resx资源文件](http://www.cnblogs.com/xiaokang088/archive/2012/06/28/2567473.html)
+ [WPF根据CultureInfo切换.resx资源](http://blog.sina.com.cn/s/blog_4c0e8aa20100swq8.html)