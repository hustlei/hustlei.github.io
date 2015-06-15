---
layout: post
title: latex数学公式 
categories: [文档格式]
group: PKM
tags: [latex]
keywords: [markdown公式, latex]
description: markdown数学公式，latex数学公式

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-20
---

* 目录
{:toc}


# 简述
个人通常将latex公式插入markdown文档中，在jekyll中用mathjax显示，或者用pandoc转换。本笔记记录了我用的比较多的latex公式用法，虽然不全，但是一般应用应该够了。

## markdown中插入公式

### 段落内公式
+ 置于`\(`和`\)`之间
+ 置于`$`和`$`之间

> 相当于latex中的`\begin{math}`和`\end{math}`

### 独立数学公式
+ 置于`\[`和`\]`之间
+ 置于`$$`和`$$`之间（latex好像不支持，markdown可以）

> 相当于latex中的`\begin{displaymath}`和`\end{displaymath}`

## 公式引用
+ 给独立公式加上`\label{}`标签，如`\label{eq:eps}`
+ 采用`\ref`引用，如`\ref{eq:eps}`

> 需要引用的公式在插入时，需要置于`\begin{equation}`和`\end{equation}`之间

## latex公式中的文本

### 文本模式
采用`\textrm{}`,可以在公式中插入正常文本（也可以直接在公式输入文本，但是会出现忽略空格分行等问题）

### 字体
+ `\mathrm{}`，正常字体
+ `\mathit{}`，斜体
+ `\mathbf{}`，粗体符号boldfont
+ `\mathbb{}`，空心粗体blackboard
+ `\mathnormal{}`，正常字体




# 数学公式

## 公式中的分组
公式中的命令仅作用于其后的一个字符，如果想作用于多个字符的话，就必须将他们置于{}中

## 常用latex数学公式命令

|项目|表示方式|示例|示例效果|
|----|:----:|:--:|:---:|
|上标(指数)|^|x^2|$x^2$|
|下标|_|x_2|$x_2$|
|上划线|\overline|\overline{m+n}|$\overline{m+n}$|
|下划线|\underline|\underline{m+n}|$\underline{m+n}$|
|向量|\vec或\overrightarrow|\vec{AB}|$\vec{AB}$|
|导数|'|y' y''|$y' \quad y''$|
|平方根|\sqrt|\sqrt{x}|$sqrt{x}$|
|分数|\frac{}{}|\frac{2}{k+1}|$\frac{2}{k+1}$|
|求和|\sum|\sum_{i=1}^{n}a_i|$\sum_{i=1}^{n}a_i$|
|乘积(product)|\prod|\prod_{i=1}^{n}a_i|$\prod_{i=1}^{n}a_i$|
|积分|\int \iiint|\iint_a^b f(x)dx|$\iint_a^b f(x)dx$|


# latex公式编排

## 空格
+ \quad 生成一个空格（相当于大写'M'的宽度）
+ \qquad 生成一个大空格
+ \, 相当于3/18个\quad
+ \: 相当于4/18个\quad
+ \; 相当于5/18个\quad
+ \! 生成一个负空格-3/18个\quad

## 括号

### 分隔符(括号)
(), [], {}, <>等均可以作为分隔符(分隔符主要指括号)

但是{}要用`\{`,`\}`表示

### 分割符大小调整
+ 将`\left`放在分隔符前，tex会自动调整分隔符的大小
+ 但是每个`\left`必须要用一个`\right`关闭
+ 如果分隔符仅有左括号则用`\right.`关闭

如：`\left\{ x^2 \right\}`

显示效果为:
 
$$
\left\{ x^2 \right\}
$$

## 对齐(数组/矩阵)
使用`\begin{array}{}`和`\begin{matrix}`都可以整齐排列公式等，个人喜欢用array,如下

### 格式
`\begin{array}{列样式} ... \end{array}`

