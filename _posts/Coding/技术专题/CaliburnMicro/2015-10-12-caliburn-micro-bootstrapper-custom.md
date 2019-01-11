---
layout: post
title: Caliburn.Micro Bootstrapper及IOC容器配置
category: Caliburn.Micro
group: Coding
tags: [Caliburn.Micro]
keywords: [Caliburn.Micro, MVVM, WPF框架, .NET框架]
description:  Caliburn.Micro MVVM框架入门，Caliburn.Micro 配置

author: lileilei
revision:
    editor: lileilei
    date: 2014-10-10
---

+ 目录
{:toc}

# Bootstrapper配置

如果想深入学习Caliburn.Micro，本节是重中之重，一定要弄清楚，否则很难理解CM的工作方式。

## 配置Bootstrapper的意义
如果在Boostrapper中不进行任何配置的话，Bootstrapper会首先把Bootstrapper所在程序集加载到 AssemblySource.Instance中。而我们在Bootstrapper中只在DisplayRootViewFor<ShellViewModel>()中给定了一个主ViewModel的类型，那么CM是如何找到找到ViewModel和View并创建实例的?

### CM获得ViewModel实例的方式
CM查找ViewModel的方式只有一个，就是从IOC中提取。默认的IOC.GetInstance是直接用ViewModel的类型创建ViewModel的实例，即Activator.CreateInstance()。默认的方式是一个很简单的让CM能正常工作的方式，但不是很好，建议用户还是使用自定义的IOC容器。

因为默认的方式有如下缺点：

1. Bootstrapper需要依赖ViewModel所在的程序集，否则IOC无法创建VM实例。
2. 每次从IOC提取实例都是一个新建的实例，无法找到之前创建的实例。

这些问题都可以通过配置MEF等作为IOC容器后解决。

### CM获得View实例的方式
CM在创建VM实例后，会先根据VM类型全名获取View的类型名，然后根据View的类型名查找View类型并创建实例。CM会在3个地方查找View，如下：

1. ViewAware：仅仅只有ViewModel继承了ViewAware，并且View实例已经被创建之后才能用。如果一个VM继承自ViewAware，那么在创建VM对应的View时，会调用ViewAware的AttachView方法把View关联在VM上，以后就可以通过ViewAware的GetView方法获得关联的View。也就是说从ViewAware只能获取已有的View实例，并不能创建View实例。VM可以通过继承Screen的方式间接继承ViewAware（Screen继承了ViewAware），这样会有很多方便，比如在VM中用GetView获得View进行某些操作。
1. AssemblySource：用FindTypeByNames方法可以从AssemblySource.Instance中根据类型名称获取类型，然后CM用得到的类型创建View实例。AssemblySource.Instance中的类型都是Bootstrapper的SelectAssemblies方法提供的，在Bootstrapper中可以重载SelectAssemblies方法。
1. IOC:默认情况下没有配置IOC容器，只是在IOC.GetInstance方法中提供了一个简单的创建实例的方法。

所以如果没有配置IOC容器的话，View所在程序集就必须满足以下之一：

+ 用SelectAssemblies方法加载到AssemblySource中。这样CM就可以从AssemblySource中获取View类型
+ View和Bootstrapper在同一个程序集。这样CM就可以用默认IOC.GetInstance静态方法创建一个View实例。

## Bootstrapper配置内容
Bootstrapper中有2个必需用的方法即：

+ Initialize：初始化Bootstrapper所有设置，包括EventAggregator事件、AssemblySource、IOC、Application事件。
+ DisplayRootViewFor<T>: 显示主界面。

Bootstrapper中可以通过重载来配置CM的方法主要有：

+ SelectAssemblies() :设置加载到AssemblySource中的程序集列表
+ PrepareApplication():从名字就可以看出是application的事件处理，事实上里边代码是这样的

        Application.Startup += OnStartup;
        Application.DispatcherUnhandledException += OnUnhandledException;
        Application.Exit += OnExit;

    所以，OnStartup(object sender, StartupEventArgs e)、OnExit(object sender, EventArgs e)、OnUnhandledException(object sender,  DispatcherUnhandledExceptionEventArgs e) 这3个可以重载的方法意义就很清楚了

+ Configure(): 用于配置IOC容器
+ GetInstance(Type service, string key)：IOC容器获取实例的方法
+ GetAllInstances(Type service)：IOC容器获取实例的方法
+ BuildUp(object instance) ：IOC容器注入实例的方法

