---
layout: post
title: 代码命名规则
categories: [编程语言]
group: IT
tags: []
keywords: [代码命名规则]
description: 代码命名规则

author: lileilei
revision:
    editor: lileilei
    date: 2008-10-10
---

* 目录
{:toc}

# 概述

定义规范的目的是为了使项目的代码样式统一，使程序有良好的可读性。


风格，也被视为可读性，主要指称管理C++代码的习惯。使用术语风格有点用词不当，因为这些习惯远不止源代码文件格式这么简单。
使代码易于管理的方法之一是增强代码一致性，让别人可以读懂你的代码是很重要的，保持统一编程风格意味着可以轻松根据“模式匹配”规则推断各种符号的含义。创建通用的、必需的习惯用语和模式可以使代码更加容易理解，在某些情况下改变一些编程风格可能会是好的选择，但我们还是应该遵循一致性原则，尽量不这样去做。


没有一种命名规则可以让所有的程序员赞同。而这多种命名规则也确实各有利弊。没有必要花太多的精力试图发明最好的命名规则，应当制定一种令大多数项目成员满意的命名规则并切实执行。

标识符命名的一致性自然会体现出代码的优雅。当然，如果你的程序使用了第三方的代码，而这些模块经验证确实是正确无误的。那么也没有必要一味追求命名的一致性，而去修改这些已经定型的模块中的函数和变量名。

## 常见命名规则

著名的命名风格有四种

### 匈牙利命名法(Hungarian Notation, HN)

匈牙利命名法主要思想是“在变量和函数名中加入前缀以增进人们对程序的理解”。基本原则是：变量名=属性_+类型+对象描述，属性和类型属于前缀，用一个或者多个小写字母开头表示，例如属性前缀g_表示全局变量，属性前缀m_表示类成员变量，类型前缀i表示整型，类型前缀p表示指针；前缀之后的是首字母大写的一个单词或多个单词组合。

例如:iMyName

该风格是MFC或者说MS的程序员大量使用的风格。据说这种命名法是一位叫查尔斯·西蒙尼(Charles Simonyi)的匈牙利(hungary)程序员发明的，他在微软呆了几年，于是，这种命名法就通过微软的各种产品和文档资料向世界传播开了。大部分程序员不管自己使用什么软件进行开发，或多或少都使用了这种命名法。

### 下划线命名法(UNIX命名法/K&R命名法)

K&R命名法是所有标示符的字母小写，单词之间通过下划线分割，私有成员前面会加_。在UNIX/LIUNX这样的环境，以及GNU代码中使用非常普遍。

例如:my_name

k&r风格,历史悠久,而且有众多友好的开源兄弟,如linux内核风格,gnu编码规范,它们都跟k&r基本相同。如果要写开源代码,使用k&r可能会更受人欢迎。不少坚持k&r风格的开发人员认为k&r风格是老字号,是C语言发明人提出国际标准化组织制定的风格。

### 帕斯卡(Pascal)命名法

首字母和后面连接的每个单词的首字母都大写。

例如： MyName

### 驼峰(Camel)命名法

将标识符的首字母小写，而每个后面连接的单词的首字母都大写。正如它的名称所表示的那样，合使用大小写字母来构成标识符的名字。

例如：myName

驼峰（Camel）命名法近年来越来越流行，面向对象语言使用最多的风格；如Java，C#。

## 命名原则

定义规范的目的是为了使项目的代码样式统一，使程序有良好的可读性。

不建议使用匈牙利命名方法。在windows的C语言API时代，名称要么是个整数句柄，要么是个长指针或者void指针，要不然就是string的几种实现(有不同的用途和属性)之一。那时候编译器不作类型检查，程序员需要匈牙利标记法来帮助自己记住类型。现代编程语言具有更丰富的类型系统，编译器也记得并强制使用类型。HN前缀编码纯属多余，增加了误导读者的可能性。也不必用m_前缀，代码读的越多，眼中就越没有前缀，只看到名称中有意义的部分。

纯C语言建议使用linux下划线风格。

其他高级语言，尤其是动态语言和面向对象语言建议综合使用Pascal和Camel风格。

