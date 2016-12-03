---
layout: post
title: jekyll疑难杂症
category: jekyll
group: PKM
tags: [jekyll]
keywords: [jekyll]
description: jekyll问题，难题，出错解决

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-18
---

# 不支持自定义插件

把自己编写的plugin插件比如liquid过滤器放在_plugins文件夹内，就可以在jekyll内使用插件。

自定义插件在本地调试可以正常工作，但是在github上是不工作的。因为，github不执行自定义插件。

解决办法：如果不嫌麻烦的话，可以直接上传编译好的网站。


# 不支持中文category

曾经采用了很多方法，包括修改rakefile等基本都没有作用。

最后更换markdown引擎解决问题，推荐采用rdiscount或kramdown引擎，即在_config.yml中增加`markdown: rdiscount`或`markdown: kramdown`

两个引擎各有优点，对中文支持都比较好，但是rdiscount在用mathjax时会出现问题，两个引擎都不支持"Github Flavored Markdown换行"方式。

# mathjax公式问题

rdiscount引擎会吧`$ $`或`$$ $$`内部latex公式的上标转换为`<sup>`标签(mathml)导致公式不能正确显示（redcarpet也有这个问题)，目前没有找到好的方法，只能建议采用kramdown

# 不支持中文文件名和文件夹

目前，文件名只能建议采用英文文件名

文件夹使用中文时，建议更换rdiscount或kramdown引擎，否则会出错或将文件夹名作为分类(category)

# jekyll目录问题

在Maruku和Kramdown中，可以在markdown文件头部yaml之后加入如下代码生成目录

~~~
* 目录
{:toc}
~~~

或者

~~~
1. 目录
{:toc}
~~~ 

`*`号、`1.`表示目录格式是有序列表还是无序列表

# 本地调试Permission denied

在本地使用`jekyll serve`命名后，本应该直接生成网站的，但是可能在jekyll本身没错的情况下提示如下错误

“jekyll 2.5.3 | Error:  Permission denied - bind(2) for 127.0.0.1:4000”

意思是4000端口被占用。有两种解决方法：

1. 改端口
    + 打开_config.yml，加入一行：port:5001(没有被占用的端口均可)即可解决，也就是使用5001端口不使用4000端口。
2. 解除4000端口占用
    + 找出占用4000端口的程序。比如使用360卫士中的360流量防火墙查看占用4000端口的程序。（我自己就经常是因为打开foxitreader导致4000端口被占用）。
    + 在任务管理器中介绍占用端口的程序。

# 参考资料
[github+jekyll搭建博客流水帐](http://yochuo.com/tools/2013/10/24/githubjekyll-da-jian-bo-ke-liu-shui-zhang/)