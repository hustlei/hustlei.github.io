---
layout: post
title: linux入门及常用命令
category: 操作系统
tags: [linux]
keywords: [linux]
description: linux常用命令

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

> 本文件仅介绍常用参数，不常用的参数可能会在语法中列出，但不解释。

# 基本操作

### login

功能说明：login的作用是登录系统，它的使用权限是所有用户。也可以通过它更换登录的用户。

语   法：login [用户名][-p][-h 主机名称]

主要参数：

  －p:通知login保持现在的环境参数。
  －h:用来向远程登录的之间传输用户名。

> 如果选择用命令行模式登录Linux的话，那么看到的第一个Linux命令就是login：。


### logout

功能说明：注销用户

### shutdown

功能说明：shutdown命令将安全地将系统关机。 

语　　法：shutdown [-efFhknr][-t 秒数][时间][警告信息]

补充说明：shutdown指令可以关闭所有程序，并依用户的需要，进行重新开机或关机的动作。

主要参数：
 
　-h  关机后关闭电源。 
　-r 　shutdown之后重新启动。 
　-c 　取消后台运行的关机命令。前台正在进行的关机命令可以用Ctrl+C取消。
　-k 　只是送出信息给所有用户，但不会实际关机。 
　-t<秒数> 　设定在多少秒后关机。 
　[时间] 　设定关机的时间。 可以使用`now`表示立即关机。
　[警告信息] 　传送给所有使用者的警告讯息。

### halt

功能说明：关闭系统。（加上-p参数才能关闭电源）

语　　法：halt [-dfinpw]

主要参数：

  -p 　halt之后，执行poweroff。
  -f 　不论目前的runlevel为何，不调用shutdown即强制关闭系统。 （可能会丢失数据？）
  -w 　仅在wtmp中记录，而不实际结束系统。（虚拟关机命令？）

> 与system v保持兼容的指令，事实上一般都是调用shutdown -h实现的。

### poweroff

功能说明：快速关机命令。与system v保持兼容的指令，事实上是调用shutdown -h now实现的。


### reboot

功能说明：重启计算机。

语　　法：reboot [-dfinw]

补充说明：执行reboot指令可让系统停止运作，并重新开机。

主要参数：
  -f 　强制重新开机，不调用shutdown指令的功能。 
  -n 　重开机之前不检查是否有未结束的程序。 
  -w 　仅做测试，并不真的将系统重新开机，只会把重开机的数据写入/var/log目录下的wtmp记录文件。

### uptime

功能说明：查看系统运行时间，查看系统负载。

语   法：uptime

补充说明：输出 1）当前系统时间 2）系统已运行时间 3）已登录用户数量 4）过去1分钟、5分钟、15分钟系统的平均负载量，如0.19表示19%的负载量。

### last

功能说明：显示当月登入系统的用户相关信息。

语　　法：last [-adRx][-f <记录文件>][-n <显示列数>][帐号名称...][终端机编号...]

补充说明：单独执行last指令，它会读取位于/var/log目录下，名称为wtmp的文件，并把该给文件的内容记录的登入系统的用户名单全部显示出来。

参　　数：
　-a 　把从何处登入系统的主机名称或IP地址，显示在最后一行。 
　-d 　将IP地址转换成主机名称。 
　-f <记录文件> 　指定记录文件。 
　-n <显示列数>或-<显示列数> 　设置列出名单的显示列数。 
　-R 　不显示登入系统的主机名称或IP地址。 
　-x 　显示系统关机，重新开机，以及执行等级的改变等信息。

### lastb

功能说明： 列出登入系统失败（非法登录）的用户相关信息。

语   法：lastb [-adRx][-f <记录文件>][-n <显示列数>][帐号名称...][终端机编号...]

补充说明：单独执行lastb指令，它会读取位于/var/log目录下，名称为btmp的文件，并把该文件内容记录的登入失败的用户名单，全部显示出来。参数同last

### dmesg

功能说明：显示开机信息。

语　　法：dmesg [-cn][-s <缓冲区大小>]

补充说明：kernel会将开机信息存储在ring buffer中。您若是开机时来不及查看信息，可利用dmesg来查看。开机信息亦保存在/var/log目录中，名称为dmesg的文件里。

参　　数：

　-c 　显示信息后，清除ring buffer中的内容。 

### tty

功能说明：显示当前终端（控制台）名称。

### 切换控制台

`Alt+Fn`或`Ctrl+Alt+Fn`(Fn为F1~F7)可以再7个控制台之间相互切换，注意从第7控制台(图形界面)切换到其他控制台必须加上`Ctrl`键

### startx

启动 X-Window 系统（在xubuntu中经常不行，建议用lightdm或service lightdm start）

