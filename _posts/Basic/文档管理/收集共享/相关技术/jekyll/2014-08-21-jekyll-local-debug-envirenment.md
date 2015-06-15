---
layout: post
title: jekyll本地启动
category: jekyll
group: PKM
tags: [jekyll]
keywords: [jekyll]
description: jekyll本地调试

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-18
---

# jekyll本地运用方式简介

## jekyll本地预览

+ cd D:\jekyll
+ jekyll serve(or jekyll server)
+ 浏览http://localhost:4000
+ jekyll serve --no-watch  不监视当前jekyll内代码变化，监视变化时在代码变化后会自动重新编译文档

## jekyll本地仅编译

+ jekyll build
+ jekyll build -d <destination>
+ jekyll build -s <source> -d <destination>