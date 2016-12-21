---
layout: post
title: jekyll本地安装(windows & ubuntu)
category: jekyll
group: PKM
tags: [jekyll]
keywords: [PKM, 个人知识管理, jekyll]
description: jekyll安装，windows平台和linux平台(ubuntu/xubuntu)

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-18
---

* 目录
{:toc}

# 本地安装jekyll的作用

本地安装jekyll主要是为了测试，如果不需要本地测试的话就不用安装了，直接将编辑好的源文件上传到github就可以显示网站内容了。具体调试方法详见本站“jekyll本地启动”一文。

# jekyll windows 平台安装

## 安装包
+ Ruby（[下载](http://rubyinstaller.org/downloads/)）
+ Jekyll(在ruby里用gem安装，下载是自动的)
+ 可选安装(个人认为使用新版jekyll就不要安装了)
    - Ruby DevKit（[下载](http://rubyinstaller.org/downloads/)）
    - Rouge(或者[pygments](http://jekyll-windows.juthilo.com/3-syntax-highlighting/))

> [Devkit](http://rubyinstaller.org/add-ons/devkit/)是一个能够简化在 Windows上编译即使用Ruby C/C++扩展（如 RDiscount 和 RedCloth）的工具箱。安装jekyll就必须先安装devkit。

> 初学者建议只安装ruby和jekyll


## 安装步骤
1. 安装Ruby，勾选add to path选项。
2. cmd中执行:`gem install jekyll`
    + 如果出现ERROR:  Could not find a valid gem 'jekyll'错误,原因是国内网络不能访问gems网站(rubygems.org;gems.github.com等)

        可以采用如下方式解决（[参考](http://ruby.taobao.org/)）：

        - gem sources --remove https://rubygems.org/
        - gem sources -a https://ruby.taobao.org/
        - gem sources -l

    + 如果出现ERROR: Failed to build gem native extension，参考[网站](http://www.cnblogs.com/puresoul/archive/2011/12/01/2270890.html)

        - echo comspec  确认该变量为cmd.exe
        - REG DELETE "HKCU\Software\Microsoft\Command Processor" /v AutoRun 然后重试
2. 安装devkit（安装rdiscount等需要的）
    + 解压DevKit，假如解压到D:\RubyDevKit
    + cmd中执行:`cd D:\RubyDevKit`
    + cmd中执行:`ruby dk.rb init`
    + 在config.yml文件尾部加入Ruby安装路径（一般情况下已经自动添加了，一般可以跳过此步）
    + cmd中执行:`ruby dk.rb install`
4. cmd中执行:`gem install rouge`
5. cmd中执行:`gem install rdiscount`

> 更换markdown解释器：jekyll默认是用Maruku做markdown的解释器，但Maruku是ruby写的，效率较低，可以换成用c写的RDiscount或kramdown，效率更好。
> 
> 如果使用kramdown就不用再安装rouge和rdiscount了。kramdown默认是安装了的

注：可以在[jekyll-windows](http://jekyll-windows.juthilo.com/)网站上下载绿色版，并可以查看英文安装教程。


# jekyll ubuntu 平台安装

+ sudo apt-get install ruby
+ sudo apt-get install rubygems
+ sudo gem install jekyll
+ sudo gem install rouge
+ sudo gem install rdiscount


# ruby gem 的安装和卸载

+ `gem list` 查看已安装的gem
+ `gem query -remote` 简写为`gem q -R` 查询服务器端可用的gem
+ `gem install gem-name` 在线安装gem
+ `gem install ./gem-name --local` 离线安装gem
+ `gem uninstall gem-name` 卸载gem

# 相关文档链接

+ [jekyll-windows](http://jekyll-windows.juthilo.com/)
+ [jekyll中文帮助](http://jekyll.bootcss.com/)
+ [jekyllrb](http://jekyllrb.com/)