### date

功能说明：显示或设置系统时间与日期。

语　　法：date [-d <字符串>][-u][+%H%I%K%l%M%P%r%s%S%T%X%Z%a%A%b%B%c%d%D%j%m%U%w%x%y%Y%n%t] 或date [-s <字符串>][-u][MMDDhhmmCCYYss] 或 date [--help][--version]

补充说明：第一种语法可用来显示系统日期或时间，以%为开头的参数为格式参数，可指定日期或时间的显示格式。第二种语法可用来设置系统日期与时间。只有管理员才有设置日期与时间的权限。若不加任何参数，data会显示目前的日期与时间。

参　　数：
　%H 　小时(以00-23来表示)。 
　%I 　小时(以01-12来表示)。 
　%K 　小时(以0-23来表示)。 
　%l 　小时(以0-12来表示)。 
　%M 　分钟(以00-59来表示)。 
　%P 　AM或PM。 
　%r 　时间(含时分秒，小时以12小时AM/PM来表示)。 
　%s 　总秒数。起算时间为1970-01-01 00:00:00 UTC。 
　%S 　秒(以本地的惯用法来表示)。 
　%T 　时间(含时分秒，小时以24小时制来表示)。 
　%X 　时间(以本地的惯用法来表示)。 
　%Z 　市区。 
　%a 　星期的缩写。 
　%A 　星期的完整名称。 
　%b 　月份英文名的缩写。 
　%B 　月份的完整英文名称。 
　%c 　日期与时间。只输入date指令也会显示同样的结果。 
　%d 　日期(以01-31来表示)。 
　%D 　日期(含年月日)。 
　%j 　该年中的第几天。 
　%m 　月份(以01-12来表示)。 
　%U 　该年中的周数。 
　%w 　该周的天数，0代表周日，1代表周一，异词类推。 
　%x 　日期(以本地的惯用法来表示)。 
　%y 　年份(以00-99来表示)。 
　%Y 　年份(以四位数来表示)。 
　%n 　在显示时，插入新的一行。 
　%t 　在显示时，插入tab。 
　MM 　月份(必要)。 
　DD 　日期(必要)。 
　hh 　小时(必要)。 
　mm 　分钟(必要)。 
　CC 　年份的前两位数(选择性)。 
　YY 　年份的后两位数(选择性)。 
　ss 　秒(选择性)。 
　-d<字符串> 　显示字符串所指的日期与时间。字符串前后必须加上双引号。 
　-s<字符串> 　根据字符串来设置日期与时间。字符串前后必须加上双引号。 
　-u 　显示GMT。 
　--help 　在线帮助。 
　--version 　显示版本信息。

### time

功能说明：量测特定指令执行时所需消耗的时间及系统资源等资讯。

语   法：time [options] COMMAND [arguments]

参数：

 -o 或 --output=FILE：设定结果输出档。这个选项会将 time 的输出写入 所指定的档案中。如果档案已经存在，系统将覆写其内容。
 -a 或 --append：配合 -o 使用，会将结果写到档案的末端，而不会覆盖掉原来的内容。
 -f FORMAT 或 --format=FORMAT：以 FORMAT 字串设定显示方式。当这个选项没有被设定的时候，会用系统预设的格式。不过你可以用环境变数 time 来设定这个格式，如此一来就不必每次登入系统都要设定一次。
 -p or --portability：这个选项会自动把显示格式设定成为：real %e user %Usys %S：这么做的目的是为了与 POSIX 规格相容。
 -v or --verbose：这个选项会把所有程序中用到的资源通通列出来，不但如一般英文语句，还有说明。对不想花时间去熟习格式设定或是刚刚开始接触这个指令的人相当有用。

补充说明：分别输出真实使用时间，用户模式下使用时间，内核模式下使用时间。

### cal

功能说明：显示公历（阳历）日历。

语   法：cal [参数][月份][年份]

补充说明：如只有一个参数，则表示年份(1-9999)，如有两个参数，则表示月份和年份

主要参数：

 -1 显示一个月的月历
 -3 显示系统前一个月，当前月，下一个月的月历
 -s 显示星期天为一个星期的第一天，默认的格式
 -m 显示星期一为一个星期的第一天
 -j 显示在当年中的第几天（一年日期按天算，从1月1号算起，默认显示当前月在一年中的天数）
 -y 显示当前年份的日历

### bc

功能说明:命令行计算器。 可以做基本的数学运算。

语   法:bc [命令开关]

命令开关:

 -c	仅通过编译。 bc命令的输出被发送到标准输出。
 -l	定义数学函数并且初始化值为20，取代默认值0。
 filename 文件名，它包含用于计算的计算器命令，这不是必须的命令。



