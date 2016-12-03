---
layout: post
title: 电子文档格式及轻量级标记语言
category: 文档格式
group: PKM
tags: []
keywords: [文档格式, 标记语言]
description: 轻量级标记语言，微叙事，轻量级博客，wiki

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-12
---

* 目录
{:toc}

# 电子文档格式

随着计算机及网络的发展，我们更多的开始在生活和学习中应用电子文档来保存资料及创作。

+ 在保存及阅读时我们遇到比较多的文档格式包括：office, pdf, txt, epub等；
+ 为方便计算机进行文档处理和数据交换，很多时候又能接触到标记语言文档格式，如:XML, Latex, html, Docbook等，在编写程序的时候我们还可能用到yaml, JSON等格式；
+ 个人创作、博客系统、wiki以及程序员编写帮助文档又有很多方便创作的轻标记语言，如：wiki, markdown, reStructedText, Textile, Org-mode, AsciiDoc。

这些电子文档中多数以标记语言的形式出现，几十office格式，现在也都是标记语言格式，例如word的docx文档就是xml文件打包而成的。

# 标记语言简介

标记语言（markup language）是一种将文本（Text）以及文本相关的其他信息结合起来，同时展示关于文档结构和数据的文档格式。

轻量级标记语言(Lightweight Markup Language)用简单标记句法描述简单格式。其功能相对简单，编写也十分容易，具有很多优点：

+ 格式简单，源文件容易阅读和编辑。适合撰写笔记，使作者的注意力集中于撰写内容而非形式；
+ 纯文本有跨平台特性，适合网络传播。例如维基百科使用的MediaWiki语言就是轻量级标记语言的一种。
+ 采用轻量级标记语言的文档很容易转换为更重量级的其他文档，例如 PDF/Tex/HTML等，被很多软件网站用来制作文档，例如python的官方文档采用reStructuredText语言。
+ 应用程序中使用轻量级标记语言的一个目的是使得用户能够像阅读编译后的结果一样阅读原始文档。
+ 另外一个应用场景是网络出版，例如在博客和wiki。

近年来轻标记语言在各个领域蓬勃发展（我个人也用轻标记语言整理个人文档）。如：

+ github用户熟悉的markdown
+ Python程序员熟悉的reStructedText
+ Ruby程序员熟悉的Textile、RDoc
+ Perl程序员熟悉的POD
+ Emacs用户熟悉的Org-mode
+ 维基用户所熟悉的MediaWiki和Creole
+ 可作为DocBook前端的颇有前途的AsciiDoc标记语言

# 标记语言历史

+ 标记语言简史
    - 1971，troff，Bell Labs
    - 1978，TeX，Donald Knuth
    - 1980初期，LaTeX，Leslie Lamport
    - 1982，PostScript，John Warnock和Charles Geschke（Adobe Systems）
    - 1986，SGML，ISO 8879:19861
    - 1991，HTML，Tim Berners-Lee
    - 1991，DocBook，HAL Computer Systems和O'Reilly & Associates
    - 1998，XML 1.0，W3C
+ 轻量级标记语言时代
    - 1998，BBCode，Ultimate Bulletin Board
    - 2001，txt2tags，txt2tags team
    - 2002，reStructuredText，David Goodger
    - 2002，AsciiDoc，Stuart Rackham
    - 2002, Wiki
    - 2004，Markdown，John Gruber

事实上轻量级标记语言有很多，它们在很多地方有相似的地方，比如都有多级标题、列表、强调等格式，甚至有不少语言在某些表达方式上是兼容的，同时也有不少差异，编辑器及转换工具差异更大，轻量级标记语言之间有很多可以相互转换。并且有不少轻量级标记语言本身也有很多版本，比如markdown就有标准版、github版、php增强版、pandoc版等。主要轻量级标记语言有：

+ AsciiDoc
+ AFT
+ BBCode
+ Creole
+ Crossmark
+ Deplate
+ Epytext
+ EtText
+ Haml
+ JsonML
+ MakeDoc
+ Markdown
+ Org-mode
+ POD
+ reST
+ RD
+ Setext
+ SiSU
+ SPIP
+ Xupl
+ Texy!
+ Textile
+ Textinfo
+ txt2tags
+ UDO
+ Wiki

另外，还有一些轻量标记语言以数据为中心，即面向数据的标记语言，它们更多的应用于存储数据、数据表、数据对等，在文档及文档格式方面不侧重，主要有：

+ Curl
+ JSON
+ OGDL
+ SDL
+ YAML

# 常见标记语言简述

## [troff](http://www.gnu.org/software/groff/#documentation)

troff是Unix手册的缺省格式。troff是一个由AT&T为Unix开发的文字处理软件。GNU项目重新编写了该软件，起名为groff。troff格式相对复杂，学习曲线陡峭，示例如下：

~~~ troff
.TL
A basic title
.NH 1
Heading at level 1
.NH 2
Heading at level 2
.LP
First paragraph
body
~~~

