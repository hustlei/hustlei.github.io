---
layout: post
title: MathJax显示Latex、Mathml数学公式
category: other
group: PKM
tags: []
keywords: [mathjax]
description: mathjax数学公式，mathjax设置，mathjax本地调用，jekyll中使用mathjax 

author: lileilei
revision:
    editor: lileilei
    date: 2015-06-05
---

* 目录
{:toc}

# mathjax简介

MathJax 是一个开源的基于 Ajax 的数学公式显示的解决方案。用mathjax可以正确显示html网页中直接插入的下列公式源码

+ LaTex公式
+ mathml公式
+ asciimat
 
mathjax支持主流的浏览器，显示效果非常漂亮。

mathjax主要特点：

+ 可以在html中高质量显示公式
+ 支持大多数浏览器，不需要安装插件、额外的字体等
+ 用户好用，开发者可以扩展
+ 支持数学可访问性，剪切、粘贴和其他高级功能
+ 强大的API，方便集成在其他网络应用上

## mathjax显示latex公式

**调用mathjax代码**

~~~ javascript
// 设置$作为inline公式标记，默认$不是
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      }
    });
</script>

<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js">
</script>
~~~

**在html中插入latex公式方法**

> markdown中插入latex公式方式相同

+ 段落内公式
    - 置于`\(`和`\)`之间
    - 置于`$`和`$`之间

    相当于latex中的`\begin{math}`和`\end{math}`

+ 独立数学公式
    - 置于`\[`和`\]`之间
    - 置于`$$`和`$$`之间（latex好像不支持，markdown可以）

    相当于latex中的`\begin{displaymath}`和`\end{displaymath}`

**示例**

~~~ html
<p>The Lorenz Equations</p>
$$
\begin{array}{lll}
\dot{x} = \sigma(y-x) \\ 
\dot{y} = \rho x-y-xz \\
\dot{z} = -\beta z+xy
\end{array}
$$

<p>The probability of getting \(k\) heads when flipping \(n\) coins is: </p>

\[ P(E) = {n \choose k} p^k (1-p)^{n-k} \]
~~~

使用mathjax后显示效果如下：

<p>The Lorenz Equations</p>

$$
\begin{array}{lll}
\dot{x} = \sigma(y-x) \\ 
\dot{y} = \rho x-y-xz \\
\dot{z} = -\beta z+xy
\end{array}
$$
 
<p>The probability of getting \(k\) heads when flipping \(n\) coins is: </p>

\[ P(E) = {n \choose k} p^k (1-p)^{n-k} \]

## mathjax显示mathml公式

> 独立数学公式需要在math标签中设定属性`dispalay="block"`

~~~ html
<p>
inline equation
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
  <mo>+</mo> <mi>b</mi><mi>x</mi>
  <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
</math>
</p>
<p>
block equation
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>x</mi> <mo>=</mo>
  <mrow>
    <mfrac>
      <mrow>
        <mo>-</mo>
        <mi>b</mi>
        <mo>&#x00B1;</mo>
        <msqrt>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>-</mo>
          <mn>4</mn><mi>a</mi><mi>c</mi>
        </msqrt>
      </mrow>
      <mrow> <mn>2</mn><mi>a</mi> </mrow>
    </mfrac>
  </mrow>
  <mtext>.</mtext>
</math>
</p>
~~~

显示效果如下：

<p>
inline equation
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
  <mo>+</mo> <mi>b</mi><mi>x</mi>
  <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
</math>
</p>
<p>
block equation
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>x</mi> <mo>=</mo>
  <mrow>
    <mfrac>
      <mrow>
        <mo>-</mo>
        <mi>b</mi>
        <mo>&#x00B1;</mo>
        <msqrt>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>-</mo>
          <mn>4</mn><mi>a</mi><mi>c</mi>
        </msqrt>
      </mrow>
      <mrow> <mn>2</mn><mi>a</mi> </mrow>
    </mfrac>
  </mrow>
  <mtext>.</mtext>
</math>
</p>