# 文件、目录操作

ls
stat              显示指定文件的详细信息，比ls更详细
file
size
cd
pwd
cp
mv
mkdir
rmdir
rm
ln                  创建链接文件
find
locate
whereis
which

> linux文件颜色标记
+ 白色表示一般文件；
+ 蓝色表示目录；
+ 绿色表示可执行文件；
+ 黄色是设备文件，包括block, char, fifo(命名管道)；
+ 红色表示压缩文件；
+ 浅蓝色表示链接文件；
+ 红色闪烁表示链接的文件有问题了；
+ 灰色表示其它文件。

# 磁盘操作

## linux下硬盘

windows操作系统里，硬盘上每个分区对应一个驱动器，并用一个字母标识符(C、D、E...)，用户只需根据这些字母标识符来使用这个分区上的文件和目录。也就是说windows上各个分区的文件结构都是独立的。

Linux上的文件结构是用一个“单树形结构”的目录树来组织的。无论多少个硬盘或硬盘被划分为多少个分区，目录树都只有一个，在这个目录树中，最上层的是根目录(/)，其他所有目录和文件都在根目录下。在linux下，一个目录可能就是一个分区(widows下每个分区就有一个目录树)，分区可以被挂载在目录下。

Linux下，每个硬件设备都是“一个文件”，几乎所有的设备都在/dev目录下。设备及其对应的设备文件名如下:

|设备|设备文件名|说明|示例|
|---|-----|----|---|
|IDE硬盘|hd[a-d]x|"hd"表示分区的设备类型，"[a-d]"为盘号（a为基本盘，b为基本从属盘，c为辅助主盘，d为辅助从属盘）,“x”代表分区，前四个分区用数字1到4表示，它们是主分区或扩展分区，从5开始就是逻辑分区。|hda3表示为第一个ide硬盘上的第三个主分区或扩展分区<br>hdb2表示为第二个ide硬盘上的第二个主分区或扩展分区。|
|SCSI、SATA硬盘及USB|sd[a-p]x|"sd"表示分区所在设备的类型；[a-p]表示盘号，即第几个盘；"x"代表分区，同IDE硬盘相同||
|CD-ROM|hdc/cdrom|
|软盘|fd[0-1]|
|网卡|eth[0-n]|
|打印机|lp[0-2]|

Linux下面每一个硬盘总共最多有16个分区。Linux 规定了主分区（或者扩展分区）占用1-4共4个号码，而逻辑分区占用了5-16共12个号码。

## linux下目录结构

### linux通常目录结构

+ / 根目录:开机时第一个加载的分区，里面有五个必须的子目录:/dev, /lib, /bin, /sbin, /etc
  - /dev   存放外设文件
  - /lib   链接库文件
  - /bin   重要可执行文件
  - /sbin  用户root使用命令存放处
  - /etc   存放配置文件（最好占一个分区）
+ /boot  启动内核文件（最好占一个分区）
+ /var   存放系统记录文件
+ /usr   存放应用程序（推荐占一个分区）
+ /home  普通用户宿主目录（推荐占一个分区）
+ /root  超级用户宿主目录（推荐占一个分区）
+ /mnt   挂载软驱/光驱/U盘等
+ /tmp   临时文件存放
+ /proc  这是一个虚拟目录，它是内存的映射，包括系统信息和进程信息。

### ubuntu还含有的目录

+ /initrd 用来加载启动时临时挂载的initrd.img映像文件，以及载入所要的设备模块目录。
+ /sys 系统设备和文件层次结构，并向用户程序提供详细的内核数据信息。
+ /srv 存储系统提供的服务数据。
+ /media 存放Ubuntu系统自动挂载的设备文件。
+ /opt 作为可选文件和程序的存放目录，否则将无法引导计算机进入操作系统。

### swap分区

linux下的交换分区，和windows的页面文件、Mac OS的虚拟内存是相似的（当没有足够内存时，这些数据就暂时写入交换分区，需要时在调进内存），在使用休眠时也能用到。推荐分区大小为内存的2倍。

## linux下磁盘操作

du
df
mount
unmount

<eject> 弹出（CD/DVD等）
<fdisk> 配置/显示硬盘分区
<mkfs> 格式化磁盘分区
<fsck> 检查/修复磁盘错误

# 文档操作

## 基本操作
echo
cat
touch
more
less
head、tail    显示文件头、尾内容


wc                统计文本中行数、字数、字符数
grep             在文本文件中查找某个字符串
diff

## 编辑

vim
emacs
gedit

## 存档(压缩/解压)

compress
compressdir
uncompress
uncompressdir
//tar
//zip
//unzip
//ar
gzip
bzip2