## [Tex/Latex](http://www.ctex.org/OnlineDocuments)

Tex是由美国著名计算机教授高德纳(Donald Ervin Knuth)编写的功能强大的排版软件。它在学术界十分流行，特别是数学、物理学和计算机科学界，很多国际知名杂志发表文章均是用Tex的改进版本Latex。Donald最早开始自行编写TEX的原因是当时十分粗糙的排版水平已经影响到他的巨著《计算机程序设计艺术》的印刷质量。他以典型的黑客思维模式，最终决定自行编写一个排版软件：TEX。

LaTeX构筑在Tex基础上，是当今世界上最流行和使用最为广泛的TeX宏集。使用LaTeX基本上不需要使用者自己设计命令和宏等，因为LaTeX已经替你做好了。即使使用者并不是很了解TeX，也可以在短短的时间内生成高质量的文档。其排版功能十分强大，对于生成复杂的数学公式，LaTeX表现的更为出色。但是其系统庞大、难学、标记冗长、太过复杂，不太容易掌握，个人常用其公式部分在轻标记语言中。

简单示例如下：

~~~ tex
\documentclass[a4paper,12pt,landspace]{ctexart}
\setmainfont{Times New Roman}
\setsansfont{Arial}
\setmonofont{Consolas}
\setCJKmainfont[BoldFont=黑体,ItalicFont=楷体]{宋体}
\setCJKsansfont{黑体}
\setCJKmonofont{楷体}
\title{标题}
\author{lilei}
\date{2014.5}

\begin{document}
\maketitle
\newpage
\tableofcontents

\section{标题1}
测试段落，
\subsection{标题1.1}

\section{标题2}

\end{document}
~~~

## [SGML](http://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language)

标准通用标记语言（SGML）是标准化的通用标记语言(GML)，是一种定义电子文档结构和描述其内容的国际标准语言。它具有极好的扩展性，在数据分类和索引中非常有用，是所有电子文档标记语言的起源，早在万维网发明之前“通用标记语言”就已存在。但是由于SGML的高复杂性和高昂费用，主要在大型公司、系统内应用，并因此导致了XML（SGML的子集）的出现及广泛应用。

SGML由标签（标签在尖括号内）和内容组成，大家所熟悉的html就是SGML的一种实现，SGML更加通用，扩展性更好，简单示例如下：

~~~ xml
<!DOCTYPE　示例 　PUBLIC　"-//示例//DTD　示范范例//ZH">
<元素　类型="例子">
 　正文具体内容
 　<附属元素>附属元素里头的具体内容</附属元素>
 　正文具体内容
</元素>
~~~

## [XML](http://www.w3school.com.cn/xml/)

XML是SGML的子集，语法与SGML相似，它非常适合万维网传输，提供统一的方法来描述和交换独立于应用程序或供应商的结构化数据。

## [DocBook](http://www.docbook.org/docs/)

DocBook是一个描述型的标记语言，是XML的一种应用，它用不同的xml标签表示文档的章节、段落、强调、引用等文档结构。它从一开始就是面向机器的（方便计算机处理）因为它具有了**很强的格式和语义**。。ESR说，DocBook有两个真正有趣的用途，一个是生成其他各种格式的文件，另一个是构成可搜索的文档数据库。

另一方面，它就非常重量级，含有417个标签，非常繁琐冗长，手写很困难。而且XML标准规定，导致如果出现手误而产生XML致命错误，那么整个文档就没法解释了。

简单示例如下：

~~~ xml
<article xml:lang="zh-CN" xmlns="http://docbook.org/ns/docbook" version="5.0">
  <info>
    <title>设计需求</title>
  </info>
  <sect1>
    <title>简介</title>
    <para>
      <emphasis role="strong">设计需求</emphasis>部分主要以信息收集为主，包括客户使用需求、想法，使用环境限制，设计潮流趋势，参考设计资料等。
    </para>
    <sect2>
      <title>ceshi</title>
      <para>设计分析原则适用、经济、安全、可靠、美观、先进，从用户角度出发，重视体验。</para>
    </sect2>
  </sect1>
</article>
~~~

# 常见轻量级标记语言简述

## [wiki](http://zh.wikipedia.org/wiki/Wikipedia:%E6%A0%BC%E5%BC%8F%E6%89%8B%E5%86%8C)

wiki是维基百科的默认源文档格式，但是wiki本身也有很多版本，比如维基百科使用的wiki系统MediaWiki、桌面dokuwiki版等等。

简单wiki示例如下：

~~~ wiki
== 一级标题 ==

您可以使用''段落标题''来更好地编排文章结构。
维基的软件会自动将文章中的标题生成一个目录。

=== 二级标题 ===

输入更多的“等于号”(=)可以创建更多下一级标题。

==== 三级标题 ====

*符号列表很不错：
**每一行用一个星号（*）开始
***星号越多，表示列表的层级更深入
****新起一行
~~~

## [markdown](http://www.appinn.com/markdown/index.html)