## Bootstrapper配置实例
MEF是一个.net的插件框架，也可以作为一个依赖注入容器（IOC）使用。我通常就用MEF作为CM的IOC容器。在MEF中所有export部件都会被作为插件导入到container中，通过container也可以访问每个export对象。我们在把MEF作为IOC容器的时候，通常只需要把类标记为export导入到container就可以了，当然不标记为export的类是无法导入到container的。也就是说我们把MEF作为IOC容器的时候，主要使用export部件相关的功能。不了解MEF的话，请了解一下MEF再看以下内容会比较容易理解。

### AssemblySource配置
AssemblySource在CM中只有在查找View的时候会用到，（当然ViewModel-First的时候查找VM也会用到）。所以如果你把View和ViewModel都注入到IOC容器中，应该是可以不需要AssemblySource的。事实上我们在用MEF作为IOC容器时一般只把ViewModel导入容器，View不作处理的。所以，一定要记得把View所在的程序集加入到AssemblySource。

代码示例如下：

~~~ csharp
protected override IEnumerable<Assembly> SelectAssemblies()
{
    return new[] {
        Assembly.GetExecutingAssembly()
    };//返回目前正在執行程序集，当View在目前正在执行的程序集中时，可以这样写。
}
~~~

我个人习惯吧View单独放在一个文件夹的不同程序集中，所以我通常是这样做的：

~~~ csharp
        protected override IEnumerable<Assembly> SelectAssemblies()
        {
            List<Assembly> lst = new List<Assembly>();
            lst.AddRange(base.SelectAssemblies());
            lst.AddRange(
                Directory.GetFiles(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location) + @"\views")
                    .Where(file => file.EndsWith("dll", true, CultureInfo.CurrentCulture) || file.EndsWith("exe", true, CultureInfo.CurrentCulture))
                    .Select(Assembly.LoadFrom));
            //lst.AddRange(from file in Directory.GetFiles(Environment.CurrentDirectory + @"\views") where file.EndsWith("dll") || file.EndsWith("exe") select Assembly.LoadFrom(file));
            return lst;
        }
~~~

虽然并不需要把ViewModel部分也加载到AssemblySource中，但是建议还是放进去比较好，这样在使用的时候会比较方便，并且IOC容器也可以直接用AssemblySource里的内容填充。

如果动态加载了模块，也建议能够同时在AssemblySource和IOC中注册模块。

### IOC配置
在这里我们用MEF作为IOC容器，所以需要先引用两个命名空间：

~~~ csharp
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
~~~

如果所有需要注入IOC的类都已经导入到了AssemblySource，就可以这样设置IOC。注：ViewModel-First时，VM是必需要注入到IOC的。

~~~ csharp
    protected override void Configure()
    {
        container = CompositionContainer(
            new AggregateCatalog(   AssemblySource.Instance.Select(x => new AssemblyCatalog(x))  )
            );

        var batch = new CompositionBatch();
        batch.AddExportedValue<IWindowManager>(new WindowManager());//新建一个窗口管理器添加到IOC中
        batch.AddExportedValue<IEventAggregator>(new EventAggregator());//如果要使用弱事件就需要添加这个了
        batch.AddExportedValue(container);//只是个习惯，这样就可以在任何地方通过IOC使用container了
        container.Compose(batch);
    }
~~~

从IOC容器中获取对象的方法代码如下：

~~~ csharp
    protected override object GetInstance(Type serviceType, string key)
    {
        string contract = string.IsNullOrEmpty(key) ? AttributedModelServices.GetContractName(serviceType) : key;
        var exports = container.GetExportedValues<object>(contract);

        var exportList = exports.ToList();//避免直接用exports时 调用2次IEnumerable操作
        if (exportList.Any())
            return exportList.First();
        throw new Exception(string.Format("Could not locate any instances of contract {0}.", contract));
    }
~~~

从容器获取所有同类型对象和注入容器的方法可以用如下代码：

~~~ csharp
    protected override IEnumerable<object> GetAllInstances(Type serviceType)
    {
        return container.GetExportedValues<object>(AttributedModelServices.GetContractName(serviceType));
    }

    protected override void BuildUp(object instance)
    {
        container.SatisfyImportsOnce(instance);
    }
~~~

BuildUp用到的不多，可以不设置。

### Application相关配置
PrepareApplication()中，我们可以添加新的事件处理程序，比如Activated等。OnStartup可以添加程序启动前需要处理的事情，比如命令行参数处理等，当然还有DisplayRootViewFor方法。OnUnhandledException中添加程序中未处理的异常的处理方法。OnExit处理程序退出事件。

> 另外，在其他平台(非PC)及winform中应用略有不同，请查看官方帮助。


