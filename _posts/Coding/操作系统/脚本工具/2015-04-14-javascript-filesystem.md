---
layout: post
title: javascript/jscript文件操作
category: 操作系统
group: Coding
tags: [脚本工具]
keywords: [JavaScript, jscript, windowshost]
description: windows 宿主， javaScript, ActivXObject, FileSystemObject, AdoDB.Stream

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-20
---

* 目录
{:toc}

# javascript脚本在windows上的文件操作

javascript(在windows上微软称为jscript)可以通过创建ActiveXObject对象调用com对象，从而实现脚本以外更多的功能。

> 因为安全性原因，在网页内ActivXObject可能会受到一定限制
> 
> 但是单独的JavaScript或VBScript脚本在windows上可以通过windows宿主独立运行，即保存为xx.js或xx.vbs直接双击即可。

在windows上有两个ActiveXObject对象可以方便的操作文件：

+ FileSystemObject (只支持ansi和utf-16编码)
+ AdoDB.Stream

另外MSXML也可以保存xml文件

# JavaScript通过FileSystemObject操作文件

> FileSystemObject只支持ansi和unicode(utf-16)编码，不能读写utf-8文档

FileSystemObject（FSO）对象包含在Scripting类型库 (Scrrun.Dll）中,在Scripting 类型库 (Scrrun.Dll）中，包含了Drive、Folder、File、FileSystemObject和TextStream五个对象，但是FSO实际上是直接操纵其他对象的，也就是说FSO可以实现其他几个对象的所有操作。

FileSystemObject写文件示例

~~~ javascript
var fso= new ActiveXObject("Scripting.FileSystemObject")
//CreateTextFile三个参数分别为：文件名，是否覆盖，是否unicode编码
f=fso.CreateTextFile("music.html",true,true)
f.Write(content)
f.Close()
~~~

## FSO常用方法列表

+ 文件夹信息（执行通用文件夹任务的方法）Folder对象也有对应方法
    - FileSystemObject.CreateFolder	创建文件夹。
    - FileSystemObject.DeleteFolder	删除文件夹。
    - FileSystemObject.MoveFolder	移动文件夹。
    - FileSystemObject.CopyFolder	复制文件夹。
    - FileSystemObject.FolderExists	确定驱动器上是否存在某文件夹。
    - FileSystemObject.GetFolder 获取现有Folder对象的实例。
    - FileSystemObject.GetParentFolderName	找出文件夹的父文件夹名。
    - FileSystemObject.GetSpecialFolder	找出系统文件夹的路径。
+ 顺序文本文件和FSO

    > 在要读取 FileSystemObject 对象内文件的内容时，顺序文本文件（有时称为“文本流”)非常有用。可用下列这些方法访问顺序文本文件：

    - CreateTextFile、OpenTextFile 或 OpenAsTextStream 创建顺序文本文件。
    - Write 或 WriteLine	向文本文件添加数据。
    - Read、ReadLine 或 ReadAll	从文本文件读取数据。
    - File.Move 或 MoveFile	移动文件。
    - File.Copy 或 CopyFile	复制文件。
    - File.Delete 或 DeleteFile

# JavaScript通过AdoDB.Stream操作文件

> AdoDB.Stream可以读写不同编码的文件(也可以是url流），包括二进制数据。

Stream 对象用于表示二进制数据流或文本流。使用Stream对象可以为数据库应用程序很方便地添加图像数据。

+ Open 方法从 Record 或 URL 打开 Stream 对象。
+ Type 属性确定 Stream 中的数据类型。
    - 设置或返回 StreamTypeEnum 值
    - 默认值为 adTypeText。
    - 如果二进制数据最初被写入新的空Stream 中，Type将被更改为 adTypeBinary。
+ Mode 属性指定 Stream 的访问模式
    - adModeRead =1
    - adModeReadWrite =3
    - adModeRecursive =4194304
    - adModeShareDenyNone =16
    - adModeShareDenyRead =4
    - adModeShareDenyWrite =8
    - adModeShareExclusive =12
    - adModeUnknown =0
    - adModeWrite =2
+ Charset 指定输出或保存文件用的字符编码。
    - 默认值为Unicode。事实上，Stream对象内部使用的也是Unicode编码，在指定Charset后，在保存文件时文件编码会转换成指定的编码。
+ Close() 关闭Stream。（在VB中，关闭后需要将对象变量设为Nothing释放内存）
+ Read(NumBytes)  从二进制Stream对象读取指定的字节数
    - NumBytes为可选值，默认为adReadAll
+ ReadText(NumChars)  从文本Stream中读取指定书目的字符
    - NumChars为可选值，默认为adReadAll
+ Write(Buffer)  将二进制数据写入Stream对象
    - Buffer 要写入的字节数组
+ WriteText(data,Options) 将指定的文本字符串写入Stream对象
    - data string: 要写入的字符文本
    - Option可选。指定是否在指定字符串结尾写入分行符
        * adWriteChar =0
        * adWriteLine =1
+ SaveToFile(filename, saveOption)  保存文件
    - saveOption可选，默认为1
        * adSaveCreateNotExist =1
        * adSaveCreateOverWrite = 2
+ LoadFromFile(filename) 加载文件中的数据

+ Position 属性控制 Stream 中的当前位置。
+ Size 属性确定 Stream 中的字节数。
+ State 属性确定 Stream 的当前状态（已打开、关闭或正在执行）
+ Cancel 方法终止异步 Stream 操作。
+ Flush 方法将仍在 ADO 缓冲区中的任何 Stream 数据写入基本对象。
+ CopyTo 方法将 Stream 的内容复制到另一 Stream。
+ SkipLine方法和 LineSeparator 属性控制从源文件中读取行的方式。
+ EOS 属性和 SetEOS 方法确定流位置的结尾。


~~~ javascript
var content="string..."
var stm = new ActiveXObject("adodb.Stream")
stm.Type=2 //adTypeText, 文本数据
stm.Mode=3 //adModeReadWrite,读写
stm.Charset="utf-8"
stm.OPen()
stm.WriteText(content)
stm.SaveToFile("abc.txt",2) //adSaveCreateNotExist =1 adSaveCreateOverWrite =2 
stm.Close()
~~~

# MSXML保存xml文件

~~~ javascript
var content="<?xml version='1.0'?>\n"
     +"<doc title='test'>\n"
     +"  <page num='1'>\n"
     +"    <para title='Saved at last'>\n"
     +"       This XML data is finally saved.\n"
     +"    </para>\n"
     +"  </page>\n"
     +"  <page num='2'>\n"
     +"    <para>\n"
     +"       This page is intentionally left blank.\n"
     +"    </para>\n"
     +"  </page>\n"
     +"</doc>\n"
var xml=new ActiveXObject("MSXML2.DOMDocument.6.0")
xml.loadXML(content)
xml.save("save.xml")
~~~