---
layout: post
title: yaml基础语法
category: 文档格式
group: PKM
tags: []
keywords: [yaml, yml, 轻标记文档]
description: yaml语法

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-12
---

* 目录
{:toc}


# yaml简介

YAML最初是Yet Another Markup Language(另一种标记语言)的缩写，后来为了强调yaml是以数据为中心重新命名为递归写法YAML Ain’t Markup Language(YAML 不是一种标记语言)。

YAML的数据组织主要依靠的是空白，缩进，分行等结构。相对于XML，YAML更加简洁明了，可读性更高，更易于表达数据序列（清单、散列表，标量等）。

可以对比一下如下表达相同内容的xml和yaml代码块：

xml代码

~~~ xml
<site>
    <name>sina</name>
    <url>http://www.sina.com.cn</url> 
</site>
<site>
    <name>google</name>
    <url>http://www.google.com</url>
</site>
~~~

yaml代码

~~~ yaml
---
site: 
    name: sina 
    url : http://www.sina.com.cn
---
site:
    name: google
    url : http://www.google.com
~~~

或

~~~ yaml
---
site: {name: sina, url: http://www.sina.com.cn}
---
site: {name: google, url: http://www.google.com}
~~~

# yaml 基本语法

yaml表面很简洁，但yaml规范却有80页，看上去令人生畏。由于大多数人很少用到其高阶语法，因此，入门学者其实只需要注意三大规则即可掌握yaml基本用法。

## 冒号规则（散列表/键值对）

**Mapping Scalars to Scalars**

散列表（又叫哈希表或杂凑表，实际上就是关键字、值对）的关键字和值由冒号加空格`: `分开。有两种表示形式：

+ 区块形式

~~~ yaml
name: John
age: 30
~~~

+ 内置形式

~~~ yaml
{name: John, age: 30}
~~~

> 字符串不需要包在引号内

## 短横杠`-`规则（列表项）

**Sequence of Scalars**

列表项或清单使用一个短横杠加空格`- `开头。列表项的多个项需要使用相同的缩进级别。同样，也有两种表示方式：

+ 区块形式

~~~ yaml
- list_value_one
- list_value_two
- list_value_three
~~~

+ 内置形式

~~~ yaml
[list_value_one, list_value_two, list_value_three]
~~~

## 缩进规则（嵌套）

YAML使用一个固定的缩进风格表示数据层结构关系。缩进只能用空格（不能用tab），缩排中空格数目不重要，只要相同阶层的元素左侧对齐就可以了，建议缩进用2个或4个空格。

+ 散列表中使用列表项（映射列表项到散列表的关键字）

**Mapping Scalars to Sequences**

~~~ yaml
american:
    - Boston Red Sox
    - Detroit Tigers
    - New York Yankees
national:
    - New York Mets
    - Chicago Cubs
    - Atlanta Braves
~~~

+ 列表项中使用散列表（由散列表组mappings作为列表项的项）

**Sequence of Mappings**

~~~ yaml
-
    name: Mark McGwire
    hr: 65
    avg: 0.278
-
    name: Sammy Sosa
    hr: 63
    avg: 0.288
~~~

或

~~~ yaml
- name: Mark McGwire
  hr: 65
  avg: 0.278
- name: Sammy Sosa
  hr: 63
  avg: 0.288
~~~

或

~~~ yaml
- {name: Mark McGwire, hr: 65, avg: 0.278}
- {name: Sammy Sosa, hr: 63, avg: 0.288}
~~~

+ 列表项中使用列表项（由列表项作为列表项的项）

**Sequence of Sequences**

~~~ yaml
- [name , hr, avg ]
- [Mark McGwire, 65, 0.278]
- [Sammy Sosa , 63, 0.288]
~~~

或者

~~~ yaml
-
  - name
  - hr
  - avg
-
  - Mark McGwire
  - 65
  - 0.278
- 
  - Sammy Sosa
  - 63
  - 0.288
~~~

或者

~~~ yaml
- - name
  - hr
  - avg
- - Mark McGwire
  - 65
  - 0.278
- - Sammy Sosa
  - 63
  - 0.288
~~~

+ 散列表中使用散列表

**Mapping of Mappings**

~~~ yaml
Mark McGwire: {hr: 65, avg: 0.278}
Sammy Sosa: {
 hr: 63,
 avg: 0.288
 }
~~~

或

~~~ yaml
Mark McGwire: {hr: 65, avg: 0.278}
Sammy Sosa: {hr: 63, avg: 0.288}
~~~

或

~~~ yaml
Mark McGwire:
    hr: 65
    avg: 0.278
Sammy Sosa:
    hr: 63
    avg: 0.288
~~~

+ 复杂嵌套

散列表关键字revised的值由列表项组成，列表项的每个项都是散列表。

~~~ yaml
author: name
revised:
    - editor: name1
      date: 20xx-xx
    - editor: name2
      date: 20xx-yy
      discript: xxxx
~~~


## 完整示例

~~~ yaml
---
invoice: 34843
date : 2001-01-23
bill-to:
    given : Chris
    family : Dumars
    address:
        city : Royal Oak
        state : MI
        postal : 48046
product:
    - sku : BL394D
      quantity : 4
      description : Basketball
      price : 450.00
    - sku : BL4438H
      quantity : 1
      description : Super Hoop
      price : 2392.00
tax : 251.42
total: 4443.52

~~~

# yaml 文件标记及注释

## “---”标记

当一个yaml文件内包含多个yaml数据文档时(multi documents in a stream)，可以用"---"表示每个文档的开始。同时可以用"..."作为文档结束，"..."可以省略。

> 典型的应用是Log文件每天的记录

~~~ yaml
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
...
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
...
~~~

~~~ yaml
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
 
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
~~~

~~~ yaml
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
~~~

## 注释

yaml用`#`作为注释标记

## yaml解释器

yaml拥有c, ruby, python, java, C#, javascript等等多种语言的解释器（parser），可以在<http://www.yaml.org>首页上找到。

另有一个非常好的yaml解释器工具，C#版的应用程序，可以用来检查yaml语法:[[工具简介]](http://www.cyqdata.com/cnblogs/article-detail-25232), [[下载地址]](http://www.codeproject.com/Articles/28720/YAML-Parser-in-C)

# 参考资料

+ [YAML Spec 1.2](http://www.yaml.org/spec/1.2/spec.html)
+ [YAML wiki](http://zh.wikipedia.org/zh-cn/YAML#.E6.B8.85.E5.96.AE.EF.BC.88.E9.99.A3.E5.88.97.EF.BC.89)