---
layout: post
title: docbook文档格式
category: 文档格式
group: PKM
tags: []
keywords: [docbook, 电子文档]
description: docbook文档格式

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-25
---

* 目录
{:toc}

# docbook简介

docbook实际上是一种xml格式文件，它定义了一种用xml描述书籍、文章的逻辑结构的方式。它用标签描述了文档的结构和语义，而不是文档的样式。

DocBook提供了一个写作结构化文档的很好的系统，特别适合计算机技术方面的文档，当然，也可应用于其他方面。DocBook已被众多组织应用。特别的，大量开源项目将其作为文档的标准格式，包括Linux 内核, GNOME, KDE, Samba, 以及 Linux Documentation Project。

docbook按照文章书籍的逻辑将元素分为7个层次

+ Set //集，相当于丛书，可以包含多个book，不常用
    - Book  //书，
        * Part  //部分，篇，book可以跳过part直接包含article、chapter
            + Article/Chapter  //文章，章节可以作为根标签
                 - Section  //章节
                     * info element  //section及以上元素的元信息，如标题等
                     * Block element //段落、列表、公式等
                         + Inline element //强调、脚注、链接等


+ 和chapter平行的几个标签
    - preface(序言)
    - appendix(附录)
    - dedication(感谢)

    > 和chapter平级，可以看作第一個chapter及最後一個chapter，并且可以作为根标签 
+ 特殊的章节标签
    - toc（目录）
    - index(索引)
    - bibliography(参考目录)
    - glossary(词条解释)
    - qandaset(问答集)

    > 这些标签可以作为Chapter、Section的子标签，也可以直接作为book、part的子标签，并可以作为根标签

# docbook常用标签

## 根标签

### DocBook常用根标签

+ book：书

    book并没有一定大小的要求，与一般书籍观念相似，集合几个章节，谈一些相关但分类的内容。
+ chapter：章

    chapter是book或part的子标签，但一般常用作讨论某个单一主题文件的根标签，或作为单一文件编辑，通过插入技术最终多个文件集合为一个book。
+ article：主题文章

    在使用习惯上article比chapter更常用来作为根标签，它代表单一主题的单一文章，chapter一般用数个章去描述一个主题。

> book的上层标签set、part也可以作为根标签。

> chapter的平行标签preface(序言)、appendix(附录)也可以作为根标签

> 特殊的章节标签index(目录索引)、bibliography(参考目录)、glossary(词条解释)、qandaset(问答集)也可以作为根标签。同时，它们即可是chapter/article的子标签，也可以直接是book的子标签。

### 根标签写法

> docbook有两种模式(定义方式)，即SGML和XML，文件结构上并没有区别，只是在schema文件、处理程序上有区别。在本文中所有写法以XML为准，不提及SGML，并且XML模式也仅用schema形式不提及DTD方式。

#### xml声明

docbook作为xml文件时，在根标签前必须有一个xml声明。

~~~ xml
<?xml version="1.0" encoding="utf-8"?>
~~~

version="1.0"表示XML的版本是1.0，而encoding="utf-8"则表示文档的编码是utf-8。

如果你的文档采用XML 1.0，编码使用utf-8或者utf-16, 那么XML声明可以省略，当然，不省略也没错。

> 建议使用utf-8编码

#### docbook命名空间

根标签中需要加入默认命名空间和版本信息，如下：

~~~ xml
<article xmlns="http://docbook.org/ns/docbook" version="5.0" xml:lang="zh_cn">
~~~

