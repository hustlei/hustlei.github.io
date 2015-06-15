---
layout: post
title: xml解析器、xslt转换工具
category: xml
group: IT
tags: []
keywords: [xml]
description: xml, xsl, xslt, xmlparser, xml解析器, xsl转换工具，msxml2.domdocument, microsoft.xmldom 

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-20
---

* 目录
{:toc}

# 常用xml解析器及xslt工具

+ xmlspy: 比较强大的xml编辑器（支持xslt调试）
+ Visual Studio 2013： 对格式支持很好（支持xslt调试）
+ [xsltproc](http://xmlsoft.org/xslt/xsltproc.html)：(libxslt的一个组件)：不支持xslt2.0及3.0
+ javascript & msxml：用JavaScript调用ActiveXObject对象编写xslt转换脚本
+ 浏览器：xml关联xslt后直接显示，不能输出转换后文件
+ [Xalan](http://xalan.apache.org)：Apache的子项目。
+ [Saxon](http://saxon.sourceforge.net)：实现了XSLT3.0、XQuery3.0和XPath3.0等规范

# xslt转换工具使用方法

+ xmlspy
    - xsl菜单，支持分步调试
+ visual studio
    - xml菜单，支持分布调试
+ xsltproc
    - `xsltpro xxx.xsl -o xxx.ext xxx.xml xxx2.xml`
    - `xsltpro xxx.xml -o xx.ext` xml文件关联了xsl文件时
    - 只支持xslt1.0
    - 是libxslt的组件，需要用到libxml
+ 浏览器
    - 在xml文件中添加`<?xml-stylesheet type="text/xsl" href="file.xsl"?>`关联样式表后，直接在浏览器中打开
+ xalan.jar
    - `java -classpath serializer.jar -jar xalan.jar -IN name.xml -OUT.name.html`
        * -IN：指定需要转换的XML；
        * -XSL：指定使用的XSLT样式单，如果在XML文档中已经引入了XSLT，则可省略此项；
        * -OUT：指定转换后输出的目标文档。
+ [Saxon](http://www.saxonica.com/html/documentation/using-xsl/commandline.html)
    - java版
        * `java net.sf.saxon.Transform -s:source -xsl:stylesheet -o:output`
        * `java  -jar dir/saxon9he.jar [options] [params]`
    - .NET版
        * `Transform -s:source -xsl:stylesheet -o:output`
        * `Transform source.xml stylesheet.xsl -o:output`

> 个人常用xmlspy和saxon .net版

# [JavaScript调用MSXML脚本](https://msdn.microsoft.com/en-us/library/ms761349(v=vs.85).aspx)

先看一个简单示例：

~~~ javascript
var xmldoc = new ActiveXObject("Microsoft.XMLDOM")
//因为调用的是Microsoft.XMLDOM对象，因此不支持xslt2.0
var xsldoc = new ActiveXObject("Microsoft.XMLDOM")
xmldoc.load("re.docbook")
xsldoc.load("docbook2xaml.xsl")
var content=xmldoc.transformNode(xsldoc)
~~~

Microsoft.XMLDOM实际上是调用了msxml，并且版本比较低，版本情况如下：

+ msxml ver 2
    - `var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");`   // msxml ver 2
    - `var xmlDoc = new ActiveXObject("MSXML.DOMDocument");`  // msxml ver 2
+ msxml ver 3
    - `var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");` // msxml ver 3
    - `var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.3.0");` // msxml ver 3
+ `var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.4.0");` // msxml ver 4
+ `var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.5.0 ");` // msxml ver 5
+ `var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");` //ver 6


~~~
var xmldoc = new ActiveXObject("Msxml2.DOMDocument.6.0")
var xsldoc = new ActiveXObject("Msxml2.DOMDocument.6.0")
xmldoc.load("books.xml")
xsldoc.load("book2html.xsl")
var content=xmldoc.transformNode(xsldoc)
~~~

也可以使用msxml的XSLTemplate对象

~~~
var xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
var xslProc;
var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.6.0");

xslDoc.load("book2html.xsl");
xslt.stylesheet = xslDoc;
xslProc = xslt.createProcessor();

xmlDoc.load("books.xml");
xslProc.input = xmlDoc;
xslProc.transform();

var content=xslProc.output;
WScript.Echo(content);
~~~


[msxml可调用方法](https://msdn.microsoft.com/en-us/library/ms757878(v=vs.85).aspx)

**MSXML缺点**

+ [MSXML6.0 也不支持xslt2.0](https://msdn.microsoft.com/en-us/library/ms757858(v=vs.85).aspx)


+ msxml的transform输出只能是unicode编码，但是可以用如下复杂方法解决

~~~ JavaScript
var xmlresult=new ActiveXObject("MSXML2.DOMDocument.6.0")
xml.loadXML(content)
var p=xmlresult.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"utf-8\"")
xmlresult.removeChild(xml.childNodes.item(0))
xmlresult.insertBefore(p,xml.childNodes.item(0))
xmlresult.save("save.xml")
~~~
