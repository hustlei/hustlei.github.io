---
layout: post
title: Caliburn.Micro入门
category: .net框架
group: Coding
tags: [Caliburn.Micro]
keywords: [Caliburn.Micro, MVVM, WPF框架, .NET框架]
description:  Caliburn.Micro MVVM框架入门，Caliburn.Micro 配置

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-11
---

+ 目录
{:toc}

# Caliburn.Micro Hello World

## 新建工程
本文只介绍ViewModel First的方式，因为View First比较少用，虽然CM也支持。
在Visual Studio中新建一个WPF工程“Caliburn.Micro.Hello”。
在工程中添加2个依赖：System.Windows.Interactivity.dll 和 Caliburn.Micro.dll
删除MainPage.xaml，修改App.xaml.cs为如下形式：

~~~ csharp
namespace Caliburn.Micro.Hello {
    using System.Windows;

    public partial class App : Application {
        public App() {
            InitializeComponent();
        }
    }
}
~~~

### 创建ViewModel
创建ViewModel，ViewModel需要继承PropertyChangedBase，PropertyChangedBase实现了INotifyPropertyChanged接口，并让Notify事件在UI线程上执行。代码如下：

~~~ csharp
namespace Caliburn.Micro.Hello {
    using System.Windows;

    public class ShellViewModel : PropertyChangedBase {
        string name;

        public string Name {
            get { return name; }
            set {
                name = value;
                NotifyOfPropertyChange(() => Name);
                NotifyOfPropertyChange(() => CanSayHello);
            }
        }

        public bool CanSayHello {
            get { return !string.IsNullOrWhiteSpace(Name); }
        }

        public void SayHello() {
            MessageBox.Show(string.Format("Hello {0}!", Name)); 
        }
    }
}
~~~

### 配置BootStraper
使用CM就必需要有一个BootStraper，BootStraper对CM进行配置，并通过主ViewModel启动View。所以我们首先创建一个继承BootStraper的类。BootStraper最简单的形式如下：

~~~ csharp
namespace Caliburn.Micro.Hello {
    public class HelloBootstrapper : BootstrapperBase {
        public HelloBootstrapper() {
            Initialize();//必须有这一句，这一句实际上对CM进行了配置并启动了程序
        }

        protected override void OnStartup(object sender, StartupEventArgs e)//事实上就是Application的Startup事件
         {            DisplayRootViewFor<ShellViewModel>();//新建ShellViewModel的一个实例，并找到ShellView，绑定并显示。这一句也必须，当然如果不显示程序界面可以不要。
        }
    }
}
~~~

BootStraper必须在Application.Run之前实例化，在WPF中可以把App.xaml修改成如下形式实现：

~~~ xml
<Application xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:Caliburn.Micro.Hello"
             x:Class="Caliburn.Micro.Hello.App">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary>
                    <local:HelloBootstrapper x:Key="bootstrapper" />
                </ResourceDictionary>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
~~~

App.xaml会在关联的类(Caliburn.Micro.Hello.App)的构造函数执行后自动被调用。当如也可以在构造函数内添加InitializeComponent函数自行调用。

## 创建View
在CM中View可以是一个window，也可以是一个控件，如果用DisplayRootViewFor显示一个控件的话，CM会自动把控件放在一个窗口中。

~~~ xml
<UserControl x:Class="Caliburn.Micro.Hello.ShellView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <StackPanel>
        <TextBox x:Name="Name" />
        <Button x:Name="SayHello"
                Content="Click Me" />
    </StackPanel>
</UserControl>
~~~

## 运行程序
编译运行程序，就ok了。

CM可以通过ViewModels找到对应的View，它相当于把ViewModel全名中的Model删除得到View的名称。比如把MyApp.ViewModels.MyViewModel对应到MyApp.Views.MyView。在本程序中VM中的“Name”被自动绑定到了View中x:Name=”Name”的TextBox上。x:Name=”SayHello”的按钮也自动绑定了VM中的SayHello方法，“CanSayHello”属性关联“SayHello”方法和Button的disable属性。这是最基本的CM协定规则，请在程序中查看。