docbook是一个[OASIS标准](http://www.oasis-open.org/specs/#dbv5.0)由该组织的DocBook Technical Committee维持的[RELAX NG Schemas](http://www.docbook.org/schemas/)作为docbook的模式，其命名空间是`http://docbook.org/ns/docbook`。5.0才开始支持xml标准，因此必须添加版本信息。

> 标签中的xml:lang="zh_cn"，这是正确生成中文文档的关键。

如果引用本地模式文件，或者指定某个命名空间schema文档的位置，可以使用xsi:schemaLocation属性。

示例如下：

~~~ xml
<article xml:lang="zh-CN"
         xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://docbook.org/ns/docbook xsd/docbook.xsd>
~~~

xsi:schemaLocation属性的值由一个URI引用对组成，两个URI之间以空白符分隔。第一个URI是名称空间的名字，第二个URI给出模式文档的位置，模式处理器将从这个位置读取模式文档，该模式文档的目标名称空间必须与第一个URI相匹配。上例中就指定docbook默认命名空间的模式文件为本地xsd文件夹下的docbook.xsd文件(官方网站上下载的)

xsi:schemaLocation属性的值也可以由多个URI引用组成，每个URI引用对之间用空白符分隔。详见本文后述完整示例。

#### 文档引用技术的命名空间

docbook或其他xml文档常用到xlink，svg，mathml等技术，因此需要的时候也可以引用这些命名空间。

+ xlink
    - xmlns:xlink="http://www.w3.org/1999/xlink"
+ svg
    - xmlns:svg="http://www.w3.org/2000/svg"
+ mathml
    - xmlns:m="http://www.w3.org/1998/Math/MathML"

**XInlude 技术**可以插入外部xml文件或将多个文档合并，示例如下：

~~~ xml
<book xmlns="http://docbook.org/ns/docbook"
xmlns:xi="http://www.w3.org/2001/XInclude">
<title>我的第一本书</title>
<xi:include href="ch1.xml"/>
<xi:include href="ch2.xml"/>
<xi:include href="ch3.xml"/>
<xi:include href="ch4.xml"/>
</book>
~~~

#### 较为完成的根标签示例

> 实际中，根据需要添加根标签相关属性，不需要全部像如下方式写。

~~~ xml
<article xml:lang="zh-CN"
         xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:m="http://www.w3.org/1998/Math/MathML"
         xmlns:svg="http://www.w3.org/2000/svg"
         xmlns:xi="http://www.w3.org/2001/XInclude"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://docbook.org/ns/docbook xsd/docbook.xsd
                             http://www.w3.org/2001/XInclude xsd/xinclude.xsd">
~~~

## 章节标签

章元素

+ chapter(章)
+ preface(序言)
+ appendix(附录)
+ dedication(感谢)

> preface, appendix, dedication可以看作特殊的chapter，或者第一個chapter及最後一個chapter。

节元素有好几种

+ sect1...sect5总共五层，可以一层层嵌套，但是必须由高到低。 
+ section，可以无限地嵌套
+ simplesect，不能嵌套
+ bridgehead，只有标题而无内容的section
+ refsect1...refsect3，和sect1, sect2 ~ sect5类似，用于refentry（参考条目）中
+ glossdiv, bibliodiv 和 indexdiv，分别用于词汇定义、参考书目和索引，不可嵌套。

简单示例

~~~ xml
<chapter><title>章</title>
  <para>章引言... </para>
  <sect1><title>sect1 标题</title>
    <para>sect1 文字段落...</para>
    <sect2><title>sect2 标题</title>
     <sect3><title>sect3 标题</title>
        <sect4><title>sect4 标题</title>
          <para>sect4 文字段落...</para>
          <sect5><title>sect5 标题</title>
            <para>sect5 文字段落...</para>
          </sect5>
        </sect4>
      </sect3>
    </sect2>
  </sect1>
</chapter>
~~~

+ 特殊的章节标签
    - toc（目录）
    - index(索引)
    - bibliography(参考目录)
    - glossary(词条解释)
    - qandaset(问答集)

    > 这些标签可以作为Chapter、Section的子标签，也可以直接作为book、part的子标签，并可以作为根标签

目录几乎总是由处理程序自动从文档的文本中生成。如果需要自定义目录的话，就可以用toc标签。

自定义目录示例

~~~ xml
<toc>
  <title>Table of Contents</title>
  <tocdiv>
    <title>Preface</title>
    <tocentry>Why Read This Book?</tocentry>
    <tocentry>This Book's Audience</tocentry>
    <!-- ... -->
  </tocdiv>
  <tocdiv>
    <title>Part I. Introduction</title>
    <tocdiv>
      <title>Chapter 1. Getting Started with DocBook</title>
      <tocdiv>
        <title>A Short DocBook History</title>
        <tocentry>The HaL and O'Reilly era</tocentry>
        <tocentry>The Davenport era</tocentry>
        <tocentry>The OASIS era</tocentry>
      </tocdiv>
      <tocdiv>
        <title>DocBook V5.0</title>
        <tocdiv>
          <title>What's New in DocBook V5.0?</title>
          <tocentry>Renamed and removed elements</tocentry>
          <!-- ... -->
        </tocdiv>
      </tocdiv>
    </tocdiv>
    <tocdiv>
      <title>Chapter 2. Creating DocBook Documents</title>
      <tocdiv>
        <title>Making an XML Document</title>
        <tocentry>An XML Declaration</tocentry>
        <!-- ... -->
      </tocdiv>
    </tocdiv>
  </tocdiv>
</toc>
~~~

> tocdiv相当于各级章节的目录

## 元信息元素

所有位于section层及以上的元素，以及另外一些元素，可以包含元信息元素，即<info>标签。

info标识元信息区域，info标签内常用元素有：

+ title（标题）
+ titleabbrev（标题缩略）
+ subtitle（副标题）
+ abstract（摘要）
+ keywordset（关键词）
+ authorgroup（作者群）
+ author（作者）
    - personname
        * firstname
        * surname（lastname）
        * lineage
    - address
    - email
    - personblurb(个人介绍)
+ address（地址）
+ date（日期）
+ copyright（版权信息）
    - year
    - holder
+ edition（版本）
+ revhistory（修订历史）
    - revision（修订记录）
        * revnumber（修订号）
        * revremark（修订说明）
        * editor（编辑人）
        * date
+ editor（编辑人）

还有很多其他的标签，但是对于个人文章来说一般应用较少，包括：orgname（组织名称），pubdate（出版日期），publisher（出版者），publishername（出版者名称），releaseinfo（发布信息），annotation（注），artpagenums（出版时使用的页码），authorinitials（作者姓名缩写或其他较短的标识），bibliocoverage（涉及的时空范畴），biblioid（文档标识），bibliomisc（其他信息），bibliomset（组织好了的相关书目信息），bibliorelation（与其他文档的关系），biblioset（原始形态的的相关书目信息），bibliosource（文档来源），collab（协作者），confgroup（关于会议的元信息），contractnum（文档的条款数），contractsponsor（条款的发起人），extendedlink（XLink extended link），issuenum（期数，用于杂志），itermset（术语索引），legalnotice（法律声明），mediaobject（媒体对象，例如录象、音频、图像），othercredit（贡献者），pagenums（页码，用于参考条目），printhistory（印刷纪录），productname（产品名），productnumber（产品号），，seriesvolnums（卷数，用于丛书），subjectset（描述文档主题的术语），volumenum（卷数，用于文集）。

简单示例如下：

~~~ xml
<info>
    <title>title</title>
    <subtitle>manual</subtitle>
    <author>
        <personname><firstname>Jane</firstname><surname>Doe</surname></personname>
    </author>
    <edition>1 edition</edition>
    <revhistory>        <!--修订记录-->
        <revision>
            <revnumber>1</revnumber>
            <date>2014/3/28</date>
            <editor><personname>hustlei</personname></editor>
            <revremark>第一次编辑</revremark>
        </revision>
    </revhistory>
    <copyright>
        <year>2013</year>
        <year>2014</year>
        <holder>lileilei</holder>
    </copyright>
</info>
~~~

## Block元素

> 通常我们把和文档结构关联紧密的元素(段落、列表、表格等)叫做块级(Block)元素，把和文本关联紧密的元素(强调、引用等)叫做内联(Inline)元素。


### 段落

+ para（段落）：para可包含其他块元素，包括bridgehead标签，但不能直接包含para标签
+ simpara（简单段落，不可包含其他块元素）
+ formalpara（带标题的段落）
    - title
    - para（仅能有一个）

### 告示

+ caution（注意）
+ important（重要提示）
+ note（备注）
+ tip（窍门）
+ warning（警告）

每个标签都可以含有一个title和多个块元素，简单示例如下：

~~~ xml
<note>
    <title>Upcoming Changes</title>
    <para>Future versions of this feature may not be backward compatible.Consider implementing the revised interface now.
    </para>
</note>
~~~

### 列表

+ itemizedlist（无序列表）
+ orderedlist（有序列表）
+ variablelist（定义列表/名词解释）
+ simplelist（简单列表）

> 每种列表都可以有一个title标签

无序列表可以指定标记mark

~~~ xml
<itemizedlist mark='opencircle'>
  <listitem><para>TeX and LaTeX</para></listitem>
  <listitem override='bullet'><para>Troff</para></listitem>
  <listitem><para>Lout</para></listitem>
</itemizedlist>
~~~

有序列表可以指定序号形式（arabic，upperalpha，loweralpha，upperroman，lowerroman）

~~~ xml
<orderedlist numeration="lowerroman">
  <listitem><para>One</para></listitem>
  <listitem><para>Two</para></listitem>
  <listitem><para>Three</para></listitem>
  <listitem><para>Four</para></listitem>
</orderedlist>
~~~

定义列表主要用于名词解释

~~~ xml
<variablelist>
  <title>Font Filename Extensions</title>
  <varlistentry>
    <term>TTF</term>
    <listitem><para>TrueType fonts.</para></listitem>
  </varlistentry>
  <varlistentry>
    <term>PFA</term>
    <term>PFB</term>
    <listitem>
      <para>
        PostScript fonts. <filename>PFA</filename> files are common
        on <acronym>UNIX</acronym> systems, <filename>PFB</filename>
        files are more common on Windows systems.
      </para>
    </listitem>
  </varlistentry>
</variablelist>
~~~

> term可以直接包含文本或其他块元素，listitem不能直接包含文本。

简单列表只是分行显示，每行前不加小图示(如小圆点)

~~~ xml
<chapter><title>唐詩選粹</title>
  <simplelist>
    <member>渭城朝雨浥輕塵</member>
    <member>客舍青青柳色新</member>
    <member>勸君更進一杯酒</member>
    <member>西出陽關無故人</member>
  </simplelist>
</chapter>
~~~

> 还有一些其他列表形式：calloutlist（callout列表）、bibliolist（书目列表）、glosslist（词汇列表）、segmentedlist（成分列表）


### 图片、表格及示例

> formal和informal格式标签的差别在于是否包含标题。informalxxx没有title子标签。

#### figure, informalfigure

figure标签通常包含mediaobjects和caption标签，并且，经常给出id方便xref和link链接引用。

简单示例如下：

~~~ xml
<informalfigure>
  <mediaobject>
    <imageobject condition="print">
      <info>
        <author>
          <personname>Norman Walsh</personname>
        </author>
      </info>
      <imagedata fileref="figs/print/db5d_ref10.pdf" format="PDF" role="keep-together"/>
    </imageobject>

    <imageobject condition="web">
      <imagedata fileref="figs/web/db5d_ref10.png" format="PNG"/>
    </imageobject>

    <textobject>
      <phrase>Wat Arun</phrase>
    </textobject>

    <caption>
      <para>
        Wat Arun, Temple of the Dawn, on the Chao Phraya
        River in Bangkok, Thailand. In April 1998, Wat Arun was in the
        midst of renovation.
      </para>
    </caption>
  </mediaobject>
</informalfigure>
~~~

#### table, informaltable。 

> DocBook表格为[CALS表格](https://www.oasis-open.org/specs/a502.htm)，同时也支持HTML表格。 

+ table：表格
    - title：informaltable没有
    - info：块元素共有的元素
    - tgroup：表格主体，可以有多个
        * colspec：空标签，给相应的列赋予名称和其他属性，以作为同表中entry引用是的参考，多用在跨列单元中
        * spanspec：暂时不知道怎么用
        * thead：表头行
            + colspec：可以没有
            + row：行
                - entry:一个表格单元，相当于cell，可以包含块元素(list,para等),也可以直接包含文本
        * tfoot
            + colspec：可以没有
            + row
                - entry
        * tbody
            + row
                - entry
    - caption：标题，docbook5才开始支持的

> 每个entry都可以是entrytbl（子表格），entrytbl子标签有colspec，spanspec，thead，tbody。

CALS表格示例

~~~ xml
  <table><title>PC系统估价单</title>
    <tgroup cols="5">       
      <thead>
        <row>
          <entry>品名</entry>
          <entry>鴻騎</entry>
          <entry>華梭</entry>
          <entry>紅海</entry>
          <entry>備註</entry>
        </row>
      </thead>
      <tbody>
        <row>
          <entry>主机</entry>
          <entry>6500</entry>
          <entry>7000</entry>
          <entry>4500</entry>
        </row>
        <row>
          <entry>硬盘</entry>
          <entry>4330</entry>
          <entry>5200</entry>
          <entry>3700</entry>
        </row>
        <row>
          <entry>显示器</entry>
          <entry>7235</entry>
          <entry>11000</entry>
          <entry>8000</entry>
        </row>
      </tbody>
    </tgroup>
  </table>
~~~

> 注：每个tgroup标签都要设定cols属性，指明表格列数。

表格跨行、跨列方法

> 用colspec标签可以用colname属性为每个列指定名称，用colnum标示第几列，没有colnum属性时，从1依次类推。
> 没有名字的列，可以不用colspec标签
> 
> 单元格entry可以用morerows属性指定跨行数目。
> 
> 单元格entry可以用colname指定列名称
> 
> 单元格entry跨列时可以用namest指定的起始列名称，用nameend属性指定结束列名称
> 
> align属性指定对齐形式，可以是：center，justify，left，right，char（较少用）
> 
> valign属性指定垂直对齐形式，可以是：bottom，middle，top

~~~ xml
<table>
  <title>PC系统估价单</title>
  <tgroup cols="5">
    <colspec colnum="1" colname="c1" align="center"/>
    <colspec colnum="2" colname="c2" align="right"/>
    <colspec colnum="3" colname="c3" align="right"/>
    <colspec colnum="4" colname="c4" align="right"/>
    <colspec colnum="5" colname="c5" align="left"/>
    <thead>
      <row>
        <entry morerows="1" valign="middle">品名</entry>
        <entry namest="c2" nameend="c4" align="center">销售商</entry>
        <entry morerows="1" valign="middle" align="center">备注</entry>
      </row>
      <row>
        <entry align="center">鴻騎</entry>
        <entry align="center">華梭</entry>
        <entry align="center">紅海</entry>
      </row>
    </thead>
    <tbody>
      <row>
        <entry>主机</entry>
        <entry>6500</entry>
        <entry>7000</entry>
        <entry>4500</entry>
      </row>
    </tbody>
  </tgroup>
</table>
~~~

<table border="1">
  <caption>PC 系统估价单</caption>
  <colgroup>
    <col align="center" class="c1" width="20%"/>
    <col align="right" class="c2" width="20%"/>
    <col align="right" class="c3" width="20%"/>
    <col align="right" class="c4" width="20%"/>
    <col align="left" class="c5" width="20%"/>
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2" align="center" valign="middle">品名</th>
      <th colspan="3" align="center">销售商</th>
      <th rowspan="2" align="center" valign="middle">备注</th>
    </tr>
    <tr>
      <th align="center">鴻騎</th>
      <th align="center">華梭</th>
      <th align="center">紅海</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">主机</td>
      <td align="right">6500</td>
      <td align="right">7000</td>
      <td align="right">4500</td>
      <td class="auto-generated">&nbsp;</td>
    </tr>
  </tbody>
</table>


#### example, informalexample

用于示例，类似note标签

~~~ xml
<example xml:id="ex.dssslfunction">
  <title>A DSSSL Function</title>
  <programlisting>
    (define (node-list-filter-by-gi nodelist gilist)
      ;; Returns the node-list that contains every element of the original
      ;; nodelist whose gi is in gilist
      (let loop ((result (empty-node-list)) (nl nodelist))
        (if (node-list-empty? nl)
    	result
    	(if (member (gi (node-list-first nl)) gilist)
    	    (loop (node-list result (node-list-first nl)) 
    		  (node-list-rest nl))
    	    (loop result (node-list-rest nl))))))
  </programlisting>
</example>
~~~

### 公式

+ equation（等式，可带标题） 
    - title
    - alt
    - mathprase/mediaobject/mathml
+ informalequation（无标题等式，没有title子标签）
    - alt
    - mathprase/mediaobject/mathml

简单示例：

~~~ xml
<equation>
  <title>Fermat's Last Theorem</title>
  <alt>x^n + y^n ≠ z^n ∀ n ≠ 2</alt>
  <mathphrase>
    x<superscript>n</superscript>+y<superscript>n</superscript>≠z<superscript>n</superscript>
    ∀ n ≠ 2
  </mathphrase>
</equation>

<informalequation>
  <alt>e^(pi*i) + 1 = 0</alt>
  <mediaobject>
    <imageobject condition="print"><imagedata fileref="figs/print/db5d_refeqn02.pdf"/></imageobject>
    <imageobject condition="web"><imagedata fileref="figs/web/db5d_refeqn02.png"/></imageobject>
  </mediaobject>
</informalequation>
~~~

> 行内公式可以用inlineequation

> 另外，公式还可以使用markup标记(markup标记是行内标记需要放到block内，如equation)引用latex公式，示例如下：

~~~ xml
<para>
A presentation system using TeX as a back end might allow you to insert inline markup, such as <markup role="tex">$x^2$</markup>, using TeX syntax directly.
</para>
~~~


### 文本

+ literallayout（纯文本）：类似html的pre标签，保留所有空白字符
+ programlisting（代码）：源代码标签，类似html的code标签。


> 其他标签还有：address（地址），，screen（文本抓屏），synopsis（命令、函数纲要），注意screen用于屏幕上输出的文本，而screenshot才用于抓屏图片。


### 媒体文件

+ mediaobject
    + audioobject(音频对象）
    + imageobject（图片对象）
    + videoobject（视频对象）
    + textobject（文本对象）:较少用，不太理解
    + imageobjectco（带callout的图片对象）：较为复杂，请参考spec。 

deiaobject下的每个xxobject都有xxinfo和xxdata的子标签，xxdata的fileref指定文件地址，format属性指定文件类型（可省略）。简单示例如下：

~~~ xml
<mediaobject>
    <imageobject>
        <imagedata fileref="penguin.gif" format="GIF">
    </imageobject>
    <videoobject>
        <videodata fileref='movie.avi'/>
    </videoobject>
</mediaobject>
~~~

### 其他

这些我个人较少用简介如下：

问题和答案：用于FAQ（常见问题解答）的元素是qandaset，它由qandaentry（包含一个问题及其解答）组成。问题和解答的集合可用qandadiv来分成章节。 

任务和过程：task（任务）用于描述 procedure（过程）。每个task包含asksummary（任务总结）, taskprerequisites（需求条件）, examples（例子，可选）, 以及一个描述任务相关信息的section。而procedure则由step（步骤）组成。step可能包含substep（子步骤）或 stepalternative（该步骤的替代步骤）。 

synopsis（摘要）:cmdsynopsis（用于命令），funcsynopsis（用于函数），classsynopsis（用于类）。 

HTML 表单（HTML 4.01表单元素）::html:button，html:fieldset，html:form，html:input，html:label，html:legend，html:option，html:select，html:textarea。 

其他:blockquote(引用），epigraph（题记），msgset（有关的错误信息），sidebar（侧边栏）。

## Inline元素

DocBook提供了数量庞大的Inline元素，大部分Inline元素都和技术相关，可以根据需要（文档的主题，可用的时间）选用它们。

### 传统出版的行内元素

+ emphasis（强调）：通常会以斜体显示，个人常用`<emphasis role="strong">`表示强烈强调用粗体表示。
+ footnote（脚注）：在当前位置显示脚注标记，在文章尾部显示脚注内容。
+ trademark（商标）：`<trademark class='registered'>Nutshell Handbook</trademark>`将显示Nutshell Handbook®

    class属性有四个可选值
    - copyright
    - registered
    - servise
    - trade

其他标签还有：abbrev（缩略语），acronym（缩写），phrase（词组），quote（引用）

### 参见

anchor（锚，书签）：用xml:id属性表示锚点名称

+ link（超文本链接）
+ xref（参见）

    这两个标签都可以表示链接，但又有不同，具体如下：

    - link标签可以有内容，如`<link>link</link>`
    - xref只能有属性，是空标签，如`<xref linkend=""/>`
    - 两个标签都有linkend属性指明当前链接目标，linkend值为文档内任意标签xml:id的值（在没有声明xml命名空间时，可以默认简写为id）
    - link用标签内文字作为链接文字
    - xref用endterm属性的指定的目标作为链接文字，endterm属性值同样为xml:id的值，链接文字即为xml:id所在标签的内容。
    - link标签也有endterm属性，目前还不知道有什么用。

olink（间接链接）：暂时没弄明白

简单示例如下：

~~~ xml
<chapter>
  <title>链接示例</title>
  <para>
    <para><link linkend="exa">美丽的诗</link></para>
    <para><xref linkend="exa" endterm="exatitle"/></para>
  </para>
  <example id="exa">
    <title id="exatitle">诗选</title>
    <simplelist>
      <member>我答答的馬蹄</member>
      <member>是個美麗的錯誤</member>
      <member>我不是歸人</member>
      <member>是個過客</member>
    </simplelist>
  </example>
</chapter>
<!--
两个链接指向同一个位置；
link链接显示的文字是“美丽的诗”；
xref显示的文字是“诗选”。
-->
~~~

> 在docbook中还可以使用xlink和xpointer(xpointer使用xpath表达路径，xpointer主要用于表达xlink的href属性内的url值)
>
> xlink可以在任意标签内使用 

其他标签还有：citation（引用文章），citerefentry（引用参考），citetitle（引用标题），firstterm（术语，第一次出现），glossterm（列入词汇表的术语）

### 简单公式

+ inlineequation（行内公式）支持mathml
+ mathphrase（可以包含带上下标的简单公式）
+ subscript（下标，可以直接包含在para等元素内）
+ superscript（上标，可以直接包含在para等元素内）。 

### 计算机相关

标记：foreignphrase（外语词），wordasword（字面意），computeroutput（计算机输出），literal（逐字复制自计算机系统的内容），markup（标记），prompt（提示符），replaceable（由读者替换的内容），optional（可选），tag（XML或SGML标签），userinput（用户输入）。 

程序语言及编程：classname（类名），constant（常量），errorcode（出错码），errorname（错误名），errortype（错误信息类别），function（函数），msgtext（信息），parameter（参量），property（属性），replaceable（由读者替换的内容），returnvalue（函数返回的值），symbol（符号），token（代符），type（类型），varname（变量名）。

用户界面：accel，guibutton，guiicon，guilabel，guimenu，guimenuitem，guisubmenu，keycap，keycode，keycombo，keysym，menuchoice，mousebutton，shortcut。 

操作系统：application（应用程序），command（命令），envar（环境变量），filename（文件名），option（参数），prompt（提示符），systemitem（系统项）。 

其他：database（数据库），email，hardware（硬件），。

## 特殊字符

|字符|ASCII码|实体形式|功能敘述|
|:---:|:---:|:---:|:---|
|<	|60	|&amp;lt;	|标记开始
|>	|62	|&amp;gt;	|标记结束
|&	|38	|&amp;amp;	|实体字符串起始符
|"	|34	|&amp;quot;	|字符串符号

# docbook较完整示例

~~~ docbook
<?xml version="1.0" encoding="utf-8"?>
<article xml:lang="zh-CN"
         xmlns="http://docbook.org/ns/docbook" version="5.0"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:mml="http://www.w3.org/1998/Math/MathML"
         xmlns:svg="http://www.w3.org/2000/svg"
         xmlns:xi="http://www.w3.org/2001/XInclude"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://docbook.org/ns/docbook xsd/docbook.xsd
                             http://www.w3.org/2001/XInclude xsd/xinclude.xsd">
  <info>
    <title>title</title>
    <subtitle>manual</subtitle>
    <xi:include href="authorlilei.xml"/> <!--插入外部xml,可以用同样的方法把一个文件拆分-->
    <edition>1 edition</edition>
    <revhistory>        <!--修订记录-->
      <revision>
        <revnumber>1</revnumber>
        <date>2014/3/28</date>
        <editor><personname>hustlei</personname></editor>
        <revremark>第一次编辑</revremark>
      </revision>
    </revhistory>
    <copyright>       <!--版权-->
      <year>2013-2014</year>
      <holder>lileilei</holder>
    </copyright>
  </info>


  <sect1> <!--一级小节-->
    <title></title>
    <para>
    </para>
    <sect2> <!--二级小节-->
      <title></title>
      <note>
        <para></para>
      </note>
      <bridgehead role="sect4">clause1</bridgehead> <!--独立小标题-->
      <para></para>
      <formalpara>             <!--带标题段落-->
        <title>③ 条款</title>
        <para>tiakuan</para>
      </formalpara>
      <para>para</para>
      <para>
        <emphasis role="strong">strong</emphasis> para2
      </para>
    </sect2>
  </sect1>

  <bibliography> <!--参考书目-->
    <biblioentry>
      <title></title>
      <authorgroup>
        <author>
          <personname></personname>
        </author>
      </authorgroup>
      <publisher>
        <publishername></publishername>
        <address></address>
      </publisher>
      <pubdate></pubdate>
      <pagenums></pagenums>
    </biblioentry>
  </bibliography>

</article>
~~~


# 工具

+ [emacs nxml](http://www.thaiopensource.com/nxml-mode/)：emacs编辑器的xml模式，也可以安装docbook模式
+ xmlmind：支持即时预览效果的windows软件
+ xmlspy: 比较强大的xml编辑器
+ [pandoc](http://pandoc.org/)：可以在docbook与很多其他格式（如html, latex等）之间转换的工具
+ [xsltproc](http://xmlsoft.org/xslt/xsltproc.html)：xslt转换引擎(libxslt的一个组件)`xsltproc xx.xsl xx.xml -o xx.ext`
+ javascript：用JavaScript调用ActiveXObject对象编写xslt转换脚本

+ [linux下docbook编辑器集合](https://help.ubuntu.com/community/DocBookEditors)

## docbook相关下载

+ [docbook xsd](http://www.docbook.org/schemas/5x.html)
+ [docbook xsl](http://sourceforge.net/projects/docbook/files/?source=navbar)

# 更多知识

+ [DocBook 官方最新最全面英文说明](http://www.docbook.org/tdg5/en/html/docbook.html)
+ [DocBook 文件寫作入門](http://www.study-area.org/tips/docw/docwrite.html)
+ [DocBook 5.0 权威指南](http://www.yeolar.com/media/doc/docbook-defguide5/html/docbook.html)
+ [DocBook Documentation](http://www.docbook.org/docs/)
+ [DocBook Guide中文](http://wiki.ubuntu.org.cn/DocBookGuide)
+ [DocBook Tools](http://www.dpawson.co.uk/docbook/tools.html)
+ [DocBook 助你完成传世之作-文档的技术革命](http://www.worldhello.net/doc/docbook_howto/index.html)
+ [DocBook XSL: The Complete Guide](http://www.sagehill.net/docbookxsl/index.html)