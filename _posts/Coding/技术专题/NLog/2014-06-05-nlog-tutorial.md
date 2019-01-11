---
layout: post
title: NLog入门
category: NLog
group: Coding
tags: [NLog]
keywords: [NLog]
description:  NLog 教程

author: lileilei
revision:
    editor: lileilei
    date: 2014-06-12
---

+ 目录
{:toc}

## 安装 NLog
NLog 可以从 [NuGet](https://www.nuget.org/packages/NLog/)下载。 GitHub上有Nlog源代码。 

用NUGet安装或者在Package Manager Console里输入如下命令:

```
Install-Package NLog.Config 
```

用Nuget安装时，安装 [NLog.Config package](https://www.nuget.org/packages/NLog.Config/)后，*NLog* and *NLog.Schema* packages 会被自动安装。 安装完成后将会有一个初学者config和配置文件并支持智能提示功能。

## 简介
NLog有两个类：`Logger`和`LogManager`，都在NLog命名空间。`Logger`可以发送log信息/记录，`LogManager`可以创建logger实例。

`Logger`并不和log文件绑定，它只是一个log源，和你源代码中的一个类对应，也就是说每个类都需要一个独立的Logger。NLog通过配置文件设置log输出文件，代码和配置文件分开可以很容易的根据需要配置NLog的执行方式而不用修改代码。

### 创建logger
建议每个类创建一个私有的静态`Logger`(`private static`)。需要用`LogManager`创建`Logger` 实例。

下述代码将创建一个和类同名的`Logger`实例。

```csharp
namespace MyNamespace
{
  public class MyClass
  {
    private static Logger logger = LogManager.GetCurrentClassLogger();
  }
}
```

当然也可以控制`Logger`的名字:

```csharp
using NLog;
 
Logger logger = LogManager.GetLogger("MyClassName");
```

因为logger是线程安全的，所以你只需要为类简单的创建一次静态logger实例。

### Log levels
每个log信息都和log level关联，log level表明lo信息的重要/详细程度。NLog主要根据logger的名字和log level记录log信息。

NLog支持的log levels:
* `Trace` - 跟踪，非常详细的记录，包括大量信息如协议的有效负载等. 这个log level通常只有在开放阶段启用。
* `Debug` - 调试信息，没有Trace详细。通常在产品里不启用。
* `Info` - 信息消息， 一般在产品里启用。
* `Warn` - 警告消息，不严重的问题, 可以恢复的临时性失败操作。
* `Error` - 错误消息，大多数情况下就是指异常`Exceptions`。
* `Fatal` - 非常严重的错误。

### 写log消息
调用`Logger`的方法/函数可以发送log消息。`Logger`类有6个函数，函数名和log level对应，分别是: `Trace()`, `Debug()`, `Info()`, `Warn()`, `Error()` and `Fatal()`。还有一个`Log()`函数，可以在写log消息的同时，设定log level。

```csharp
using NLog;
 
public class MyClass
{
  private static Logger logger = LogManager.GetCurrentClassLogger();
 
  public void MyMethod1()
  {
    logger.Trace("Sample trace message");
    logger.Debug("Sample debug message");
    logger.Info("Sample informational message");
    logger.Warn("Sample warning message");
    logger.Error("Sample error message");
    logger.Fatal("Sample fatal error message");

    // 传递log level作为函数参数
    logger.Log(LogLevel.Warn, "Sample message");
  }
}
```

Log信息也可以用参数 - 字符串参数格式可以像 `Console.WriteLine()`、`String.Format()`一样:

```csharp
using NLog;
 
public class MyClass
{
  private static Logger logger = LogManager.GetCurrentClassLogger();
 
  public void MyMethod1()
  {
    int k = 42;
    int l = 100;
 
    logger.Trace("Sample trace message, k={0}, l={1}", k, l);
    logger.Debug("Sample debug message, k={0}, l={1}", k, l);
    logger.Info("Sample informational message, k={0}, l={1}", k, l);
    logger.Warn("Sample warning message, k={0}, l={1}", k, l);
    logger.Error("Sample error message, k={0}, l={1}", k, l);
    logger.Fatal("Sample fatal error message, k={0}, l={1}", k, l);
    logger.Log(LogLevel.Info, "Sample informational message, k={0}, l={1}", k, l);
  }
}
```

TIP: 请尽量避免使用字符串格式化 (如 concatenation, 或者调用 String.Format) ，尽量使用NLog内置的格式化功能。这样可以提升性能:

格式化log信息话费很多时间，所以NLog会推迟格式化直到确定log信息要被写到某个输出时。如果消息因为配置文件被跳过，`String.Format()`花费也会被节省。

## 配置
前边已经讲了怎么在代码了发出log消息,但是我们还没有为log配置任何输出。所以，当你运行程序的时候会发现，没有任何输出。

打开NLog.config，添加如下记录规则：

1. 在`<targets>`标签，添加:
```xml
<target name="logfile" xsi:type="File" fileName="file.txt" />
```
将定义log输出到file.txt文件。

2. 在`<rules>`标签，添加：
```xml
<logger name="*" minlevel="Info" writeTo="logfile" />
```
这个代码将会把名字为"\*" leve高于Info(**Info**, **Warn**, **Error** and **Fatal**)的所有log写入logfile。

完整的配置文件是这个样子的:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 
    <targets>
        <target name="logfile" xsi:type="File" fileName="file.txt" />
    </targets>
 
    <rules>
        <logger name="*" minlevel="Info" writeTo="logfile" />
    </rules>
</nlog>
```
当你运行程序的时候，log信息将会被写入file.txt文件内。

### 多个目标(输出到多个文件)
让我们试一下更复杂的东西。假如你想把很详细的信息写入一个文件，并且还想在控制台窗口看比较简略的信息。下述配置可以满足要求:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 
    <targets>
        <target name="logfile" xsi:type="File" fileName="file.txt" />
        <target name="console" xsi:type="Console" />
    </targets>
 
    <rules>
        <logger name="*" minlevel="Trace" writeTo="logfile" />
        <logger name="*" minlevel="Info" writeTo="console" />
    </rules>
</nlog>
```

### 特定Logger设置
另一种常见的情景是，需要某些组件，如当前开发的组件产生更详细的log信息，但是减少其他组件的输出信息，可以用如下配置:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 
    <targets>
        <target name="logfile" xsi:type="File" fileName="file.txt" />
    </targets>
 
    <rules>
        <logger name="SomeNamespace.Component.*" minlevel="Trace" writeTo="logfile" final="true" />
        <logger name="*" minlevel="Info" writeTo="logfile" />
    </rules>
</nlog>
```
第一个规则：名字以`SomeNamespace.Component`开头level是`Trace`或更高的loggers将写log信息到logfile。属性`final="true"`表示与制定logger相关的log在写入文件后，将不在执行后续配置的操作。

第二个规则：剩余的logs，如果level高于Info将写入logfile。

### 包装器Wrappers
NLog支持特殊类型的目标，这类目标不作任何记录，但是修改其他logger的动作。这些目标被称为包装器/wrappers。最常用的有:

+ ImpersonatingWrapper(ImpersonatingWrapper-target) - Impersonates another user for the duration of the write.
+ AsyncWrapper(AsyncWrapper-target) - Provides asynchronous, buffered execution of target writes.
+ FallbackGroup(FallbackGroup-target) - Provides fallback-on-error.
+ FilteringWrapper(FilteringWrapper-target) - Filters log entries based on a condition.

更多的包装器请参考官网帮助。

包装器使用target标签并包含一个`<target />`元素，具体如下:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 
    <targets>
        <target name="asyncFile" xsi:type="AsyncWrapper">
            <target name="logfile" xsi:type="File" fileName="file.txt" />
        </target>
    </targets>
 
    <rules>
        <logger name="*" minlevel="Info" writeTo="asyncFile" />
    </rules>
</nlog>
```
上述配置使用了异步包装器，将log异步写入文件，可以改善调用logger线程的相应速度。

###Layouts
Layouts提供了log内容写入文件时格式化内容的方法。有两种layouts:

* 简单layout - which is composed of [Layout Renderers](Layout-renderers)
* 结构化layouts - 可以输出XML, CSV, 以及其他复杂的格式。

简单layout用**${** 和 **}**之间的内容表示。例如，下述配置表示每个log信息前添加**yyyyMMddHHmmss**格式的日期和时间:
```xml
<target name="logfile" xsi:type="File" fileName="file.txt" layout="${date:format=yyyyMMddHHmmss} ${message}" />
```


# NLog高级

###Expose logger to sub-classes
When we wish to expose the logger into sub classes a the following pattern could be used.

```csharp
class BaseClass
{      
    protected BaseClass()
    {
        Log = LogManager.GetLogger(GetType().FullName);
    }

    protected Logger Log { get; private set; }
}

class ExactClass : BaseClass
{
    public ExactClass() : base() { }
    ...
}
```

The `LogManager.GetLogger()` method should NOT be invoked in the constructor of the BaseClass with Type parameter argument i.e. 

``` C#
protected BaseClass()
{
    Log = LogManager.GetLogger(GetType().FullName, GetType());
}
```

as an exception will be thrown. 

In case of the ExactClass has a default constructor which invokes the BaseClass constructor a ```System.StackOverflowException``` is thrown. This is because the ExactClass calls the BaseClass the GetLogger(String, Type) attempts to construct a ExactClass until the exception is thrown.

```
ExactClass => BaseClass => ExactClass => BaseClass => ...
```

When there is no default constructor at the ExactClass the GetLogger(String, Type) method call does not know how to construct the ExactClass and it fails with a ```NLog.NLogConfigurationException```.


## 参考文章

[nlog tutorial](https://github.com/nlog/nlog/wiki/Tutorial)