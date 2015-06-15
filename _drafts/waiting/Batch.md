# 教你如何写BAT命令

------

## 语法基础

### call命令

call的意思为调用．
假如有２个批处理文件a.bat和b.bat．在a.bat文件中输入call命令，则可以在a.bat运行过程中运行b.bat，等 b.bat运行完之后，继续执行a.bat.

call命令格式：

CALL filename [batch-parameters]

batch-parameters    指定批处理程序所需的命令行信息。


### PAUSE命令

暂停批处理程序的执行并显示一条消息，提示用户按任意键继续执行。只能在批处
理程序中使用该命令。


### rem命令

表示此命令后的字符为解释行（注释），不执行，只是给自己今后参考用的（相当于程序中的注释）．

可以用两个冒号来替代rem．如：　::等同于一个rem．但他们有个区别，就是用::作注释的话他是不回显的，即使你打echo　on强制回显也没有用的．

语法： rem [commnet]

### 批处理文件参数：

批处理文件可以使用参数（相当于DOS命令的命令行参数），这需要用到一个参数表示符"%"。

%[1-9]表示参数，参数是指在运行批处理文件时在文件名后加的以空格分隔的字符串。

变量可以从%0到%9，%0表示批处理命令本身，其它参数字符串用%1到%9顺序表示。

### shift命令

因为参数只有１％－９％，但当我们要引用第十个或更多个参数时, 就必须移动DOS 的参数起始指针. 

shift 命令正充当了这个移动指针的角色, 它将参数的起始指针移动到下一个参数.

不推荐用带参数语法.

~~语法： shift [/n] ~~

~~n 的取值是[0-8],且为整数；~~

~~[/n]为可选参数，当赋予n某个值时，就意味着命令从第n个参数开始移位；~~

~~当n赋予的值为0,1或不带有任何命令选项的 shift时，则表示左侧移除一个参数，后面参数填补上去，直至参数为空。 ~~

~~遗憾的是, win9x 和DOS下均不支持 shift 的逆操作. 只有在 nt 内核命令行环境下, shift 才支持 /n 参数, 可以以第一参数为基准返复移动起始指针.~~

------

## 流程控制


### if命令

说得通俗点，if就相当于我们白话里的如果．

if语句一共有3种模式,如下:

```
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command
IF [NOT] ERRORLEVEL <number> command
```

NOT 指定只有条件为 false 的情况下，才执行该命令。

ERRORLEVEL number 如果最后运行的程序返回一个等于或大于指定数字的退出编码，指定条件为 true。

string1==string2  如果指定的文字字符串匹配，指定条件为 true。

EXIST filename  如果指定的文件名存在，指定条件为 true。

command  如果符合条件，指定要执行的命令。如果指定的条件为FALSE，命令后可跟一个执行 ELSE关键字后的命令的 ELSE 命令。

if errorlevel 比较返回码的判断条件并非等于, 而是大于等于.

### choice命令

？？？？

### goto命令

跳到goto所指定的标号(标号即label）

标号用“:字符串”来定义，标号所在行不被执行。

如:

```
goto end
:end
echo this is the end
```

### for命令

语法:

FOR %variable IN (set) DO command [command-parameters]

%variable  指定一个单一字母可替换的参数。在cmd窗口中用%variable，在批处理中用%%variable.
(set)      指定一个或一组文件，或字符串序列。可以使用通配符。
command    指定对每个文件执行的命令。
command-parameters  为特定命令指定参数或命令行开关。

在批处理文件中使用 FOR 命令时，指定变量请使用 %%variable 而不要用 %variable。变量名称是区分大小写的，所以 %i 不同于 %I.

FOR /L %variable IN (start,step,end) DO command [command-parameters]

    该集表示以增量形式从开始到结束的一个数字序列。
    因此，(1,1,5) 将产生序列 1 2 3 4 5，(5,-1,1) 将产生序列 (5 4 3 2 1)

-------

cd dir 

ver
set var="可以取消变量

nul 空文件？

set regfile=%date%    //设置变量，下面出现%regfile%的都自动替换“当天date”
变量,环境变量




set /p

## 命令

### 最基本的东西　@echo off

echo的意思是回显，echo　off意思就是关闭回显（不重新显示输入的命令）．

前面的@表示echo off 这一行也不会回显．

@的另一个功能是在执行完批处理文件时自动恢复命令回显。如果第一句用的是ECHO OFF，那么在执行完批处理文件以后不会显示命令提示符。

echo "some string" 可用于显示信息.



md temp        //建temp目录

del  1.bat         
ren 2.bat 1.bat

^ 前导字符
&
|


%~df0



deltree /y  temp >nul        ////返回上级目录  ，删temp文件夹
:end

exit /b


type

find
findstr
copy
>
>>






reg export hkcu hkcu.reg    //导出注册表
shutdown
net user 


