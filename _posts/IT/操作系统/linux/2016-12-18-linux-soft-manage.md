---
layout: post
title: linux各发行版软件管理工具
group: IT
category: linux
tags: [linux, 操作系统]
keywords: [linux, apt, apt-get, yum, pacman, dpkg, rpm]
description: linux软件管理工具, apt, apt-get, yum, pacman, dpkg, rpm, zypp, urpmi, slzckpkg, emerge, pisi

author: lileilei
revision:
    editor: lileilei
    date: 2016-12-18
---

* 目录
{:toc}

# Linux包管理工具简介
使用 Linux 系统总是免不了要接触包管理工具。比如

+ Debian/Ubuntu 的 apt
+ openSUSE 的 zypp
+ Fedora 的 yum
+ Mandriva 的 urpmi
+ Slackware 的 slackpkg
+ Archlinux 的 pacman
+ Gentoo 的 emerge
+ Foresight 的 conary
+ Pardus 的 pisi，等等

DistroWatch 针对上述包管理器的主要用法进行了总结，对各位 Linux 用户来说具有很好的参考作用。

> 对于我个人来说，主要关心apt、yum和pacman。
>
> > 流行的桌面系统linux mint、ubuntu中使用apt。
> > 大名鼎鼎的服务器系统Redhat、CentOS使用yum。
> > msys2默认集成了pacman哦。

本文中并没有提到rpm,dpkg等工具，并不是因为它们不常用，事实上rpm是yum的底层工具；dpkg是apt的底层工具。

# 主流Linux发行版的软件包管理对比速查表

<table>
<tbody>
<tr>
<th>任务</th>
<th>apt<br>
Debian, Ubuntu</th>
<th>zypp<br>
openSUSE</th>
<th>yum<br>
Fedora, <a href="http://www.ha97.com/tag/centos">CentOS</a></th>
</tr>
<tr>
<td>安装包</td>
<td>apt-get install &lt;pkg&gt;</td>
<td><a href="http://www.ha97.com/tag/zypper">zypper</a> install &lt;pkg&gt;</td>
<td>yum install &lt;pkg&gt;</td>
</tr>
<tr>
<td>移除包</td>
<td>apt-get remove &lt;pkg&gt;</td>
<td>zypper remove &lt;pkg&gt;</td>
<td>yum erase &lt;pkg&gt;</td>
</tr>
<tr>
<td>更新包列表</td>
<td>apt-get update</td>
<td>zypper refresh</td>
<td>yum check-update</td>
</tr>
<tr>
<td>更新系统</td>
<td>apt-get upgrade</td>
<td>zypper update</td>
<td>yum update</td>
</tr>
<tr>
<td>列出源</td>
<td>cat /etc/apt/sources.list</td>
<td>zypper repos</td>
<td>yum repolist</td>
</tr>
<tr>
<td>添加源</td>
<td>(edit /etc/apt/sources.list)</td>
<td>zypper addrepo &lt;path&gt; &lt;name&gt;</td>
<td>(add &lt;repo&gt; to /etc/yum.repos.d/)</td>
</tr>
<tr>
<td>移除源</td>
<td>(edit /etc/apt/sources.list)</td>
<td>zypper removerepo &lt;name&gt;</td>
<td>(remove &lt;repo&gt; from /etc/yum.repos.d/)</td>
</tr>
<tr>
<td>搜索包</td>
<td>apt-<a href="http://www.ha97.com/tag/cache">cache</a> search &lt;pkg&gt;</td>
<td>zypper search &lt;pkg&gt;</td>
<td>yum search &lt;pkg&gt;</td>
</tr>
<tr>
<td>列出已安装的包</td>
<td>dpkg -l</td>
<td>rpm -qa</td>
<td>rpm -qa</td>
</tr>
</tbody>
</table>

<table>
<tbody>

<tr>
<th>任务</th>
<th>urpmi<br>
Mandriva</th>
<th>slackpkg<br>
Slackware</th>
<th>pacman<br>
Arch</th>
</tr>
<tr>
<td>安装包</td>
<td>urpmi &lt;pkg&gt;</td>
<td>slackpkg install &lt;pkg&gt;</td>
<td>pacman -S &lt;pkg&gt;</td>
</tr>
<tr>
<td>移除包</td>
<td>urpme &lt;pkg&gt;</td>
<td>slackpkg remove &lt;pkg&gt;</td>
<td>pacman -R &lt;pkg&gt;</td>
</tr>
<tr>
<td>更新包列表</td>
<td>urpmi.update -a</td>
<td>slackpkg update</td>
<td>pacman -Sy</td>
</tr>
<tr>
<td>更新系统</td>
<td>urpmi –auto-select</td>
<td>slackpkg upgrade-all</td>
<td>pacman -Su</td>
</tr>
<tr>
<td>列出源</td>
<td>urpmq –list-media</td>
<td>cat /etc/slackpkg/mirrors</td>
<td>cat /etc/pacman.conf</td>
</tr>
<tr>
<td>添加源</td>
<td>urpmi.addmedia &lt;name&gt; &lt;path&gt;</td>
<td>(edit /etc/slackpkg/mirrors)</td>
<td>(edit /etc/pacman.conf)</td>
</tr>
<tr>
<td>移除源</td>
<td>urpmi.removemedia &lt;media&gt;</td>
<td>(edit /etc/slackpkg/mirrors)</td>
<td>(edit /etc/pacman.conf)</td>
</tr>
<tr>
<td>搜索包</td>
<td>urpmf &lt;pkg&gt;</td>
<td>—</td>
<td>pacman -Qs &lt;pkg&gt;</td>
</tr>
<tr>
<td>列出已安装的包</td>
<td>rpm -qa</td>
<td>ls /var/log/packages/</td>
<td>pacman -Qii</td>
</tr>
</tbody>
</table>

<table><tbody>

<tr>
<th>任务</th>
<th>conary<br>
rPath, Foresight</th>
<th>pisi<br>
Pardus</th>
<th>emerge<br>
Gentoo</th>
</tr>
<tr>
<td>安装包</td>
<td>conary update &lt;pkg&gt;</td>
<td>pisi install &lt;pkg&gt;</td>
<td>emerge &lt;pkg&gt;</td>
</tr>
<tr>
<td>移除包</td>
<td>conary erase &lt;pkg&gt;</td>
<td>pisi remove &lt;pkg&gt;</td>
<td>emerge -C &lt;pkg&gt;</td>
</tr>
<tr>
<td>更新包列表</td>
<td></td>
<td>pisi update-repo</td>
<td>emerge –sync | layman -S [for added repositories]</td>
</tr>
<tr>
<td>更新系统</td>
<td>conary updateall</td>
<td>pisi upgrade</td>
<td>emerge -NuDa world</td>
</tr>
<tr>
<td>列出源</td>
<td></td>
<td>pisi list-repo</td>
<td>layman -L</td>
</tr>
<tr>
<td>添加源</td>
<td></td>
<td>pisi add-repo &lt;name&gt; &lt;path&gt;</td>
<td>layman -a</td>
</tr>
<tr>
<td>移除源</td>
<td></td>
<td>pisi remove-repo &lt;name&gt;</td>
<td>layman -d</td>
</tr>
<tr>
<td>搜索包</td>
<td>conary query &lt;pkg&gt;</td>
<td>pisi search &lt;pkg&gt;</td>
<td>emerge –search</td>
</tr>
<tr>
<td>列出已安装的包</td>
<td>conary query</td>
<td>pisi list-installed</td>
<td>cat /var/lib/portage | more</td>
</tr>
</tbody></table>