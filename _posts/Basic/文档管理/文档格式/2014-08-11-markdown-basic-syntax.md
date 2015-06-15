---
layout: post
title: MarkDown基本语法
category: 文档格式
group: PKM
tags: [markdown]
keywords: [MarkDown, 轻标记文档]
description: MarkDown语法

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-12
---

* 目录
{:toc}


# markdown简介

markdown作为一种轻量级标记语言，语法由较少的几个符号组成，这些精挑细选的符号，很简洁，也很容易理解，能够清晰的表达整个文档的结构。

不同的解释器对markdown语法有不同的扩展，目前，个人认为pandoc的语法最为强大。用jekyll可以把markdown直接转换为html静态网站，因此，本人用的最多的还是jekyll解释器。

在jekyll上，因为rdiscount，redcarpet解释器在使用latex公式时会出现上标错误，因此，改用kramdown解释器。所以，我的文档基本上都需要同时遵守kramdown markdown语法和pandoc markdown 语法。

> 主流的markdown版本有：markdown_strict, Github-flavored markdown, php markdown extra, multimarkdown, pandoc, kramdown etc.

markdown语法元素根据作用不同主要分为2类：

+ 结构元素/块级元素(区块元素):表示文档结构，比如段落，引用，列表
+ 文本元素/行级元素(区段元素):表示文本格式，比如强调，链接

kramdown和pandoc所支持的markdown都对标准语法进行了扩展，本文重点介绍两者相同的语法。


# 结构元素/块级元素

## 段落和换行

Markdown 段落是由一个或多个连续的文本行组成，它的**前后要有一个以上的空行**。普通段落不该用空格或制表符来缩进。

> github支持强制换行，即源文件换行目标文件也自动换行，段落前后不要求有空行。pandoc需要特定选项才支持此功能。

## 标题

### Atx风格标题

一到六个`#`符号及一行文字组成，也可以再文字后加上任意多个#号，由行首#个数决定标题级数。

~~~ markdown
## level-two header

### level-three header
~~~

> pandoc和kramdown默认需要在标题前加一个空行。

### Setext风格标题

一行文字后跟一行`=`符号表示一级标题，后跟一行`-`符号表示二级标题

~~~ markdown
level-one header
================

level-two header
----------------
~~~

## 引用

可以再每行最前面加上`>`

如果引用内容需要换行，需要加一个空行（空行前可以有一个`>`符号），如果没有空行，多行内容会合并到一行。

~~~ markdown
> this is a blockquote with two paragraphs.
> the second paragraph
~~~

也可以偷懒只在第一行最前面加上`>`

~~~ markdown
> This is a blockquote with two paragraphs
the second paragraph

> this is another blockquote
~~~

引用区块可以嵌套，只要根据不同层次加上不同数量的`>`，（kramdown中嵌套引用多个`>`之间必须要有一个空格）

~~~ markdown
> This is the first level of quoting.
>
> > This is nested blockquote.
~~~

## 代码

在代码每一行前缩进4个空格或1个制表符，markdown输出就会用`<pre>`和`<code>`标签把代码包起来。

~~~ markdown
这是一个普通段落.

    这是一个代码区块。
~~~

使用三个或以上波浪号`~`的一行作为开始，并以同样符号且至少同样长度的一行作为结束。

在开始行符号`~~~`后可以加上语言名称，可用于代码高亮显示（还有其他方式，但在pandoc和kramdown中方法不同）。

~~~~~~~~~ markdown
~~~ python
if(a>0):
    a=1
~~~
~~~~~~~~~

