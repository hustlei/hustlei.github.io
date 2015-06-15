---
layout: post
title: jekyll目录结构和配置
category: jekyll
group: PKM
tags: [jekyll]
keywords: [jekyll]
description: jekyll目录结构

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-18
---

* 目录
{:toc}

# jekyll目录结构

jekyll在工作过程中，先是通过引擎把_posts下源文档翻译为html文件，然后根据_posts下模板生产最终静态html文件。模板文件还可以应用themes、plugins等。

## jekyll简单目录结构

~~~
.
|- _config.yml
|- index.html
|- _posts
|  |- file.md
|  |- file.html
|- _layouts
|  |- default.html
|  |- post.html
|- _site
~~~

Note：
:    _config.yml （如果没有该文件，会采用默认配置）内包含jekyll配置参数，如：markdown引擎，目标文件地址等等
:    index.html 目标网站的首页
:    _posts 存放源文件(可以是markdown，textile，html等格式）的文件夹，jekyll会将源文件转换为html格式放在目标文件夹，非文本文件则不作处理。文件名需要以`yyyy-mm-dd-file-name.ext`格式命名。
:    _layouts 存放模板文件，可以在源文件中通过layout属性指定模板，模板采用liquid调用源文件转换后的内容
:    _site 默认的目标文件夹
:    下划线`_`开头的文件夹根据默认配置或配置文件处理，其他文件夹jekyll默认会进行转换或直接拷贝到目标文件夹。


## 我的jekyll目录

~~~
.
|- _config.yml     #配置文件
|- index.html      #主页文件
|- pages           #和index.html处于相同地位的网站页面
|- _drafts         #草稿文件夹
|- _posts          #源文件夹
|  |- file.md
|  |- file.html
|- _includes       #引用文件夹
|  |- themes        #主题文件夹
|  |- widgets       #插件文件夹
|- _layouts        #模板文件夹
|  |- default.html
|  |- post.html
|- assets          #资源文件
|  |- fav.ico
|  |- css
|  |- js
|- _site           #目标文件夹
|- CNAME           #拥有自已的域名时，该文件制定域名
|- LICENSE
|- README
|- changelog.md
~~~

Note:
:    _drafts 文件夹里可以放未完成的草稿，通过`jekyll serve --drafts`可以查看草稿在网站的显示效果

# 简单配置

~~~ yaml
source:       .
destination:  ./_site
encoding:     utf-8

# 目标网站路径设置
permalink: :year/:month/:title.html
markdown: Kramdown
# 可用markdown引擎有Kramdown rdiscount Redcarpet

# 自定义变量，可以在liquid中通过site.img引用
img: http://hustlei.qiniudn.com/

excerpt_separator: "####"

# kramdown选项设置
kramdown:
  auto_ids:       true
  footnote_nr:    1
  entity_output:  as_char
  toc_levels:     1..2
  smart_quotes:   lsquo,rsquo,ldquo,rdquo
  hard_wrap:      false
  header_offset:  1
  math_engine:  mathjax

  enable_coderay: true
# coderay支持语言有限，且github不支持
  syntax_highlighter: coderay
  syntax_highlighter_opts:
    block:
      wrap: div
      line_numbers: table
      line_numbers_start: 2 不管用
      tab_width: 4
      bold_every: 5
      css: style
    default_lang: c

# 不能和kramdown同时使用
# highlighter: rouge

exclude: [".rvmrc", ".rbenv-version", "README.md", "Rakefile", "changelog.md"]

paginate: 5
~~~


# 高级设置

## 语法高亮

jekyll的语法高亮方案有

+ pygments    #功能强大，设置十分复杂
+ rouge       #支持语言比pygments少，但足够用了，兼容pygments样式
+ kramdown    #**github都不支持**，截止2015年6月
    + coderay #kramdown自带方案，支持语言很少
    + rouge
+ js 
    - [highlightjs](https://highlightjs.org/)
    - [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/)
    - [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
    - [GeSHi-Generic Syntax Highlighter](http://qbnz.com/highlighter/index.php)
    - [Lighter](https://github.com/pradador/Lighter/)
    - [SHJS](http://shjs.sourceforge.net/)
    - [Prism](http://prismjs.com/)
    - [jQuery.Syntax](http://www.codeotaku.com/projects/jquery-syntax/index.en)
    - [Rainbow](http://craig.is/making/rainbows)
    - [DLHighlight](http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine)


+ 推荐使用highlightjs或SyntaxHighlighter，配置方便，支持语言多，可移植性好
    - pygments太复杂，不推荐
    - rouge在用显示行号时，行内公式也会有行号，想要更多theme还得安装pygments生产，不过速度挺快
    - coderay支持语言太少，只能在kramdown下使用
+ 其他js方案很多，不止本文所列方案，简单介绍如下
    - SyntaxHighlighter：应用非常广泛的方案，据说是最优秀的
    - Google Code Prettify：很不错的方案，可惜google网站不好上啊
    - GeSHi:Generic Syntax Highlighter
    - Lighter:用mootool写的
    - SHJS:Syntax Highlighting in Javascript的简写，支持约40种语言
    - Prism：轻量级JavaScript代码高亮插件
    - jQuery.Syntax：jQuery轻量级代码高亮插件
    - Rainbow：轻量级（压缩后仅1.4 kb），使用简单，可扩展。
    - DlHighlight：只支持4中语言

### highlightjs

> 我个人应用的代码高亮方案

可以自动将`<pre><code class="lang">`内的代码高亮，lang可以是编程语言(c,csharp,java等)，也可以有`lang-`或`language-`前缀，如`<pre><code class="language-java">`。支持的语言名称参考：[language参考](http://highlightjs.readthedocs.org/en/latest/css-classes-reference.html?highlight=language#c-cs-csharp)

**各语言高亮标记**

~~~
Python (“python”, “py”, “gyp”)
Python profiler results (“profile”)
Ruby (“ruby”, “rb”, “gemspec”, “podspec”, “thor”, “irb”)
Haml (“haml”)
Perl (“perl”, “pl”)
PHP (“php”, “php3”, “php4”, “php5”, “php6”)
Scala (“scala”)
Groovy (“groovy”)
Go (“go”, “golang”)
Gradle (“gradle”)
HTML, XML (“xml”, “html”, “xhtml”, “rss”, “atom”, “xsl”, “plist”)
Lasso (“lasso”, “ls”, “lassoscript”)
CSS (“css”)
SCSS (“scss”)
Less (“less”)
Stylus (“stylus”, “styl”)
Markdown (“markdown”, “md”, “mkdown”, “mkd”)
AsciiDoc (“asciidoc”, “adoc”)
Django (“django”, “jinja”)
Twig (“twig”, “craftcms”)
Handlebars (“handlebars”, “hbs”, “html.hbs”, “html.handlebars”)
Dust (“dust”, “dst”)
JSON (“json”)
Mathematica (“mathematica”, “mma”)
JavaScript (“javascript”, “js”)
TypeScript (“typescript”, “ts”)
CoffeeScript (“coffeescript”, “coffee”, “cson”, “iced”)
Dart (“dart”)
LiveScript (“livescript”, “ls”)
ActionScript (“actionscript”, “as”)
Haxe (“haxe”, “hx”)
VBScript (“vbscript”, “vbs”)
VB.Net (“vbnet”, “vb”)
Protocol Buffers (“protobuf”)
Cap’n Proto (“capnproto”, “capnp”)
Thrift (“thrift”)
HTTP (“http”, “https”)
Lua (“lua”)
Delphi (“delphi”)
Oxygene (“oxygene”)
Java (“java”, “jsp”)
Processing (“processing”)
AspectJ (“aspectj”)
Fortran (“fortran”, “f90”, “f95”)
C++ (“cpp”, “c”, “cc”, “h”, “c++”, “h++”, “hpp”)
Objective C (“objectivec”, “mm”, “objc”, “obj-c”)
Vala (“vala”)
C# (“cs”, “csharp”)
F# (“fsharp”, “fs”)
OCaml (“ocaml”, “ml”)
D (“d”)
RenderMan RSL (“rsl”)
RenderMan RIB (“rib”)
Maya Embedded Language (“mel”)
SQL (“sql”)
Smalltalk (“smalltalk”, “st”)
Lisp (“lisp”)
Clojure (“clojure”, “clj”)
Scheme (“scheme”)
Ini (“ini”)
Apache (“apache”, “apacheconf”)
Nginx (“nginx”, “nginxconf”)
Diff (“diff”, “patch”)
DOS (“dos”, “bat”, “cmd”)
PowerShell (“powershell”, “ps”)
Bash (“bash”, “sh”, “zsh”)
Makefile (“makefile”, “mk”, “mak”)
CMake (“cmake”, “cmake.in”)
Nix (“nix”)
NSIS (“nsis”)
Axapta (“axapta”)
Oracle Rules Language (“ruleslanguage”)
1C (“1c”)
x86 Assembly (“x86asm”)
AVR assembler (“avrasm”)
VHDL (“vhdl”)
Parser3 (“parser3”)
LiveCode Server (“livecodeserver”)
TeX (“tex”)
Haskell (“haskell”, “hs”)
Erlang (“erlang”, “erl”)
Elixir (“elixir”)
Rust (“rust”, “rs”)
Matlab (“matlab”)
Scilab (“scilab”, “sci”)
R (“r”)
OpenGL Shading Language (“glsl”)
AppleScript (“applescript”, “osascript”)
Vim Script (“vim”)
Brainfuck (“brainfuck”, “bf”)
Mizar (“mizar”)
AutoHotkey (“autohotkey”)
Monkey (“monkey”)
FIX (“fix”)
Gherkin (“gherkin”)
TP (“tp”)
Nimrod (“nimrod”, “nim”)
Swift (“swift”)
G-Code (“gcode”, “nc”)
Q (“k”, “kdb”)
Tcl (“tcl”, “tk”)
Puppet (“puppet”, “pp”)
Stata (“stata”)
XL (“xl”, “tao”)
Roboconf (“graph”, “instances”)
STEP Part 21 (“p21”, “step”, “stp”)
Mercury (“mercury”)
Smali (“smali”)
Verilog (“verilog”, “v”)
Dockerfile (“dockerfile”, “docker”)
PF (“pf”, “pf.conf”)
C/AL (“cal”)
Inform7 (“I7”)
Prolog (“prolog”)
DNS Zone file (“dns”, “zone”, “bind”)
Ceylon (“ceylon”)
OpenSCAD (“openscad”, “scad”)
ARM assembler (“armasm”, “arm”)
~~~


**调用方法**

1. 在([下载页面](https://highlightjs.org/download/))勾选需要的语言，并下载
2. 在html中添加如下代码

~~~ html
<link rel="stylesheet" href="/path/highlightjs/styles/vs.css">
<script type="text/javascript" src="/path/highlightjs/highlight.pack.js"></script>
<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
~~~

**行号**

highlightjs不支持行号，不过可以用jQuery和css解决，代码如下(有些小问题，不建议使用)

~~~ html
<script type="text/javascript">
//numbering for pre>code blocks
$(function(){
    $('pre code').each(function(){
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('pre-numbering');
        $(this)
            .addClass('has-numbering')
            .parent()
            .append($numbering);
        for(i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
});
</script>

<style type="text/css">
pre {
    position: relative;
    border-radius: 3px;
    border: 1px solid #C3CCD0;
    background: #FFF;
    overflow: hidden;
}

pre code {
  display: block;
  padding: 10px 4px;
  overflow-y: auto;
  font-weight: 300;
  font-family: Menlo, monospace;
  font-size: 0.8em;
}

code.has-numbering {
    margin-left: 22px;
}

.pre-numbering {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 22px;
    border-right: 1px solid #C3CCD0;
    border-radius: 3px 0 0 3px;
    background-color: #EEE;
    text-align: right;
    font-family: Menlo, monospace;
    font-size: 0.8em;
    color: #AAA;
}
ul.pre-numbering{
    list-style: none;
    margin: 0;
    padding: 14px 2px 14px 0;
 }
</style>
~~~

也可以自己修改highlightjs增加功能，参考<http://pytalk.ru/forum/highlightjs/1362/>

**相关文档链接**

+ [highlightjs官网](https://highlightjs.org/)
+ [highlightjs使用帮助](https://highlightjs.org/usage/)
+ [highlightjs高级配置文档](http://highlightjs.readthedocs.org/en/latest/api.html#configure-options)
+ [highlightjs github](https://github.com/isagalaev/highlight.js)

### pygments

推荐使用pygments，生成jekyll项目后的_config.yml配置文件加入highlighter: pygments，旧版本是pygments: true。

默认情况下jekyll自带有pygments.rb，但是在windows上使用时还必须安装python和一些工具。

+ 下载并安装[python](https://www.python.org/downloads/)(勾选add pathon to path)
+ 下载并安装[pip](https://pip.pypa.io/en/latest/installing.html)
    - 新建一个pip文件夹，并把get-pip.rb放入文件夹，打开cmd，执行如下命令。
    - `cd C:/pip`  //pip文件夹可以在任意位置
    - `python get-pip.py`
+ 安装pygemetns
    - `python -m pip install Pygments`

**jekyll中使用pygments方法** 

+ _config.yml配置文件加入如下字段
    - highlighter: pygments
+ 使用如下命令生成css样式
    - `pygmentize -f html -S vs > pygments.css`
        * pygentize在C:\Python34\Scripts文件夹下
        * vs表示显示方式，可以是colorful,default,vs,emacs等等
+ 引用样式：在html中加入如下代码
    - `<link rel="stylesheet" href="/yourpath/pygments.css">`

### rouge

> rouge如果显示行号，行内公式也会变成一个表格带上行号，这个不如coderay，十分不爽

**rouge支持的语言和样式**

+ 支持的编程语言
    - Apache, AppleScript, C, CSS, CSharp, Clojure, Coffeescript, CommonLisp, Conf, Cpp, Dart, Diff, ERB, Elixir, Erlang, Factor, Gherkin, Glsl, Go, Groovy, HTML, HTTP, Haml, Handlebars, Haskell, INI, IO, JSON, JSONDOC, Java, Javascript, LLVM, Liquid, LiterateCoffeescript, LiterateHaskell, Lua, Make, Markdown, Matlab, Moonscript, Nginx, Nim, OCaml, ObjectiveC, PHP, Perl, PlainText, Prolog, Properties, Puppet, Python, Qml, R, Racket, Ruby, Rust, SML, SQL, Sass, SassCommon, Scala, Scheme, Scss, Sed, Shell, Slim, Smalltalk, Swift, TCL, TOML, TeX, VimL, VisualBasic, XML, YAML
+ 支持的显示样式
    - 自带支持的样式有：colorful github monokai monokai.sublime thankful_eyes base16  base16.dark base16.light base16.solarized base16.monokai
    - 实际上可以用pygments的样式，100%兼容pygments显示样式，用法同pygments

**rouge 在jekyll中的使用方法**

+ 安装rouge
    - `gem install rouge`
+ _config.yml配置文件加入如下字段
    - highlighter: rouge

**kramdown rouge的使用及配置**

> 如果在jekyll中使用kramdown，则必须通过kramdown使用rouge，否则不能用

方法如下：

在_config.yml中加入如下代码

~~~ yaml
kramdown:
  syntax_highlighter: rouge 
  syntax_highlighter_opts:
    default_lang: c
    css_class: 'highlight'
    line_numbers: true
    start_line: 1
    inline_theme: colorful
    wrap: true
~~~

 
如果使用pygments生成的css样式，则需要删除inline_theme行，并将样式链接进html文档
`<link rel="stylesheet" href="/yourpath/pygments.css">`

**参考文档链接**

+ [rouge github](https://github.com/jneen/rouge)
+ [rouge 文档](http://www.rubydoc.info/gems/rouge/index)
+ [kramdown rouge设置](http://kramdown.gettalong.org/syntax_highlighter/rouge.html)




# 参考资料

+ [jekyll目录结构](http://jekyllcn.com/docs/structure/)
+ [kramedown设置](http://kramdown.gettalong.org/options.html)

+ [.](http://www.360doc.com/content/12/0421/09/1016783_205350218.shtml#)

[highlightsjs](https://highlightjs.org)

[](http://jekyll-windows.juthilo.com/)

[pygments官方文档](http://pygments.org/docs/)