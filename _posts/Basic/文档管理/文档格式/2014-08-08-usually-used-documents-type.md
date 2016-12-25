---
layout: post
title: 我的常用文档格式
categories: [文档格式]
group: PKM
tags: []
keywords: [文档格式]
description: 我的PKM工具，我的文档格式

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-20
---


# 简述

最近开始使用pkm整理个人资料，在pkm过程中总希望自己的文档能更容易使用程序自动处理，比如自动转换为网页、批量转换为pdf给其他人、在应用程序中调用等等。常用的office、pdf等格式虽然很强大，但是显得很笨重。因此，又根据个人需要对各种文档格式进行了学习和对比，最终挑选适合个人的文档格式。

> 为了方便处理，优先考虑了标记语言。
>
>> 常见的标记语言文档格式也分为SGML，XML等普通标记语言格式和markdown，troff，wiki等轻标记语言格式。
>
> 但是xml等并不方便编辑和阅读，所以优先考虑了轻标记语言。当然方便处理的xml语言可以用于程序处理。

# 我常用的文档格式

## 工作常用文档格式

+ office/docx
+ office/xlsx
+ office/pptx
+ pdf

## 日常常用文档格式

+ 源文档格式
    - markdown
    - mm(freemind)
+ 中间文件格式
    - docbook
    - flowdocument
+ 显示文件格式
    - html(chm)
    - latex(pdf)
    - xps
    - docx

> 个人编写markdown文档通常使用jekyll转换为html直接发布到github pages。
>
>>为了方便的转换markdown文档，个人通常使用pandoc将markdown，docbook文档转换为html，office，pdf等文件格式。
>
> docbook是我非常喜欢的格式，作为转换编程等格式，较少亲自编写。
>
> html主要用于将其他文档格式转换为html在网络上共享文档
>
> flowdocument文件实际上是xaml(wpf)，可以包含文本和控件；主要在编程时，用于在.net程序里展示。


## 非文本格式

+ pic/png, jpg, svg
+ drawing/dwg, dxf
+ model/sld, iges, step, 3dm
+ vector/visio,