# 推荐命名规则

## 标识符

+ 类库
    - Pascal命名法
    - 同一模块的类库用同一前缀，前缀表示模块，如：AnyBase.dll，AnyCore.dll

+ 包,命名空间
    - Pascal命名法
    - 采用反域名规则。如：Com.Company.App.Module。
    - 或者采用组织名称后跟技术名称(软件名)的方法。即：CompanyName.Technology.[Feature]
    - 命名空间内不建议包含同名的类
    - 包可以以文件夹形式存在（如c语言）

+ 文件
    - 文件名全小写，单词用短横线-相连
    - 按项目约定命名，且尽量保证文件名明确
    - 文件一般是成对出现，如：foo-bar.hxx, foo-bar.cxx, foo-bar.inl
    - 建议一个类一个文件

+ 类型(类/结构/枚举)
    - Pascal命名法，不含下划线
    - 用名词或名词短语命名。为便于搜索和理解，量词应放在结尾，如：CustomerFirst
    - 结构体，枚举，类定义都是如此，比如：MyExcitingEnum
    - 可以根据类型功能使用Service, Adapter, Provider等作为后缀
    - 不建议在类型前加前缀，如类名称使用C前缀，如：使用File而不是CFile。
    - 接口不建议以I开头，可以以able或ible结尾，如interface Runnable； interface Accessible 。

+ 函数/方法
    - Camel命名法
    - 函数名保持命令性语气，使用“动词”或者“动词＋名词”（动宾词组）。如：drawBox()
    - 类的成员方法应当只使用“动词”，被省略掉的名词就是对象本身。如：box.draw()
    - 用正确的反义词组命名具有互斥意义的变量或相反动作的函数等。

+ 变量
    - Camel命名法
    - 使用“名词”或者“形容词＋名词”，如：oldValue，newValue
    - 变量的名字应该可望文知意，不必进行“解码”。有单位的变量应该将单位加到变量的名字当中，如：freqencyOffsetKHz
    - 保护成员变量（只有类对象自己和子类对象可以访问）建议以下划线_作为前缀
    - 私有成员变量（只有类对象自己能访问）建议以双下划线`__`作为前缀

+ 宏/常量
    - 全大写，用_分割
    - 除非万不得已，否则不使用任何不标准的扩展，如#pragma和`__declspec`，允许使用`__declspec(dllimport)`和`__declspec(dllexport)`，但必须通过DLLIMPORT和DLLEXPORT等宏，以便其他人在共享使用这些代码时容易放弃这些扩展


### 命名原则

#### 标识符命名

标识符的命名要清晰、明了，有明确含义，同时使用完整的单词或大家基本可以理解的缩写，避免使人产生误解。标识符的命名原则为：“min-length && max-information”原则，尽可能的用最少的字符而又能完整的表达标识符的含义。

使用缩写的原则：

+ 较短的单词可通过去掉“元音”形成缩写
+ 较长的单词可取单词的头几个字母形成缩写
+ 此外还有一些约定成俗的英文单词缩写

addition add
answer ans
array arr
average avg
buffer buf或buff
capture cap或capt
check chk
column col
control ctrl
decode dec
define def
delete del
destination dest
display disp
division div
encode enc
environment env
error err
frequency freq
index idx
image img
increment inc
initalize init
length len
memory mem
middle mid
make mk
message msg
number num
optimization opt
operator optr
parameters params 
positon pos
previous pre或prev
result res
return ret
source src
statistic stat
string str
subtraction sub
table tab
temporary tmp或temp
value val

+ 命名中若使用特殊约定或缩写，则要注释说明。应该在源文件的开始之处，对文件中所使用的缩写或约定，特别是特殊的缩写，进行必要的注释说明。
+ 变量命名，禁止取单个字符（如i, j, k），但i, j, k作为局部循环变量是允许的。


### 软件中常用的反义词组

add / remove       begin / end        create / destroy 
insert / delete    first / last       get / release
increment / decrement                 put / get
add / delete       lock / unlock      open / close
min / max          old / new          start / stop
next / previous    source / target    show / hide
send / receive     source / destination   init/term
cut / paste        up / down		init/deinit
