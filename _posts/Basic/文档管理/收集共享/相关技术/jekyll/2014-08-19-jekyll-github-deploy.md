---
layout: post
title: 用jekyll在github上建立网站
category: jekyll
group: PKM
tags: [jekyll]
keywords: [jekyll, github]
description: jekyll在github上部署 建立网站

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-18
---

* 目录
{:toc}

# github简介

GitHub是一个代码托管网站，现在很多开源项目都放在GitHub上。 利用GitHub，可以让全球各地的程序员们一起协作开发。GitHub 提供了一种功能，叫 GitHub Pages, 利用这个功能，我们可以为项目建立网站，当然，这也意味着我们可以通过 GitHub Pages 建立自己的网站。

# github建立网站方法一

简单地说，你在 GitHub 上有一个账号，名为username(任意)， 建立一个项目，名为  username.github.io (固定格式，username与账号名一致)， 项目分支名为 master(固定)，这个分支有着类似下面的 目录结构:

~~~
.
├── index.html
├── _config.yml
├── assets
│   ├── blog-images
│   ├── css
│   ├── fonts
│   ├── images
│   └── javascripts
├── _includes
├── _layouts
├── _plugins
├── _posts
└── _site
~~~

这样，当你访问 http://username.github.io/时，GitHub 会使用 Jekyll 解析用户username名下的username.github.io项目中，分支为master的源代码，为你构建一个静态网站，并将生成的 index.html 展示给你。

> 原来，GitHub认为，一个GitHub账号对应一个用户或者一个组织，GitHub会给这个用户分配一个域名：username.github.io，当用户访问这个域名时， GitHub会去解析username用户下，username.github.io 项目的master分支。

> 仅把_sites中的目标文件放入username.github.io的master分支也一样可以浏览网站。

# github建立网站方法二

一个用户只能有一个username.github.io网站，那我有很多项目，每个项目都需要一个项目网站，该怎么办呢？

GitHub为每个项目提供了域名，例如，你有一个项目名为blog， GitHub为这个项目提供的域名为username.github.io/blog， 当你访问这个域名时，GitHub会去解析username用户下，blog项目的gh-pages分支。

因此，在github的任意项目下创建gh-pages分支，在gh-pages分支下存放网站源代码或目标代码即可生产网站。

# 本地文件上传github方法

1. 软件准备
    + 推荐使用github for win
    + 安装后建议使用Git Shell，直接在命令行输入命名(windows界面还没弄明白怎么用)
2. 本地库建立
    + 方法一：建立本地库
        - `git init`
    + 方法二：克隆远程库
        - `git clone https://github.com/xxx/xxx.github.io.git`
    + 配置个人信息
        - `git config --global user.name` 查看用户名
        - `git config --global user.name "myname"` 设置用户名
        - `git config user.email my@mail.com` 设置邮箱
3. 添加远程库
    + `git remote -v` 查看远程库
    + `git remote add origin https://github.com/xxx/xxx.github.io.git` 添加远程库并制定别名为origin
4. 添加本地文件
    + 将jekyll文件放在当前库文件夹内
    + `git add -A` stages All, 添加所有文件到git库
5. 本地提交
    + `git commit -m "msg"` 本地提交
6. 上传文件
    + `git push origin master` 将本地master分支上传到origin远程库。（建议在github的创建xxx.github.io项目时，不要添加任何文件，否则第一次push需要先fetch）
    + 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。
        - `git push origin` 将当前分支推送到origin主机的对应分支。
        - `git push` 当前分支只有一个追踪分支，那么主机名都可以省略。
        - `git push -u origin master` 如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push。
        - `git push` 如果当前分支只有一个追踪分支，那么主机名都可以省略。
        - `git push -u origin master` 如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push。

7. OK
    + 大约10分钟后，登录`xxx.github.io`就可以显示你的jekyll网站了

# 参考资料

+ [github pages](https://pages.github.com/)
+ [使用 GitHub, Jekyll 打造自己的免费独立博客](http://blog.csdn.net/on_1y/article/details/19259435)