> 在pandoc中波浪号`~`可以用反引号`` ` ``代替。

## 列表

### 无序列表

无序列表每条项目都以符号(`*`,`+`或`-`)加一个空格作为开头。

~~~ markdown
* one
* two
* three
~~~

列表每一项后一行会自动合并到该项中

~~~ markdown
+ one
two
+ three
~~~

列表每项可以有多行，列表换行时，后续段落需要在一个空白行之后，并且以4个空格或一个tab开始。

> 貌似列表后续行不能是围栏代码，会把波浪号`~`一起显示。（行内代码没有问题）

~~~ markdown
* first para.

    second para

* second item.
~~~

列表也可以嵌套。嵌套列表前置的空白行是可有可无的。

嵌套列表必须以空格开头，在pandoc及标准markdown中要求必须是4个空格。

~~~ markdown
* fruits
    + apples
        - macintosh
        - red delicious
    + pears
    + peaches
* vegetables
    + brocolli
    + chard
~~~

复杂嵌套列表

~~~ markdown
* fruits
    + current fruits

        fruits of mine

        - pears
        - peaches
* vegetables
~~~

### 有序列表

有序列表则使用数字接着一个英文句点，然后加一个空格

~~~ markdown
1. Bird
2. McHale
3. Parish
~~~

### 列表结束

如下列表在输出时将会在同一个列表内，编号也会是连续的。

~~~ markdown
1. 1st
2. 2nd

1. 3rd
~~~

要终止一个列表，两个列表之间需要其他块级元素(缩进4个空格实现的代码块除外)或者插入注释，如下：

~~~ markdown
1. 1st
2. 2nd

<!--  -->

1. 3rd
~~~

> 在kramdown中也可以用`^`代替注释(pandoc中不行)。

### 定义列表（名词解释）

每个名词(term)都必須单独在一行，后面可以接著一個空白行，也可以省略。定义由一个冒号开头，后跟空格（pandoc要求冒号之后必须有四个空格，kramdown一个空格即可）

一个名词可以有多个定义，每个定义可以有一或多段落，每個段落都要缩进四個空格。在kramdown中，冒号后只需一个以上空格即可，但两个名词定义之间必须有一个空行。

~~~ markdown
Term 1
:    Definition 1

Term 2 with *inline markup*
:    Definition 2a
:    Definition 2b
~~~

pandoc也可以用波浪号表示定义

~~~ markdown
Term 1
  ~ Definition 1
Term 2
  ~ Definition 2a
  ~ Definition 2b
~~~

## 表格

pandoc和kramdown的表格相对都还是比较强大的，但是很遗憾，他们的表格格式仅有管线格式是兼容的，形式如下：

~~~ markdown
| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |
~~~

其中，开始与结尾的管线字符是可选的。第二行的冒号表明了对齐方式。表头可以省略，但上述第二行水平虚线必须保留。

因為管线界定了各列之間的边界，表格的原代码并不需要像上面例子中各列直接保持直行对齐。

另外，pandoc和kramdown不兼容的表格格式支持功能更多，简介部分格式如下：

pandoc的格框表格功能很强大，但kramdown不支持

~~~ markdown
+---------------+---------------+--------------------+
| Fruit         | Price         | Advantages         |
+---------------+---------------+--------------------+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+
~~~

kramdown的表格格式也很强大，并且支持表尾行，但是和pandoc不兼容

~~~ markdown
|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------+------------+-----------------+----------------|
~~~

## 公式

+ 行内latex公式可以位于两个`$`之间
    公式`$a=b^2+c^2$`结果是$a=b^2+c^2$
+ 块式latex公式可以位于`$$`之间，且独立于其他块级结构

~~~ markdown
$$
a^2=b^2+c^2
$$
~~~

$$
a^2=b^2+c^2
$$

## 分隔线

在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。可以在星号或是减号中间插入空格。

~~~ markdown
* * *
***
---
———
~~~

## 行区块(pandoc)

以竖线 (|) 加上一個空格开始的行。行与行间的文字在输出时将以原样保留，行首的空白字符也一样会被保留。

~~~ markdown
| The limerick packs laughs anatomical
| In space that is quite economical.
|    But the good ones I've seen
|    So seldom are clean
| And the clean ones so seldom are comical
~~~


# 文本元素/行级元素

## 强调

要“強調”某些文字，只要以`*`或`_`符号前后包住即可，文本输出目标位**斜体**，在html中会被转成用`<em>`标签包围。

要“更强烈强调”，需要把`*`或`_`符号重复两遍，文本输出目标位**粗体**，在html中会被转成用`<strong>`标签包围。

> 如果 * 和 _ 两边都有空白的话，它们就只会被当成普通的符号

~~~ markdown
*斜体强调*
_斜体强调_
**粗体强调**
__粗体强调__
***粗斜体强调***
___粗斜体强调___
~~~

## 删除和上下标(pandoc)

要将一段文字加上水平线作为刪除效果，將該段文字前後以`~~`包住即可

~~~ markdown
~~strikout~~
~~~

要输入上标可以用`^`符号将上标文字包起来；要输入下标可以用`~`符号将將下标文字包起来

`H~2~O is a liquid.  2^10^ is 1024.`

如果上下标文字中包含空格，空格之前必须加上反斜杠。

如果你想要让字母 P 后跟着下标 ‘a cat’，则需要用`P~a\ cat~`，而不是`P~a cat~`。

## 行内代码（字面文字）

用反引号`` ` ``把它包起来。

~~~ markdown
What is the difference between `>>=` and `>>`?
~~~

如果字面文字中也包含了反引号，那就使用双重反引号包住。

