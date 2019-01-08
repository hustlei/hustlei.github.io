# Introduction

本博客基于[Jekyll-Bootstrap](http://jekyllbootstrap.com) , 主要为日常coding,design知识整理备忘，同时也公开共享。所有内容遵循[CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/)协议。

## Usage

### 源码目录结构

~~~
.
|- _config.yml     #配置文件
|- index.html      #主页文件
|- pages           #和index.html处于相同地位的网站页面
|  |- archive.html
|  |- tags.html
|  |- search.html
|  |- about.html
|- _drafts         #草稿文件夹
|- _posts          #源文件夹
|  |- file.md
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
|- sitemap.xml
|- Rakefile
~~~

+ 已用widgets文件
    - back_top_button
    - baidu_share
    - search_box
    - weiboxiu
    - statcounter
    - ————
    - links_list
    - categories_list
    - comments
    - recent_posts_list
    - recent_visitors
+ 未用widgets说明
    - clock：时间
    - weather: 天气插件，比较慢，用途不大
    - tag_cloud
    - 3d_tag_cloud
    - mathjax: 暂时使用了网络地址
    - revolvermaps: 网站统计地图，耗流量暂时不用
    - analytics: 百度统计
    - clickincn： clicki统计 

### 操作说明

> 下划线`_`开头的文件夹是jekyll处理的对象
> 
> 普通文件夹下文件在liquid语句编译后直接按目录结构复制到_site文件夹

+ \_config.yml是整个jekyll的配置文件,没有的话就用默认设置
+ \_site文件夹是默认的静态网站输出位置
+ \_layouts文件夹内文件不需要修改。因为模板文件仅仅是简单的引用了themes内的模板文件。模板文件有三个
    - post: post文档的默认模板
    - page: 列出文档的模板，本站用于除index外的pages文件夹下html文件
    - default: 主页模板
+ \_includes/themes文件夹内是themes文件，因为_layouts内设置了themes，因此thems内的模板才是jekyll的真实模板文件
+ \_includes/widgets文件夹内是一些额外功能代码，一般在themes内通过{% include widget_name %}引用。


### post文档yaml头建议

~~~
layout: 文档模板
title: 文档标题
subtitle: 文档小标题
category: 分类
group: 文档分组(大分类)
tags: 文档标签
tagline: 宣传标语
keywords: 关键字
description: 说明
author: 作者
revised:
   - editor: 编辑人
     date: 编辑时间
   - editor: 编辑人
     date: 编辑时间
~~~

## Contributing

To contribute to the framework please make sure to checkout your branch based on `jb-development`!!
This is very important as it allows me to accept your pull request without having to publish a public version release.

Small, atomic Features, bugs, etc.
Use the `jb-development` branch but note it will likely change fast as pull requests are accepted.
Please rebase as often as possible when working.
Work on small, atomic features/bugs to avoid upstream commits affecting/breaking your development work.

For Big Features or major API extensions/edits:
This is the one case where I'll accept pull-requests based off the master branch.
This allows you to work in isolation but it means I'll have to manually merge your work into the next public release.
Translation : it might take a bit longer so please be patient! (but sincerely thank you).


## License

[GPLv2](http://www.gnu.org/licenses/gpl-2.0.html)

[CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/)