Markdown是一个追求极简的标记语言，但是经过Github、pandoc等扩展后也十分好用。目前Markdown在互联网上很流行，有一些大型用户，比如Stack Overflow、Reddit、GitHub、Posterous、Tumblr（这两个已被GFW认证）。虽然这个语言很简单，但也有人用这个语言写了一本书：《Pro Git》。

其简单示例如下：

~~~ markdown
# Chapter 1

Lorem ipsum!

Dolor sit amet, consectetur _adipisicing_ elit.

## Section 1

+ this is a list
+ list line 2
+ list line 3

## Section 2

> Laboris nisi ut aliquip ex ea commodo consequat!
~~~

## [reStructuredText](http://www.pythondoc.com/sphinx/rest.html)

reStructuredText（rST）是一个丰富可扩展，但又易读、所见即所得的纯文本标记句法。目前正试图成为Python的文档规范。

简单示例如下：

~~~ rst
Chapter 1
=========

Lorem ipsum!

Dolor sit amet, consectetur *adipisicing* elit.

Section 1
---------

Et dolore magna aliqua.Ut enim ad ``minim veniam``.
~~~

## [AsciiDoc](http://www.methods.co.nz/asciidoc/userguide.html)

漂亮的文本文档格式用于写作。

给个简单示例如下：

~~~ asciidoc
The Article Title
=================
Author's Name <authors@email.address>
v1.0, 2003-12

The First Section
-----------------
Article sections start at level 1 and can be nested up to four levels.

The Second Section
------------------
Article sections are at level 1 and can contain sub-sections nested up
to four deep.
~~~

## [Textile](http://redcloth.org/textile)

textile是ruby的帮助文档格式。

简单示例如下：

~~~ textile
h1. This is a Heading 1

This might be an introductory paragraph on the general topic.

h2. Heading 2 gets more specific

Now we're getting into the details.
~~~

## [Org-mode](http://orgmode.org/)

Org-模式（Org-mode）是文本编辑软件Emacs的一种支持内容分级显示的编辑模式。

~~~ org-mode
* Top level headline
** Second level
*** 3rd level
    some text
*** 3rd level
    more text
  
* Another top level headline
~~~

## [POD](http://cn.perlmaven.com/pod-plain-old-documentation-of-perl)

POD(Plain Old Documentation)是Perl的文档格式标准。

~~~ pod
=head1 Title
=head2 Subtitle
Some Text
=cut
~~~

## [Textinfo](http://www.gnu.org/software/texinfo/manual/texinfo/html_node/)

textinfo是Linux系统提供的另外一种格式的帮助信息，是当前gnu项目文档格式。和man相比，textinfo具有更好交互功能。它支持链接跳转功能，通常使用info和pinfo命令来阅读textinfo文档。

~~~ textinfo
@c %**start of header
@setfilename sample.info
@settitle Sample Manual 1.0
@c %**end of header

@titlepage
@title Sample Title
@end titlepage

@menu
* First Chapter::    The first chapter is the
                      only chapter in this sample.
* Index::            Complete index.
@end menu


@node First Chapter
@chapter First Chapter

@cindex chapter, first

This is the first chapter.
@cindex index entry, another

@bye
~~~


# 格式选择及工具

总的来说，普通标记语言相对重量级，但是功能强大，轻量级标记语言简单易用可读性好，工具简单也比较多。在实际应用中，根据不同需求进行选择，建议选择简单、易于转换、工具强大的格式。如果是个人创作文档的话，建议使用轻量级标记语言。个人就常用markdown作为文档格式，xml、docbook作为数据交换格式，latex作为公式格式。

## 文档转换工具

[Pandoc](http://pandoc.org/)可以对多种轻量级标记语言进行处理，号称文档处理的瑞士军刀。它可以在多种格式之间进行转换，具体支持情况如下：

+ 输入格式
    - markdown/markdown_phpextra/markdown_github/markdown_mmd
    - mediawiki/twiki
    - docbook
    - latex
    - textile
    - rst
    - org
    - haddcok
    - commonmark
    - json
    - html
    - opml
    - epub
    - docx
    - t2t
+ 输出格式
    - markdown/markdown_phpextra/markdown_github/markdown_mmd
    - mediawiki/dokuwiki
    - docbook
    - latex
    - textile
    - rst
    - org
    - haddock
    - commonmark
    - json
    - html/html5/s5/slidy/slideous/dzslides/revealjs/beamer
    - opml
    - epub/epub3
    - docx
    - odt/opendocument
    - rtf
    - plain
    - man
    - texinfo
    - asciidoc
    - fb2
    - icml
    - contex



# 参考资料

+ [轻量级标记语言维基百科](http://en.wikipedia.org/wiki/Lightweight_markup_language)
+ [Micro Narrative轻量级文档写作](http://stdio.tumblr.com/lightdoc)
+ [轻量级标记语言简介](http://www.worldhello.net/gotgithub/appendix/markups.html)
+ [Wiki格式列表](http://en.m.wikipedia.org/wiki/Desktop_Wiki)