~~~ markdown
There is a literal backtick `` ` ``
~~~

反斜杠转义字符（以及其他 markdown 结构）在字面文字的上下文中是沒有效果的：

~~~ markdown
This is a backslash followed by an asterisk: `\*`.
~~~

## 链接

### 自动链接

用尖括号将URL或email地址包起来会自动转换成链接

~~~ markdown
<http://google.com>
<sam@google.com>
~~~

### 行内链接

包含位于方括号内的链接文字，以及方括号后圆括号包起来的URL。

(圆括号内URL后面可以加入链接title)

~~~ markdown
[This link](http://example.net/)

[link](../test "local URI")

[an example](http://example.com/ "Title")
~~~

### 页内链接(pandoc)

用`#`后加上文档内标题名词可以实现指向本文档页内某个标题内的链接

~~~ markdown
[markdown简介](#markdown简介)

[链接](#链接)
~~~

> 两个链接之间要有空行才会换行

### 参考链接

在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记；接着，在文件的任意处，你可以把这个标记的链接内容定义出来。

> 链接标记不分大小写

~~~ markdown
This is a [reference style link][linkid] to a page. And [this][linkid] is 
also a link. As is [this][] and [THIS].

[linkid]: http://www.example.com/ "Optional Title"
~~~

### 隐式链接

可以省略指定链接标记，这种情形下，链接标记会视为等同于链接文字

在pandoc和kramdown中，后边方括号也一样可以省略

~~~ markdown
[this][linkid] is a link.
As is [this][] and [THIS].

[linkid]: http://www.example.com/ "Optional Title"
~~~

## 图片

Markdown中图片语法和链接很相似，相当于“以`!`开始的链接”，同样有2中样式，行内式和参考式

~~~ markdown
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")
~~~

~~~ markdown
![Alt text][id]

[id]: url/to/image  "Optional title attribute"
~~~

## 脚注

> 标准markdown没有的功能

在方括号内跟在`^`后id（数字或单词，不能有空格）即`[^id]`表示脚注位置。在文档任意位置可以插入脚注内容，格式为`[^d]: 脚注内容。`

脚注内容可以有多行，但后续行必须缩进4个空格。脚注id只用来建立脚注位置与脚注内容的对应关联，在输出时，脚注将依顺序递增编号。

~~~ markdown
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won't be part of the note, because it
isn't indented.
~~~


行内脚注(pandoc)

~~~ markdown
Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]
~~~

## 缩写

> 标准markdown没有的功能，来源于php markdown extra
> 
> pandoc不支持缩写，但是在可以打开abbreviations选项后，将忽略缩写解释内容。

语法形式如下：

~~~ markdown
This is some text not written in HTML but in another language!

*[another language]: It's called Markdown
*[HTML]: Hyper Text Markup Language
~~~

结果如下：

This is some text not written in HTML but in another language!

*[another language]: It's called Markdown
*[HTML]: Hyper Text Markup Language

## html

在pandoc中称为raw_html扩展，在markdown, epub, textile, html, s5, slidy, slideous, dzslides之间转换时html代码直接输出到目标文件，但在其他文件中会被抑制（原文suppressed，在docx中测试时，docx中把html标签全部删除，仅留下内容，格式不对）


# 其他

## 转义字符

Markdown 可以利用反斜杠来插入一些在语法中有其它意义的符号

支持用反斜杠帮助插入原始符号的符号有

~~~ markdown
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
~~~

在pandoc中还有

`>`

在kramdown中还有

~~~ markdown
=
:
|
"
'
$
<>
<<
>>
>
~~~

## 文档信息

在pandoc中和jekyll中都支持用yaml描述文档信息，尽管pandoc支持yaml在文档任意位置，但是一般在文档开始。yaml文档开始和结尾于三个减号。yaml内可以描述文档标题、作者等信息，以及jekyll控制信息，甚至用户自定义信息（在pandoc及jekyll中可以通过特定语法引用）。

~~~ markdown
---
layout: post
title:  'This is the title: it contains a colon'
author:
- name: Author One
  affiliation: University of Somewhere
- name: Author Two
  affiliation: University of Nowhere
tags: [nothing, nothingness]
abstract: |
  This is the abstract.

  It consists of two paragraphs.
---
~~~

## 属性

在pandoc和kramdown中可以通过属性给内容增加附加信息，如id, class等等，但是语法不相同，简单举例如下：

~~~ markdown
pandoc attribute{#identifier .class .class key=value key=value}
~~~

~~~ markdown
kramdown{:id: class="something" class="cls1" .cls2}
~~~


# 参考资料

+ [Markdown语法说明](http://wowubuntu.com/markdown/index.html)
+ [kramdown syntax](http://kramdown.gettalong.org/syntax.html)
+ [pandoc's markdown](http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown)
+ [pandoc's markdown语法中文翻译](http://pages.tzengyuxio.me/pandoc/)