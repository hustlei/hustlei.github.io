---
layout: post
title: eric安装
category: python
group: Coding
tags: [eric]
keywords: [eric, eric6, python]
description: python集成开发环境 eric6 安装

author: lileilei
revision:
    editor: lileilei
    date: 2017-10-1
---

+ 目录
{:toc}

# 简介
截止2017.10 eric最新版本为eric6，支持qt5.x及pyqt5.x。

eric6支持python3.x，也可以使用python2.7版本。


# 安装方法一
## 下载

+ Python[[下载]](https://www.python.org/downloads/)
    - 安装的时候选中pip安装选项。
+ QT[[下载]](https://www.qt.io/download-open-source)
    - 建议下载opensource版本，需要注册，可以点击View All Downloads选择要下载的版本
    - 貌似只有x86版本，没有64位版本。
+ eric[[下载]](https://sourceforge.net/projects/eric-ide/files/eric6/stable/)
    - windows请下载zip包。
    - 下载eric6-xx.zip及eric6-i18n-zh_CN-xx.zip

qt下载地址<https://download.qt.io/official_releases/qt/5.9/5.9.2/>

## 安装
1. 安装python
2. 安装QT
3. 安装pyqt
    - 打开cmd，直接使用命令`pip3 install PyQt5`
4. 安装QScintilla
    - 打开cmd，直接使用命令`pip3 install QScintilla`
5. 安装eric6
    - 解压eric6-xx.zip和eric6-i18n-zh_CN-xx.zip到同一文件夹下，在解压eric6-i18n-zh_CN-xx.zip时应该会对eric6-xx文件夹的部分文件做覆盖操作，点全部替换即可。
    - 进入解压的目录文件夹，执行python install.py，或双击install.py执行安装，最好使用管理员权限
6. 安装完成之后文件夹下生成eric6.bat,双击即可启动eric6
    - 如果没有找到eric6.bat,请到python目录下Scripts文件夹内找
    - 如果还没有找到，直接双击eric文件夹下eric.py文件启动eric。

注：pip容易超时请用国内镜像安装，例如`pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple pyqt5`

此种方法容易产生找不到qt设计师(designer)的问题。

# 安装方法二（推荐）

## 文件准备

+ Python下载:https://www.python.org/downloads/
+ pyqt5下载（PyQt5-5.6-gpl-Py3.5-Qt5.6.0-x32-2.exe ）：https://sourceforge.net/projects/pyqt/files/PyQt5/PyQt-5.9/
+ Eric6下载：https://sourceforge.net/projects/eric-ide/files/eric6/stable/

注意：python的版本及位数(32or64)要和pyqt相同。

## 安装

+ 安装python3.x
+ 双击PyQt5-5.6-gpl-Py3.5-Qt5.6.0-x64-2.exe安装文件
+ 解压eric6-xx.zip到python/Lib/site-packages目录下（其他目录也可以），eric6-i18n-zh_CN-xx.zip 同样解压到该目录，提示覆盖时覆盖即可。在eric6-xx目录下运行python install.py install
+ 到python目录下Scripts文件夹内双击eric6.bat。

如果python版本或位数和pyqt不一致安装时会出错

参考http://blog.csdn.net/weiaitaowang/article/details/52045360

# 参考链接
+ http://eric-ide.python-projects.org/eric-download.html
+ http://www.cnblogs.com/archisama/p/5454762.html
+ http://blog.csdn.net/sasoritattoo/article/details/10020547
+ https://segmentfault.com/q/1010000000162410
+ [pyqt5 qt设计师designer缺失的问题]http://blog.csdn.net/tumin999/article/details/54313820
