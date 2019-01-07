---
layout: post
title: 程序源代码结构及Visual Studio工程设置
category: 编程工具
group: Coding
tags: [Visual Studio]
keywords: [Visual Studio, VS, 源代码结构]
description: Visual Studio工程设置及源代码结构管理

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}


# 程序项目目录结构

个人喜欢把源代码、引用库、输出分别放在不同的文件夹，方便管理

* 项目子目录包括
    + Make及log等
    + 引用头文件
    + 引用第3方库
    + 引用资源
    + 源代码
    + 程序生成目标目录
    + 文档
    + 示例
    + 数据

基本目录结构如下

~~~
.
|-- Readme.md
|-- ChangeLog
|-- Makefile
|-- inc                    //存放公共头文件
|   |-- file.h
|   |-- file2.h
|-- libraries                    //存放引用的第3方库
|   |-- win32
|   |   |-- lib
|   |       |-- xx.lib
|   |   |-- dll
|   |       |-- xx.dll
|   |-- win64
|       |-- lib
|           |-- xx.lib
|       |-- dll
|           |-- xx.dll
|-- Resources                        //项目资源
|   |-- app.ico
|-- src                    //存放c源代码
|   |-- module1
|   |   |-- file.c
|   |   |-- file2.c
|   |   |-- src1.mm    //代码结构
|   |-- module2
|   |   |-- file3.c
|   |-- tests
|       |-- file3.c
|-- dox                    //帮助文档源代码
|   |-- *.md
|-- doc                    //帮助文档
|   |-- overview.chm
|   |-- html
|   |   |-- *.html
|   |-- pdf
|       |-- *.pdf
|-- win32
|    |-- lib               //存放dll导入库
|    |    |-- libxxx.lib
|    |-- bin               //存放dll和exe应用程序
|    |    |-- file.dll
|    |    |-- test.exe
|    |-- v1.0
|         |-- prog.exe     //发布版本
|-- data
|   |-- x.xls
|   |-- x.iges
|-- samples
|    |-- win32
|         |-- winform.exe
|-- license.txt
~~~

在Visual Studio中，我的目录结构通常是

~~~
.
|-- Readme.md
|-- ChangeLog
|-- src                               //源代码
|   |-- solution.sln
|   |-- project1
|   |   |-- project1.csproj
|   |   |-- file.cs
|   |   |-- Properties
|   |       |-- AssembliyInfo.cs
|   |       |-- Resources.Designer.cs
|   |       |-- Settings.settings
|   |-- project2
|       |-- project2.vbproj
|       |-- file.vb
|       |-- My Project
|           |-- AssemblyInfo.vb
|           |-- Resources.Designer.vb
|           |-- Settings.settings
|-- inc                              //公共头文件
|   |-- file.h
|   |-- file2.hxx
|-- Libraries                        //使用的外部库文件，包括第3方库
|   |-- System.Data.SQLite.dll
|   |-- Docking
|       |-- skin.dll
|-- Resources                        //项目资源
|   |-- app.ico
|-- dox                              //帮助文档源文件
|   |-- *.md
|-- doc                              //帮助文档
|   |-- overview.chm
|   |-- html
|   |   |-- *.html
|   |-- pdf
|       |-- *.pdf
|-- data  //数据文件，可以是示例文件(*.igs,*.xls等),也可以是数据库
|   |-- sample.igs
|   |-- data.xls
|   |-- exchange.db
|-- samples                         //示例
|   |-- proj1
|       |-- *.*
|-- win32                          //项目输出
|   |-- bin                        //项目Release输出
|   |   |-- Bin       //非主程序的exe等
|   |   |-- Common    //主程序常用库文件等
|   |   |   |-- System.Data.SQLite.dll
|   |   |-- Profile   //配置文件目录
|   |   |   |-- init.conf
|   |   |-- Plugins   //插件目录
|   |   |-- Data      //数据目录
|   |   |-- mainprog.exe
|   |-- bind                      //项目Debug输出
|   |   |同bin目录结构
|   |-- objd                      //项目Debug中间文件
|   |   |-- project1  //每个项目中间文件需要分开放
|   |   |-- project2
|   |-- obj                       //项目Release中间文件
|-- license.txt
~~~