## 打印
lpr
lprm
lpq
lpc

# 管道、输入输出

|
>
<

经常被用于管道的命令
awk, fold, grep, head, nnkf, pr, sed, sort, tail, tee, tr, uniq, wc


# 系统管理

## 用户

whoami
<who> 查询登录用户信息
<w> 查询登录用户信息
<users> 显示所有登录用户信息
<logname> 显示登录用户帐号
<id> 显示指定用户的ID信息
<finger> 显示指定用户的个人信息
<groups> 显示指定用户的所属组
rusers

<su> 切换到其他用户
exit
<useradd> 追加用户
<adduser> 追加用户
<userdel> 删除用户
<usermod> 修改用户设置 
<chfn> 修改用户私人信息 
<groupadd> 追加组
<groupdel> 删除组
<groupmod> 修改组设置
<passwd> 更改密码


## 进程

&
ps
top                动态显示当前耗费资源最多进程信息
jobs
service

<fg> 把任务切换到前台
<bg> 把任务切换到后台
<kill> 中止进程或任务
<killall> 中止进程或任务
<wait> 等待进程或任务的结束
<at> 设置定时执行任务
<atq> 显示尚未执行的任务
<atrm> 删除定时执行任务
<batch> 在系统负荷减轻的时候执行任务
<nice> 改变优先度并执行任务
<nohup> 在后台执行任务，Logout之后也不退出
<sleep> 休眠一定的时间 


## 系统环境

hostname      显示主机名
uname           显示系统信息
<arch> 显示机器的核心构架（如i386）
<uname> 显示操作系统信息

alias
unalias


<printenv> 显示环境变量
<set> 设置/显示Shell变量
<unset> 释放环境变量
<setenv> 设置环境变量
<unsetenv> 释放环境变量
<export> 设置环境变量
<env> 设置临时环境变量


/etc/profile     系统环境变量

bash_profile     用户环境变量

.bashrc              用户环境变量




# shell


clear              清屏
ctrl+alt+F1  命令行全屏模式
exit
光标移动

hisetory
!string
!!
!n
!!:p
^string ^string

<man> 查询命令手册
<whatis> 显示命令简介
<apropos> 通过关键字查询手册 
<info> 查询超文本命令手册




# 权限
chmod
chgrp
groups


用户及用户组管理

/etc/passwd    存储用户账号

/etc/group       存储组账号

/etc/shadow    存储用户账号的密码

/etc/gshadow  存储用户组账号的密码

useradd 用户名

userdel 用户名

adduser 用户名

groupadd 组名

groupdel 组名

passwd root     给root设置密码


su user              切换用户，加载配置文件.bashrc

su - user            切换用户，加载配置文件/etc/profile ，加载bash_profile

# 网络

ping
talk/ytalk/ctalk/cytalk
mesg
rcp
rlogin
rsh
ftp
mail/elm
/usr/lib/sendmail -bp

ifconfig          查看网络情况

ping                测试网络连通

netstat          显示网络状态信息
scp
ssh


<netstat> 显示当前网络连接状况
<route> 显示/设置路由
<host> 显示网络主机情况
<hostname> 显示/设置当前主机的名字
<ping> 确认和远程机器的连接情况
<traceroute> 显示路由信息
<rwho> 查询网上机器的登陆用户
<ruptime> 查询网上机器的系统运行时间
<rlogin> 登陆到远程机器
<telnet> 用telnet登陆到远程机器
<rsh> 给远程机器发送命令
<rcp> 在远程机器之间复制文件
<mail> 收取邮件
<sendmail> 发送邮件
<mailq> 确认邮件队列
<ftp> 用ftp传输文件 


# 软件包管理

dpkg (Debian Package)管理工具，软件包名以.deb后缀。这种方法适合系统不能联网的情况下。

比如安装tree命令的安装包，先将tree.deb传到Linux系统中。再使用如下命令安装。

sudo dpkg -i tree_1.5.3-1_i386.deb         安装软件

sudo dpkg -r tree                                     卸载软件

 

注：将tree.deb传到Linux系统中，有多种方式。VMwareTool，使用挂载方式；使用winSCP工具等；

APT（Advanced Packaging Tool）高级软件工具。这种方法适合系统能够连接互联网的情况。

依然以tree为例

sudo apt-get install tree                         安装tree

sudo apt-get remove tree                       卸载tree

sudo apt-get update                                 更新软件

sudo apt-get upgrade        

 

将.rpm文件转为.deb文件

.rpm为RedHat使用的软件格式。在Ubuntu下不能直接使用，所以需要转换一下。

sudo alien abc.rpm

# 编译代码

cc/gcc
as


# shell 脚本

格式
开头
 算术运算

变量与流程控制

函数