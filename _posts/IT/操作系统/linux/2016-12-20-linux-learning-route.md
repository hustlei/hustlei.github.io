---
layout: post
title: linux学习路径
category: linux
tags: [linux]
keywords: [linux]
description: linux学习路径

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# linux学习阶段
linux服务器运维是学习linux一个重要方向，当然如果只是想作为个人pc也可以参考运维学习过程，毕竟运维学习的都比较深。

运维学习需要分为四个阶段，linux初级入门->linux中级进阶->linux高级提升，和资深方向细化。

# 第一阶段：初级入门
　　初级阶段需要把linux学习路线搞清楚，任何学习都是循序渐进的，所以学linux也是需要有一定的路线。

个人建议学习的路线如下：
　　
1. Linux基础知识、基本命令（起源、组成、常用命令如cp、ls、file、mkdir等常见操作命令）
2. Linux用户及权限基础
3. Linux系统进程管理进阶
4. linux高效文本、文件处理命令（vim、grep、sed、awk、find等命令）
5. shell脚本入门（可边练习边学习）

# 第二阶段:中级进阶
中级进阶需要在充分了解linux原理和基础知识之后，对上层的应用和服务进行深入学习，其中说到服务肯定涉及到网络的相关知识，是需要花时间学习的。

1. TCP/IP网络基础（差不多CCNA、NP的知识就够用）
2. Linux企业常用服务（如dns、http、ftp、mail、nfs等）
3. Linux企业级安全原理和防范技巧（系统性能/安全、安全威胁模型和保护方法
4. 加密/解密原理及数据安全、系统服务访问控制及服务安全基础
5. iptables安全策略构建
6. shell脚本进阶（主要是结合一些应用，写一些案例）
7. MySQL应用原理及管理入门（能管理和搭建一个个人博客站点）

学到这里，掌握的基本技能，已经够用了，已经能做一些基础的运维工作和简单维护了。

# 第三阶段：高级提升
1. http服务代理缓存加速（其中主要学习varnish、nginx缓存系统，要对CDN的知识有所了解。）
2. 企业级负载集群（其中主要学习nginx、haproxy、lvs要对主要知识熟练掌握，对负载均衡算法有清晰认识，）
3. 企业级高可用集群 （其中需要对keepalived，heartbeat等进行深入讲解）
4. 运维监控zabbix详解（主要是zabbix、cacti、nagios等监控系统，现在用的比较多的是zabbix）
5. 运维自动化学习（需要学一些开源运维自动化工具的使用如ansible、puppet、cobbler等运维自动化工具）

能掌握到这里，基本能处理搞定很多工作了，可以去面试高级运维工程师，差不多薪资能达到12-18K左右

# 第四阶段：资深方向进阶
1. 大数据方向（需要对hadoop、storm等常见开源大数据系统需要深入了解）
2. 云计算方向（主要是openstack这套东西，当然像一些kvm等虚拟化技术，也是需要掌握的，现在docker也比较流行）
3. 运维开发（主要是python运维开发）
4. 自动化运维（在之前自动化基础上做深入）
5. 运维架构师（主要需要广度，差不多5年左右以上经验，可以担当此职位）

另外，再推荐个不错的微信账号，经常会发一些linux书籍和学习视频，添加《马哥linux运维》可关注这个微信。

# 参考文档
<http://www.ha97.com/2713.html>