# Visual studio 改变输出文件路径方法

对每一个项目按下述方式设置

1. 在项目上点击右键
2. 选择==>生成
3. 选择==>配置
    + 选择debug为当前配置
    + 在下方输出路径内填入`..\win32\bind`
4. 再次选择==>配置
    + 选择Release为当前配置
    + 在下方输出路径内填入`..\win32\bin`

> 根据不同的项目选择不同的输出路径，如可以设置project1的输出路径为`..\win32\bind\Common`

# Visual Studio 改变中间文件输出路径方法

以project1.csproj为例

1. 用记事本打开project1.csproj
2. 在`<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|AnyCPU'">`标签内增加如下子标签 `<BaseIntermediateOutputPath>..\win32\objd\$(ProjectName)</BaseIntermediateOutputPath>`
3. 在`<PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|AnyCPU'">`标签内增加如下子标签 `<BaseIntermediateOutputPath>..\win32\obj\$(ProjectName)</BaseIntermediateOutputPath>`

> vbproj相同

c++项目.vcxproj可以在项目属性内直接设置，和输出路径在一起。

也可以通过如下方式设置：

~~~ xml
  <PropertyGroup>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">..\..\win32\bind\</OutDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">..\..\win32\objd\</IntDir>
~~~

> IntDir即为中间文件obj输出目录

# Visual studio 改变配置文件位置的方法

引用反射`using System.Reflection;`

修改应用程序入口如下：

~~~ csharp
[STAThread]
static void Main()
{
    Application.EnableVisualStyles();
    Application.SetCompatibleTextRenderingDefault(false);
    conf("Profiles\\init.conf");
    Application.Run(new MainFrm());
}
static void conf(string p)
{
    AppDomain.CurrentDomain.SetData("APP_CONFIG_FILE", p);
    var m = typeof(AppDomainSetup).GetMethod("UpdateContextProperty", BindingFlags.NonPublic | BindingFlags.Static);
    var funsion = typeof(AppDomain).GetMethod("GetFusionContext", BindingFlags.NonPublic | BindingFlags.Instance);
    m.Invoke(null, new object[] { funsion.Invoke(AppDomain.CurrentDomain, null), "APP_CONFIG_FILE", p });
}
~~~

# Visual studio 自动拷贝引用文件方法

将配置文件app.config输出到Profile文件夹下，并改名，步骤如下：

在项目上点击右键

1. 选择==>属性
2. 选择==>生产时间标签
3. 选择==>编辑后期生产事件  //设定编译完后自动执行的批处理命令
4. 可以输入如下命令

~~~ batch
copy $(ProjectDir)\app.config $(TargetDir)\Profiles\init.conf
del $(TargetDir)\$(TargetFileName).config
! 以上代码表示把app.config拷贝到输出文件夹的Profiles里，并删除输出文件夹里的app.exe.config文件
~~~

引用的dll文件等，在文件属性的==>复制本地内设置"false"，即不复制，然后手工将dll复制到输出文件夹bin内相应位置。


# C# .net 改变引用的类库, dll路径

在配置文件(通常是app.config)的<configuration>标签内增加如下标签：

~~~ xml
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="bin;common;common\\view;plugins\\skin"/>
    <!-- privatePaht属性值即为添加的路径 -->
    </assemblyBinding>
  </runtime>
~~~

## C# .net 找不到dll，无法加载dll问题

所有配置都没有问题，但是程序依然无法运行，或者加载组件时出错，例如抛出System.BadImageFormatException异常，则考虑如下问题

+ 程序引用了32bit的dll，但是生成的目标程序不是32bit的，请将项目的“平台目标”属性设置为 x86，然后重新编译，就ok了。