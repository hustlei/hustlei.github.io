---
layout: post
title: Caliburn.Micro 协定
category: .net框架
group: Coding
tags: [Caliburn.Micro]
keywords: [Caliburn.Micro, MVVM, WPF框架, .NET框架]
description:  Caliburn.Micro MVVM框架入门，Caliburn.Micro 协定，Caliburn.Micro Conventions

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---
+ 目录
{:toc}

# Caliburn.Micro协定
协定是CM的一个主要特性，也是CM和其他MVVM框架最大的不同之处。利用协定可以完全把UI和逻辑分离，很多人都喜欢协定，但是也有一些人不喜欢，所以在CM中，协定是可以关闭的，当然默认是开启的。

在这里我们只讲ViewModel-First方式。

## View
CM一开始就会根据ViewModel查找对应的View，怎么查找呢？通过如下方式：

~~~ csharp
    var viewTypeName = modelType.FullName.Replace("Model", string.Empty);
    if(context != null)
    {
        viewTypeName = viewTypeName.Remove(viewTypeName.Length - 4, 4);
        viewTypeName = viewTypeName + "." + context;
    }
~~~

即删除VM全名中所有的Model字符串，如果有context则在尾部增加.context。完整代码在LocateForModelType方法中，有兴趣的话可以查看源代码。我们暂时还用不到context，只有多个view关联一个ViewModel时才会用到，本文后边会介绍。

## ViewModelBinder
CM在找到匹配的ViewModel和View后会调用ViewModelBinder关联两者。ViewModelBinder会把View的Action.Target设置为对应的ViewModel，还会把View的DataContext设置为对应的ViewModel。ViewModelBinder也会检查ViewModel是否继承了IviewAware，如果继承了就会把View传递给IviewAware（也就是ViewModel）。然后它会创建两者之间的属性和action绑定。

### ViewModelBinder查找wpf元素方法
ViewModelBinder是通过遍历VisualTree从View中查找能够和VM中属性方法绑定的元素的。ViewModelBinder可以在WPF中查找ContentControl.Content、ItemsControl.Items、HeaderContentControl.Header、HeaderedItemsControl.Header等。但是ContextMenus, Tooltips等是不能够查找的，也就是说这些是不能应用协定的。

当然如果你想让CM协定支持ContextMenus等，也不是没有办法，需要自定义。在xaml被编译后，每一个有x:Name的元素都会生成一个private field，所以可以通过反射查找每一个field来实现，然后重写GetNamedElementsInScope方法。CM之所以没有实现是因为Silverlight因为安全问题不允许这样做。


### 另外
在所有平台上，协定不能直接在DataTemplate上起作用。为了解决这个问题，需要在DataTemplate内的根元素上添加一个Bind.Model="{Binding}"附加属性。

