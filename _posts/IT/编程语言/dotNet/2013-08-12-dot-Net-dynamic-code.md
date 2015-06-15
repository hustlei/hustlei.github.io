---
layout: post
title: .net 动态编程
category: 编程语言
group: IT
tags: [.net]
keywords: [C#动态编程]
description: C#动态编程

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# dynamic 简介

C# 4新增了一个新类型dynamic。该类型是一种静态类型，但类型为 dynamic 的对象会跳过静态类型检查。在编译时，将假定类型为 dynamic 的元素支持任何操作。 因此，您不必考虑对象是从 COM API、从动态语言（例如 IronPython）、从 HTML 文档对象模型 (DOM)、从反射还是从程序中的其他位置获取自己的值。 但是，如果代码无效，则在运行时会捕获到错误。

> 因此，使用dynamic可以很轻松的实现后期绑定（可以不再使用复杂的反射或者混合vb语言）

# com调用

要在.NET这个“托管世界”里调用“非托管世界”中的COM组件，我们必须通过 “互操作程序集（Interop Assembly）”作为桥梁，“互操作程序集”定义了CLR类型与COM类型之间的对应关系。

只要给.NET项目添加对“互操作程序集”的引用，就可以在.NET应用程序中创建这一程序集所包容的各种类型的实例（即COM包装器对象），对这些对象的方法调用（或对其属性的存取）将会被转发给COM组件。

以调用Word为例，在C# 4.0之前您可能经常需要编写这样的代码：

 
~~~ csharp
Object wordapp = new Word.Application();   //创建Word对象
Object fileName = "MyDoc.docx" ;//指定Word文档
Object argu = System.Reflection.Missing.Value;
Word.Document doc = wordapp.Documents.Open(ref fileName, ref argu, 
                ref argu, ref argu, ref argu, ref argu, ref argu, ref argu,
                ref argu, ref argu, ref argu, ref argu, ref argu, ref argu, 
                ref argu, ref argu);
~~~

上述对Open()方法的调用语句只能用“恐怖”一词来形容，其原因是Word组件中的Open()方法定义了太多的参数。

C#4使用dynamic关键字，配合从Visual Basic中学来的“命名参数与可选参数”这两个新语法特性，可以写出更简洁的代码：

~~~ csharp
dynamic wordapp = new Word.Application();
dynamic doc = wordapp.Documents.Open(FileName: "MyDoc.docx");
~~~

上述代码中省去了用不着的参数，并且可以去掉参数前的ref关键字。

当上述代码运行时，DLR会使用反射技术将dynamic表达式“绑定（bind）”到COM互操作程序集中所包容的Word.Application代理对象


# csharp实现后期绑定调用AutoCAD

~~~ csharp
dynamic app;
dynamic doc;
try
{
    app=Interaction.GetObject(null,"AutoCAD.Application");
    doc=app.Documents.Add("AcadApp.dwt");
}catch(Exception e)
{
    app=Interaction.CreateObject("AutoCAD.Application");
    doc = app.ActiveDocument;
}
app.Visible = true;
~~~

据说以下方式也是可行的

~~~ csharp
AcadApplication acd = (AcadApplication)System.Runtime.InteropServices.Marshal.GetActiveObject("AutoCAD.Application");
~~~

# 深入学习

[C#与NET实战 第七章 反射、后期绑定与attribute](http://www.cnblogs.com/idior/articles/869204.html)


 


