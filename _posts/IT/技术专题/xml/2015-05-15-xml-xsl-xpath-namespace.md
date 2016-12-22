---
layout: post
title: xml、xslt、xpath与xmlns/namespace
category: xml
group: IT
tags: []
keywords: [xml]
description: xml, xsl, xslt, xpath, namespace, xmlns, xsd, xsi, exclude-result-prefixes, xlink, xinclude, xmlschema-instance, schemalocation, noNamespaceSchemaLocation

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-12
---

* 目录
{:toc}

# xml与命名空间xmlns(xml namespace)

## xml与namespace/xmlns

在xml中，元素名称是由开发者定义的，两个不同的xml文档可能有相同的元素，当两个文档一起使用时，就会发生命名冲突。xml解析器就是通过命名空间来处理这类冲突的。具体方法是：

1. 定义命名空间：`xmlns:ns-prefix="http://www.xxx.com/uri"`,一个命名空间通常与一个xml定义相关联
2. 在相应xml元素前添加命名空间前缀:`<ns-prefix:element>`

例如：

~~~ xml
<h:table xmlns:h="http://www.w3.org/TR/html4/">
   <h:tr>
   <h:td>Apples</h:td>
   <h:td>Bananas</h:td>
   </h:tr>
</h:table>
~~~

每个xml文档可以有一个默认命名空间，该命名空间内的元素可以省略前缀，例如：

~~~ xml
<table xmlns="http://www.w3school.com.cn/furniture">
   <name>African Coffee Table</name>
   <width>80</width>
   <length>120</length>
</table>
~~~

## xmlschema/xsd 与namespace/xmlns

xml可以使用xmlschema/xsd定义xml元素，可以将xsd与xml的命名空间关联，也可以直接与xml关联，方便xml解析器验证xml文档，尤其是个人编写的xsd。有一些知名的xml命名空间(如：html,svg,mathml等)直接指定命名空间，不指定xsd文档一样可以验证，因为xml解析器已经带有这些模式文档(xsd)。

指定xsd文档需要用到XMLSchema-instance命名空间，具体用法如下：

+ xsd直接与xml文档关联，无命名空间

~~~ xml
<table 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="table.xsd">
~~~

+ xsd模式文档与命名空间关联

~~~ xml
<article xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://docbook.org/ns/docbook xsd/docbook.xsd">
~~~

> 可以同时关联多个xsd

~~~ xml
<article xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xi="http://www.w3.org/2001/XInclude"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://docbook.org/ns/docbook xsd/docbook.xsd
                             http://www.w3.org/1999/xlink xsd/xlink.xsd
                             http://www.w3.org/2001/XInclude xsd/xinclude.xsd">
~~~

## xslt与namespace/xmlns

xslt中一般涉及至少三个命名空间

1. xslt元素命名空间，一般以xsl为前缀
2. 目标文件命名空间，一般为默认命名空间
3. 源xml文件命名空间，用于xpath路径中指定转换的内容

+ 如果xml源文件没有指定命名空间，在xsl文件中一般不会出现问题。
+ 如果xml源文件中指定了命名空间
    - 在xsl文件中的xpath路径必须是相应命名空间的，以`pre:xxx/pre:xxx`形式出现
    - xsl文件中源文件命名空间不能是命名空间
    - 不这样做的话是没有办法正常输出目标文件的，一般所有源文件内容在目标文件中都会是空的

例如：（正确的文档）

xml源文件根元素
~~~ xml
<article xml:lang="zh-CN" xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xi="http://www.w3.org/2001/XInclude"
         xmlns:xlink="http://www.w3.org/1999/xlink">
~~~

xsl文档正确方法

~~~ xml
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:db="http://docbook.org/ns/docbook"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
<xsl:output method="xml" encoding="utf-8" indent="yes"/>

<xsl:template match="/">
  <FlowDocument>
  <Paragraph>
    <xsl:for-each select="db:article/db:sect1">
    <xsl:value-of select="db:para"/>    
    </xsl:for-each>
  </Paragraph>    
  </FlowDocument>
</xsl:template>
</xsl:stylesheet>
~~~

**避免在xslt文件的xpath路径元素前加前缀的方法**

+ 用xpath-default-namespace属性指定源文档命名空间（xsl version=“2.0”才支持的属性）

~~~ xml
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xpath-default-namespace="http://docbook.org/ns/docbook"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
<xsl:output method="xml" encoding="utf-8" indent="yes"/>

<xsl:template match="/">
  <FlowDocument>
  <Paragraph>
    <xsl:for-each select="article/sect1">
    <xsl:value-of select="para"/>    
    </xsl:for-each>
  </Paragraph>    
  </FlowDocument>
</xsl:template>
</xsl:stylesheet>
~~~

**避免xslt目标文件输出过多命名空间的方法**

+ 用`exclude-result-prefixes`属性

~~~ xml
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:p="http://www.test.com/product"
                xmlns="http://www.w3.org/1999/xhmtl"
                exclude-result-prefixes="p">
<!--目标文件的根元素中就只会出现xmlns="http://www.w3.org/1999/xhmtl"，否则命名空间p也会一起出现-->
~~~


# 常见xmlns/namespace地址与声明

+ xmlns:xsd="http://www.w3.org/2001/XMLSchema" xml模式文档
+ xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xslt，必须添加 version属性
+ xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xml模式文件关联
+ xmlns:xhtml="http://www.w3.org/1999/xhtml" XHTML
+ xmlns:mml="http://www.w3.org/1998/Math/MathML" MathML
+ xmlns:svg="http://www.w3.org/2000/svg" SVG
+ xmlns:xlink="http://www.w3.org/1999/xlink" XLink
+ xmlns:xinclude="http://www.w3.org/2003/xinclude" xml包含机制


隐式定义的命名空间

+ xml:
+ xmlns:http://www.w3.org/2000/xmlns/   XML namespaces
