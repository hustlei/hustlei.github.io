---
layout: post
title: WPF资源(resource)
category: UI
group: Coding
tags: [WPF]
keywords: [WPF, resource, 资源]
description:  WPF 资源 resource

author: lileilei
revision:
    editor: lileilei
    date: 2014-06-12
---

* 目录
{:toc}

# WPF资源形式

WPF支持三种形式的资源

+ 二进制资源(binary resource)
    - Resource:将资源嵌入程序集中，WPF将相关资源打包到.Resources文件，然后再由编译器嵌入到程序集文件中
    - Content:资源不会嵌入到程序集，仅仅在程序集清单中添加一条记录。资源文件必须随其他程序集文件一起部署到目标目录。 
    - Loose File:这类资源通常是运行期动态确定或加入的
+ 逻辑资源(logical resource)
    - xaml各个元素的Resource属性
    - 资源字典ResourceDictionary
+ .resx资源(同winform相同)

> *WPF默认的URI访问方式是不支持Embedded Resource的*，Embedded Resource只能用于.resx资源文件。

典型的资源文件在项目工程文件.csproj中的形式：

~~~ xml
<!--在winform中使用Content和resx比较多，在wpf中使用Resource比较多。-->
    <Resource Include="Images\App.ico" />
    <Resource Include="Images\Forword.png" />
    <Resource Include="Images\Back.png" />
    <Content Include="Images\Go.jpg" />
    <Content Include="Images\pass32.png" />
    <Content Include="Images\warning.gif" />
    <EmbeddedResource Include="LoginForm.resx">
      <SubType>Designer</SubType>
      <DependentUpon>LoginForm.cs</DependentUpon>
    </EmbeddedResource>
    <EmbeddedResource Include="OptionsForm.resx">
      <SubType>Designer</SubType>
      <DependentUpon>OptionsForm.cs</DependentUpon>
    </EmbeddedResource>
~~~

# WPF资源生成及访问方式

## 二进制资源

### Resource资源

Resource资源只支持二进制资源，图片资源应用该形式的最多。资源会被嵌入最终生成的exe或dll中，在WPF中可以通过URI访问。

+ 设置资源为Resource资源
    - 把资源加入工程
    - 设置资源属性"生产操作"=>"Resource"
+ 访问方式(URI)
    - `<Image  Source="pack://application:,,,/Learn.Library;component/s.gif" />`
    - `<Image Source="/Learn.Library;component/s.gif"/>`
    - `<Image Source="/ResourceDll;component/Resources/cancel.png"/>`
    - myBitmapImage.UriSource = 
      new Uri(“pack://application:,,,/ResourceDll;component/Resources/cancel.png”, UriKind.Absolute);

> 其他程序集的资源必须以 Resource 方式嵌入。
> 
> 不能省略 "/AssemblyReference" 前面的反斜杠。
> 
> Component 是关键字，必须包含在 URI 中。

### Loose File资源/独立文件

为了方便用户可以自由切换图片，使用独立文件也不失为一种上佳选择，当然，其风险也是不言而喻的，独立文件无法被正常打开时，会导致程序Crash。

+ 调用方式
    - `<Image Source="pack://siteoforigin:,,,/Images/Cancel.png"/>`
    - myBitmapImage.UriSource = new Uri(“pack://siteoforigin:,,,/Images/Cancel.png”, UriKind.Absolute);
    - `<Image Source="Images/Cancel.png"/>` //可惜我在合并资源字典时用这种方式调用失败了
    - `<Image Source="C:\Images/Cancel.png"/>`
    - `<Image Source="file://C:Images/Cancel.png"/>`
    - `<Image Source="http://www.qidian.com/images/logo.gif" />`
    - `<Image Source="\\server1\share\logo.gif" />`

### Content资源

Content资源和独立文件对于用户来说没有多大区别，调用方式也相同

## 逻辑资源

逻辑资源是WPF特有的资源类型，它是存储在元素的Resources属性中的.NET对象。

### xaml元素的Resource属性定义资源

逻辑资源不仅可以定义文本、图片资源等，甚至可以定义一个完整的子元素。App、Window、甚至Button都可以定义资源。示例如下：

~~~ xml
<Window.Resources>
  <ContentControl x:Key="label1">Hello, World!</ContentControl>
  <ImageSource x:Key="image1">/a.png</ImageSource>
</Window.Resources>
~~~

### xaml资源字典

逻辑资源也可以集中放在资源字典ResourceDictionary中。

~~~ xml
<ResourceDictionary>
<ContentControl x:Key="label1">Hello, World!</ContentControl>
<ContentControl x:Key="label2">Hello, C#!</ContentControl>
</ResourceDictionary>
~~~

通过合并资源字典把资源字典的资源添加到Resource属性

~~~ xml
<Window.Resources>
  <ResourceDictionary>
    <ResourceDictionary.MergedDictionaries>
      <ResourceDictionary Source="Dictionary1.xaml" />
    </ResourceDictionary.MergedDictionaries>
  </ResourceDictionary>
</Window.Resources>
~~~

### 逻辑资源调用

逻辑资源的引用方式分2种：

+ 静态(StaticResource)
    - 仅在第一次资源加载时被应用
    - 不支持前向引用(Forward Reference)，也就是说我们必须先定义资源，然后才能使用静态引
+ 动态(DynamicResource)
    - 在资源被更改时重新应用
    - 动态资源只能用于设置依赖属性值，因此它不能像静态资源那样引用一个完整的元素对象

两种引用方式实际上都是使用的xaml Markup Extension(标记扩展)，需要使用标记扩展语法，即"{extension somting}"方式，举例如下：

~~~ xml
<Label Content="{StaticResource label}" />
<Label Content="{DynamicResource label2}" /> 
~~~

> {staticresource resourcekey="keyname"} 与{staticresource keyname}相同

## .resx资源(嵌入资源/Embedded Resource)

可以提供对字符串，图片、二进制数据的存储

更改或新增资源(例如：多语言支持新增语言)需要重新编译

# 参考链接

+ [WPF Resource 学习](http://wenku.baidu.com/link?url=J5y0P6ARZSGybirBpVzKB3SgfnHbLt4ThfKoAlm3xsq6Kl8xE95kqbXVOGk8YQg2ruR9zboGJc9tyVHiqzn1tTyN8ITCYSUG0D4ZyvgZZNq)
+ [WPF中Resource调用方法小析](http://www.alvachien.com/alvablog/?p=1014)
+ [WPF学习之资源](http://www.cnblogs.com/zlgcool/archive/2008/10/18/1314281.html)
+ [.Net程序实现多语言](http://www.withonly.com/?p=413)
+ [资源字典实现wpf多语言](http://www.oschina.net/translate/building-multilingual-wpf-applications)