> asciimath公式是比较简单的公式，例如\`ax^2 + bx + c = 0\`，通用需要设置公式符号为反引号，默认不启用。本文不作介绍。

# mathjax调用

有两种方法应用mathjax

+ 用`cdn.mathjax.org`上的mathjax分布式网络服务
+ 下载mathjax，链接到你的网页

## mathjax CDN调用

> CDN(content delivery network)内容分发网络
> 
>> 不需要下载mathjax到本地
>> CDN会自动从最近最快的服务器上下载mathjax
>> CDN总是会调用最新的mathjax脚本

**调用方法**

+ 在head标签内加入如下代码（也可以放在body标签内，推荐放在head内）

~~~ html
<script type="text/javascript"
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
~~~

> TeX-AMS-MML_HTMLorMML是最常用的一个配置文件，可以选择其他的配置
>
> 常用配置有default,TeX-MML-AM_HTMLorMML,TeX-MML-AM_HTMLorMML-full
>
> Tex指latex，AMS指asciimath，MMl指mathml
> 
> The-full version also loads the HTML-CSS, CommonHTML, and NativeMML output jax main code, plus the HTML-CSS mtable extension, which is normally loaded on demand.

## 本地调用mathjax

1. 下载mathjax
    + [最新mathjax下载](the latest distribution)
2. 引用mathjax

~~~ html
<script type="text/javascript" src="MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
~~~

# mathjax高级设置及功能
 
## 插入inline latex公式方式设置

默认情况下只有`\(...\)`内的inline公式会被mathjax解析，因为`$...$`中的美元符号应用较广，这样可以避免冲突。如果要`$...$`内公式被mathjax解析为inline公式，设置方法如下：

~~~ html
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
</script>
<script type="text/javascript" src="path/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
~~~

## 插入独立latex公式方式设置

> 默认支持，不用显式设置

~~~ javascript
MathJax.Hub.Config({
  tex2jax: {displayMath: [ ['$$','$$'], ['\[','\]'] ]}
});
~~~

## tex2jax引擎忽略的标签

~~~ javascript
MathJax.Hub.Config({
  tex2jax: {skipTags: ["script","noscript","style","textarea","pre","code"]}
});
~~~

## 公式编号及引用

**自动编号公式**

~~~ javascript
MathJax.Hub.Config({
    TeX: {equationNumbers: {autoNumber: "AMS"} }
});
~~~

autoNumber有两个可选值"AMS","all"

+ all：给所有公式编号
+ AMS：使用AMS样式编号

AMS样式编号使用方法：

~~~ tex
\begin{equation}
   E = mc^2
\end{equation}
~~~

将会被自动编号

~~~ tex
\begin{equation*}
   E = mc^2
\end{equation*}
~~~

或

~~~ tex
\[E = mc^2\]
~~~

将不会被编号

在jekyll中有些不同

直接插入在`\begin{equation}...\end{equation}`之间会被编号，插入`$...$`,`$$...$$`,`\[...\}`之间的不会被编号。

插入`\begin{equation*}...\end{equation*}`会把`*`之间显示为斜体，无法正确显示公式，但是`\begin{equation\*}...\end{equation\*}`可以正确显示公式。

**公式编号格式**

~~~ javascript
MathJax.Hub.Config({
    TeX: {formatNumber: function (n) {return n}}
});
~~~

修改function(n)改变输出格式

**公式引用**

设置如下代码，才能够使用引用

~~~ javascript
MathJax.Hub.Config({
    tex2jax: {processRefs: true} 
});
~~~

使用`\label`可以给公式一个标签，然后就可以用`\ref`或`\eqref`引用公式，实例如下：

~~~ tex
In equation \eqref{eq:sample}, we find the value of an
interesting integral:

\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
  \label{eq:sample}
\end{equation}
~~~

显示效果如下：

In equation \eqref{eq:sample}, we find the value of an
interesting integral:

\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
  \label{eq:sample}
\end{equation}

# 相关文档链接

+ [mathjax官方文档及下载地址](http://www.mathjax.org/#docs)
+ [mathjax github源及文档](https://github.com/mathjax/mathjax-docs)
+ [mathjax官方教程](http://docs.mathjax.org/en/latest/start.html)
+ [mathjax中文文档](http://mathjax-chinese-doc.readthedocs.org/en/latest/configuration.html)
