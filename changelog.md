## Changelog

Changelog不记录_post文件夹相关修改

- **v0.1.14:2019.01.09**
    - **Features**
    - 删除多余的搜索引擎认证，仅留baidu 360 bing
    - 移动所有图片到coding.net，修改图片存放路径配置为site.img
    - **BugFixed**
    - post中用{{site.img}}/url应用图片，修复图片不能访问问题

- **v0.1.13:2019.01.08**
    - **Features**
    - 修改post导航条，为"Home>group>category1,category2>正文"格式
    - 导航条独立为widget
    - 删除CNAME, product_url由name.ml修改为name.github.io
    - **BugFixed**
    - 修复各个group page错误的问题。


- **v0.1.12:2019.01.07**
    - **Features**
    - gittalk拆分为script和container两部分。因为script部分需要在jquery后加载
    - **BugFixed**
    - 修复了gittalk不能工作的问题。
    
- **v0.1.11:2019.01.06**
    - **Features**
    - 修改commit为gittalk
    - 删除host by code pages
    - 配置文件中root从hustlei.ml修改为hustlei.github.io
    - 修改readme
    - **BugFixed**
    - 修改qrcode


- **v0.1.10:2019.01.05**
    - **Features**
    - 修改网站description，进行简化
    - **BugFixed**
    - 修改group2-4页面错误

- **v0.1.9:2019.01.05**
    - **Features**
    - 整理版本命令
    - 修改group配置混乱的问题，全部用配置文件代替硬编码

- **v0.1.8:2016.05.05**
    - **Features**
    - 把mathjax的{% if page.content contains "$" %}取消，不再判断是否含有$,因为网站只会下载一次mathjax.js
 

- **v0.1.7:2016.05.04**
    - **Features**
    - 用css给每个文档标题添加序号，给文档目录也添加序号
    - 添加代码高亮设置（kramdown+rouge）

    - **Bug Fixes**
    - @hustlei 添加group后，首页文章分类下链接不可用，修复该bug.
 
- **v0.1.6:2015.05.04**
    - **Features**
    - @hustlei 自己编写squeezenewline插件（liquid过滤器），用于压缩多个空行，用于首页（可惜在github上不支持）

- **v0.1.5:2015.05.04**
    - **Features**
    - atom.xml内title属性进行xmlescape处理，避免search插件等出现解析错误
    - @hustlei 所有post/\*.md文件yaml头增加group, keywords, description属性

    - **Bug Fixes**
    - @hustlei 修复searchbox出错无提示，搜索内容页面没有反应的问题。

- **v0.1.4:2015.05.04**
    - **Features**
    - @hustlei 清理外部引用代码，加快网页速度，减少重复引用。
    - 将分享悬浮按钮添加到整个网站。删除模板中post.html内的widgets/share_buttons引用，在default.html中添加baidu分享悬浮按钮引用。
    - 删除default.html中japan_clock引用，并删除该widgets。
    - 删除default.html中revolvermaps引用，保留该widgets。
    - 去除页面左边栏内的微博关注按钮
    - title改为网站名+当前网页名
    - 添加<meta name="Robots" Content="All">到default.html。

- **v0.1.3:2015.05.02**
    - @hustlei 保留没有用到的一部分文件，未用到的文件有
        + CNAME
        + _plugins
        + pages.html
        + archive.html
        + sitemap.xml
    - 删除多余的框架文件，包括resource（播放器等），theme，widgets以及assets中的多余文件等。
    - 去掉rss，同时删除rss.xml。
    - 去掉百度统计和clicki统计插件，把两个网站链接做在友情链接里。
    - 修改README文件内容。

- **v0.1.2:2015.05.01**
    - **Features**
    - 把微博墙合并到关于我页面内，去掉联系我的内容。
    - categories配合group，形成两级分类。导航菜单用取消“分类”，用group（pkm、IT、design、life四个菜单）的内容代替。

- **v0.1.1:2014.12.01**
    - **Features**
    - 取消天气等插件

- **v0.1.0 : 2014.08.24**
    - **Features**
    - 引用基于 bootstrap 的jekyll模板用于在hustlei.github.io存储个人文档.
    - @hustlei 将除index外网页放入pages文件夹.

    - **Bug Fixes**
    - @hustlei 去除不能连接的plugins.


  