+ 列由&分隔
+ 行由`\\`分隔
+ 列样式有n(列数）个表示列对齐方式的字母组成，字母意义如下
  - l 该列左对齐排列
  - c 该列居中排列
  - r 该列右对齐排列

### 示例

~~~ tex
$$
X= 
\left( \begin{array}{ccc}
x_1 & x_2 & \cdots \\
x_3 & x_4 & \cdots \\
\vdots & \vdots & \ddots
\end{array}\right)
$$
~~~

显示效果如下:

$$
X= 
\left( \begin{array}{ccc}
x_1 & x_2 & \cdots \\
x_3 & x_4 & \cdots \\
\vdots & \vdots & \ddots
\end{array}\right)
$$


# 常用符号

## 数学运算符

|运算符|表示方法|
|:---:|:-----:|
|$\pm$|\pm|
|$\mp$|\mp|
|$\times$|\times|
|$\div$|\div|
|$\sum$|\sum|
|$\prod$|\prod|
|$\int$|\int|
|$\iint$|\iint|
|$\iiint$|\iiint|
|$\oint$|\oint|

## 关系符

|符号|表示方法|
|:---:|:-----:|
|$\geq$|\ge or \geq|
|$\leq$|\le or \leq|
|$\neq$|\ne or \neq|
|$\geqslant$|\geqslant|
|$\leqslant$|\leqslant|
|$\geqq$|\geqq|
|$\leqq$|\leqq|
|$\approx$|\approx|
|$\cong$|\cong|
|$\triangleq$|\triangleq|
|$\propto$|\propto|
|$\perp$|\perp|
|$\forall$|\forall|
|$\in$|\in|
|$\notin$|\notin|
|$\because$|\because|
|$\therefore$|\therefore|
|$\exists$|\exists|

## 其他符号

|符号|表示方法|
|:---:|:-----:|
|$\dots$|\dots|
|$\ldots$|\ldots|
|$\cdots$|\cdots|
|$\vdots$|\vdots|
|$\ddots$|\ddots|
|$\cdot$|\cdot|
|$\angle$|\angle|
|$\infty$|\infty|
|$\triangle$|\triangle|
|$\nabla$|\nabla|
|$\bigtriangleup$|\bigtriangleup|
|$\bigtriangledown$|\bigtriangledown|
|$\gets$|\gets or \leftarrow|
|$\to$|\to or \rightarrow|
|$\longleftarrow$|\longleftarrow|
|$\longrightarrow$|\longrightarrow|
|$\uparrow$|\uparrow|
|$\downarrow$|\downarrow|
|$\S$|\S|

## 函数名
latex公式中字母默认为变量，用斜体排版，但是函数名通常用罗马字体正体排版，因此，可以用一下函数名符号书写
+ \sin \cos \tan
+ \max \min
+ \lim
+ \log \ln
+ \deg
+ \exp

## 希腊字母

|字母|表示|大写|表示|
|:--:|:--:|:--:|:--:|
|$\alpha$|\alpha|
|$\beta$|\beta|
|$\gamma$|\gamma|$\Gamma$|\Gamma|
|$\delta$|\delta|$\Delta$|\Delta|
|$\epsilon$|\epsilon|
|$\varepsilon$|\varepsilon|
|$\zeta$|\zeta|
|$\eta$|\eta|
|
|$\theta$|\theta|$\Theta$|\Theta|
|$\vartheta$|\vartheta|
|$\iota$|\iota|
|$\kappa$|\kappa|
|$\lambda$|\lambda|$\Lambda$|\Lambda|
|$\mu$|\mu|
|$\nu$|\nu|
|$\xi$|\xi|$\Xi$|\Xi|
|
|$o$|o|
|$\pi$|\pi|$\Pi$|\Pi|
|$\varpi$|\varpi|
|$\rho$|\rho|
|$\varrho$|\varrho|
|$\sigma$|\sigma|$\Sigma$|\Sigma|
|$\varsigma$|\varsigma|
|$\tau$|\tau|
|
|$\upsilon$|\upsilon|$\Upsilon$|\Upsilon|
|$\phi$|\phi|$\Phi$|\Phi|
|$\varphi$|\varphi|
|$\chi$|\chi|
|$\psi$|\psi|$\Psi$|\Psi|
|$\omega$|\omega|$\Omega$|\Omega|
