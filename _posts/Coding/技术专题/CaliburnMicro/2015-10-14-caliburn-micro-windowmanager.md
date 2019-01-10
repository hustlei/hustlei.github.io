---
layout: post
title: Caliburn.Micro中的WindowManager
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


## Window Manager 简介
Caliburn Micro的窗口管理器可以通过ViewModel创建窗口，你只需要传递一个ViewModel实例给窗口管理器，窗口管理器就会自动查找对应的View，并作为一个窗口或对话框打开，在打开前还可以对view的部分依赖属性进行配置。

窗口管理器在CM中非常重要，应用程序创建新窗口，弹出对话框等使用窗口管理器都是非常方便的。但是在CM中WindowManager在每个平台(WPF、Silverlight、WindowsPhone、WinRT)上的实现都不相同。所以，想完全了解有点困难，就连官方文档都没有详细说明。所以，为了简便起见，本文也只对WPF上的WindowManager进行介绍。

## WPF中应用Window Manager
要使用窗口管理器，就需要有一个窗口管理器的对象。我们通常做法就是在Bootstrapper中配置IOC时，创建一个WindowManager并导入到IOC容器（可以参考学习之前Bootstrapper配置相关文章）。配置IOC的代码可以是这样的（在本文中都是以MEF为IOC容器为示例的）：

~~~ csharp
  protected override void Configure()
  {
    container = new CompositionContainer(new AggregateCatalog(AssemblySource.Instance.Select(x => new AssemblyCatalog(x)).OfType<ComposablePartCatalog>()));
 
    CompositionBatch batch = new CompositionBatch(); 
    batch.AddExportedValue<IWindowManager>(new WindowManager());
    batch.AddExportedValue(container); 
    container.Compose(batch);
  }
~~~

然后我们在需要使用WindowManager的ViewModel中提取WindowManager对象。具体做法如下：

~~~ csharp
[Export(typeof(ShellViewModel))]
public class ShellViewModel : PropertyChangedBase
{
private readonly IWindowManager _windowManager;
 
[ImportingConstructor]   //必须加入这个，这是因为用MEF在创建ShellViewModel实例时，有[ImportingConstructor]标记的构造函数的参数会自动使用容器内相应的export对象
public ShellViewModel(IWindowManager windowManager)
{
  _windowManager = windowManager;
}
  ...
}
~~~

使用WindowManager反而很简单，如下代码会创建一个新的ShellViewModel，并根据ShellViewModel找到ShellView，然后显示ShellView窗口，ShellViewModel会成为ShellView的dataContext。

~~~ csharp
public void NewWindow()
{
   _windowManager.ShowWindow(new ShellViewModel(_windowManager));
}
~~~

Window Manager中打开窗口，对话框和弹出窗口，都可以，只需要调用不同的方法即可。你可以在 Caliburn Micro 自带的 HelloWindowManager 示例中，看到WindowManager窗口管理器的更多用法。

## WindowManager的setting参数
在WindowManager创建窗口时，可以传递参数给新的窗口的属性。这能更好的使您根据您的需要，更细的控制您的应用程序。可以参考如下示例：

~~~ csharp
public void NewWindow()
{
     var settings = new Dictionary<string, object> { { "Topmost", true }, { "Owner", GetView() } };
     //Owner不是依赖属性不能绑定,但在这里设置是可以的
     _windowManager.ShowDialog(new ConfigViewModel(), null, settings);
}
~~~

上述示例中，我把新窗口的Topmost设置为true，Owner设置为当前ViewModel绑定的窗口（如果当前ViewModel继承了ViewAware或Screen等，就可以调用GetView方法获取View对象）。

## 自定义WindowManager 
有些情况下，实现自定义的窗口管理器是有用的。如果你需要在所有窗口实例中设置属性都是一样的值，用它就很好。例如，属性可能包括icon图标，窗口状态，窗口大小和自定义程序样式。我发现在Windows中最常设置的属性是“SizeToContent”。默认情况下，Caliburn Micro是设置SizeToContent.WidthAndHeight。这意味着该窗口根据它的内容自动调整自身大小。虽然有时可以方便的这样做，但我发现这会导致一些问题：某些应用程序的布局和设置窗口时，默认情况下最大化会导致越界。

创建一个自定义的窗口管理器是非常简单的。首先添加一个继承于“WindowManager”的类，接下来，可以重写“EnsureWindow”方法，做一些类似如下：
 
~~~ csharp
protected override Window EnsureWindow(object model, object view, bool isDialog)
{
  Window window = base.EnsureWindow(model, view, isDialog); 
  window.SizeToContent = SizeToContent.Manual;
  return window;
}
~~~
 
在这个方法中，我们首先通过调用base.EnsureWindow（）来创建窗口实例。接下来，你可以设置一下你想要的窗口中的属性，然后简单地返回窗口实例。

之后只需要用自定义窗口管理器代替默认的窗口管理器，就可以实现你想要的效果。比如你可以用如下方式添加你的自定义窗口管理器：

~~~
batch.AddExportedValue<IWindowManager>(new AppWindowManager());
~~~

> 这样会导致所有使用窗口管理器的地方，报告CM内部都会采用你的自定义窗口管理器。

# 参考链接

+ [WPF Resource 学习](http://wenku.baidu.com/link?url=J5y0P6ARZSGybirBpVzKB3SgfnHbLt4ThfKoAlm3xsq6Kl8xE95kqbXVOGk8YQg2ruR9zboGJc9tyVHiqzn1tTyN8ITCYSUG0D4ZyvgZZNq)
