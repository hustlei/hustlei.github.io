---
layout: post
title: c链接库(c语言dll和lib)的编写及调用
category: C
group: Coding
tags: [c语言]
keywords: [链接库, dll, so]
description: c链接库, dll库, so， shared库

author: lileilei

revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# c链接库简介

c链接库分两种，动态链接库(.dll, .so)与静态链接库(.lib, .a)。

> 另外，.net平台的类库(托管dll，managed code)，虽然也是dll后缀，作用也类似于本地代码dll（Native code），但是编写和调用与原生链接库有较大不同，且只能被托管代码调用，本文不作介绍

静态链接库：编译时，连接器找出程序需要的函数，从静态库中拷贝到执行文件。连接成功后，程序不在需要静态库。也就是说，编译完后程序不需要静态库就可以运行。

静态库是一个或者多个obj文件的打包，所以有人干脆把从obj文件生成lib的过程称为Archive(存档)，即合并到一起。比如你链接一个静态库，如果其中有错，它会准确的找到是哪个obj有错，静态lib只是壳子。

动态链接库：程序在运行时，才调用动态链接库。操作系统首先会查看内存中是否已经有该动态链接库的函数，如果有则共享该数据，没有才载入。


# windows平台链接库

## 静态链接库(.lib)

> 静态库其实就是.o中间文件的集合，可以直接链接到新的文件，和源代码重用有相似作用。以.lib作为后缀名
> 
> > 在windows平台，动态链接库dll生成时，也可以同时生产一个.lib文件，这个文件不是静态链接库，而是dll的导入库，仅包含dll里的函数声明信息（方便调用dll），不能作为静态链接库用。

### 静态库编写

在windows平台，静态链接库需要在函数声明前加入`extern`，示例如下：

`extern int test(int a, int b)`

如果cpp源代码，且希望库可以被c代码调用则需要函数声明前加入`extern "C"`，即`extern "C" int test(int a, int b)`。

在传统c中头文件中用`#ifndef __STATIC_H__  #define __STATIC_H__ #endif`形式避免重复引入头文件，c99可以不用这样。

### 静态链接库调用

~~~ c
#include "..\\lib\\libTest.h"
#pragma comment(lib,"..\\debug\\libTest.lib")
//#pargma语句指定与静态库一起链接
//(或者在IDE的lib栏中填入lib文件的路径,在IDE的lib目录栏填入lib所在文件夹目录)
//相对路径适用"/"，windows中可以用"\\"
~~~

静态链接库的使用需要库的开发者提供生成库的.h头文件和.lib文件。

因为静态链接库是将全部指令都包含入调用程序生成的EXE文件中。因此如果用的是静态链接库，那么也就不存在“导出某个函数提供给用户使用”的情况，要想用就得全要！要不就都别要!


## 动态链接库(.dll)

### 动态链接库声明方式

~~~ c
#ifdef _DLL
#define DLLAPI __declspec(dllexport)
#else
#define DLLAPI __declspec(dllimport)
#endif

DLLAPI int test(int a, int b);
//需要导出的函数需要加DLLAPI宏，仅在dll内调用的函数不需要用DLLAPI宏。
DLLAPI int __stdcall test2(int a);
//使用stdcall调用方式，建议采用(C#只支持stdcall调用)。
~~~

__declspec (dllexport)：标志着这个这个函数将成为对外的接口。

简单说明：

+ 使用包含在DLL的函数，必须将其导入。导入操作时通过dllimport来完成的。
+ dllexport和dllimport都是vc（visual C++）和bc（Borland C++）所支持的扩展的关键字。但是dllexport和dllimport关键字不能被自身所使用，因此它的前面必须有另一个扩展关键字\__declspec。通用格式为：`__declspec(specifier)`。
+ 如果用户的DLL被编译成一个C++程序，而且希望C程序也能使用它，就需要增加“C”的连接说明。#define DllAPI extern "C"__declspec(dllexport)，这样就避免了标准C++命名损坏。（当然，如果正在编译的是C程序，就不要加入extern “C”,因为不需要它，而且编译器也不接受它）。

**windows下用cl.exe编译c代码**

~~~ bat
cl /c *.c /D_DLL
link *.obj /out:test.exe /SUBSYSTEM:CONSOLE /MACHINE:X86
link *.obj /dll /implib:test.lib /out:test.dll //验证成功
~~~

或者

~~~ bat
cl *.obj /LD
#或者
cl *.c /LD  /D_DLL /Fe:test.dll //已验证(/D_DLL_E可以用/D "_DLL_E" or /D _DLL)
~~~


### 调用动态链接库

动态链接库调用方式分两种，隐式调用（静态加载）和显式调用（动态加载）。静态加载是在程序开始运行时就加载，动态加载是在需要时才加载。

动态链接库的使用需要库的开发者提供生成的.lib文件和.dll文件，或者只提供dll文件。(如果使用C#.net的P/Invoke方法调用，则不需要.lib文件)

如果只有dll文件，可以用mingw的工具用下列方法导出对应lib文件(在linux上尚不知道怎么安装pexports和dlltool工具)：

~~~ bat
pexports test.dll > test.def
dlltool -D test.dll -d test.def -l test.lib
~~~

也可以使用VC的dumpbin和lib工具

~~~ bat
dumpbin /EXPORTS test.dll > test.def
!  通过dumpbin产生的def文件，需要手工修改成符合DEF格式，如:
!   LIBRARY MyNet.dll
!      EXPORTS
!        ??0IAccessContrl@@QAE@ABV0@@Z  // 这一行也可以只有函数名，根据def文件确定
lib /def:test.def /machine:i386 /out:test.lib
~~~

动态链接库在静态调用时，需要提供.lib（该.lib文件不是静态链接库）文件，称为引入库，它主要提供被Dll导出的函数和符号名称，使得链接的时候能够找到dll中对应的函数映射。

#### 静态链接方式调用dll

1. 包含dll的头文件
2. 采用`#pragma comment(lib,"..\\debug\\libTest.lib")`导入动态库生成的*.lib文件（到入库文件）
3. 将动态链接库生产的.dll文件放到调用的exe或dll同一目录下

#### 动态加载方式调用dll

~~~ c
//test.dll中的int add(int x, int y)函数调用过程
typedef int (* FunPtr)(int,int);
FunPtr funPtr;
Handle handle=LoadLibrary("test.dll");
funPtr=(FunPtr)GetProcAddress(handle, "add");
funPtr(2,3);
FreeLibrary(handle);
~~~

### 动态链接库dll搜索路径

无论调用native dll的代码是native代码还是.net 托管代码，搜索方式都遵循如下规则（与调用托管dll类库不同）

假如安全DLL搜索模式启用，搜索顺序如下：

1. 应用程序所在的路径
2. Windows SYSTEM目录。通过调用GetSystemDirectory函数可以获取这个目录的路径。
3. 16位系统的目录。并没有函数可以获取这个目录的路径，但是它会被查找。
4. Windows目录。通过调用GetWindowsDirectory函数可以获取这个目录的路径。
5. 当前目录
6. PATH环境变量指定的路径。请注意，这并不包括每个应用程序的应用程序路径注册表项中指定。在应用程序路径注册表项的键值并不作为DLL的搜索路径。

假如安全DLL搜索模式禁用，搜索顺序如下：

1. 应用程序所在的路径
2. 当前目录
3. Windows SYSTEM目录。通过调用GetSystemDirectory函数可以获取这个目录的路径。
4. 16位系统的目录。并没有函数可以获取这个目录的路径，但是它会被查找。
5. Windows目录。通过调用GetWindowsDirectory函数可以获取这个目录的路径。
6. PATH环境变量指定的路径。请注意，这并不包括每个应用程序的应用程序路径注册表项中指定。在应用程序路径注册表项的键值并不作为DLL的搜索路径。

+ 用SetDllDirectory函数增加程序加载时的dll搜索路径
+ 如果path环境变量使用的是相对路径，则相对路径个根是打开当前进程的程序的路径。

**延迟加载（delayload）**


延迟加载就是指被指定为delay load的dll只有当需要的时候才会真正载入进程空间。如果要通过设置path环境变量来指定dll加载路径的话最好先**增加设置对应dll 延迟加载** 选项。在调用dll的程序中设置path环境变量后，只有先设置了延迟加载dll，path才会对dll起作用，否则会先调用dll，后设置环境变量，导致出错。

例如：

~~~
root
 |- main.exe
    |- dir1
       |- a.dll
       |- dir2
          |- b.dll

~~~

main调用了a.dll，a.dll调用了b.dll

+ 在main中直接添加dir1和dir2到path路径，可以正常工作
+ 在a.dll中添加dir2路径到path环境变量就必须在链接时设置dll延迟加载选项
+ 在main中设置环境变量时相对路径是要设置为相对root目录。

设置dll延迟加载选项delay load的方法：

1. 在源代码的开头加上`#pragma comment(lib, "DelayImp.lib")`，如果你使用vs也可以在input里面加上这么一项。
2. 在编译的时候加上delay选项（也可以在vs项目属性中设置）
    + `cl x.c /link /DELAYLOAD:xxx.dll`
    + `link x.o /DELAYLOAD:xxx.dll`

**note**

如果包含dll路径的path环境变量在构造函数内声明，则建议写在在static静态构造函数里，因为在.net里会第一时间调用静态构造函数，否则的话可能会先初始化类成员（如果类成员类型是dll内的就悲剧了）

# linux平台链接库

linux平台链接库的编写和正常c函数编写相同，不需要像windows平台特殊声明，仅需要在编译时设置相应选项。

## 静态链接库

静态链接库(static library)也被成为存档文件(archive),是一个存储了多个对象文件（object frile)的单一文件。编译器在得到一个存档文件后，会在这个存档文件中寻找需要的对象文件，将其提取出来，然后与连接一个单独的对象文件一样将其连接到你的程序中。

可以使用 ar 命令创建存档文件。传统上，存档文件使用.a最为后缀名，用lib作为前缀。下面的命令可以将sub.o add.o合并成一个libmyfun.a:

`ar cr libmyfun.a sub.o add.o`//cr 为ar的选项，创建的意思

或者采用如下方式：

~~~ bash
gcc -o add.a -c add.c -static
gcc -o min.a -c min.c -static
ar -rc libmath.a add.a min.a
~~~

调用静态库命令

~~~ bash
# 生成可执行文件
gcc -o test test.o libmath.a -L../lib 
# 或者
gcc -o test test.c -lmath -I../include -L../lib 
~~~

> 其中：-I后为静态库头文件路径，-L后为静态库路径。-I和-L后可以空一格，也可以不空一格直接写路径。
> 
> 其中：-lmath表示要链接的库时libmath.a

## 动态链接库

共享库（shared library，也被称为共享对象shared object或动态链接库dynamically linked library）。当一个共享库被链接到程序中的时候，程序本身并不会包含共享库中出现的代码。程序仅包含一个对共享库的引用。当系统中有多个程序链接到同一个共享库的时候，它们都将引用这个共享库而不是将代码直接包含在自身程序中——正因为如此，我们说这个库被所有这些程序“共享”。

### 创建动态链接库

要创建一个共享库，你必须在编译那些用于生成共享库的对象时为编译器指定–fPIC选项。

> Position Independent Code （PIC）


~~~ bash
# 编译各个.o文件
gcc -c -fPIC -o library1.o library1.c       
gcc -c -fPIC -o library2.o library2.c       
gcc -c -fPIC -o libraryN.o libraryN.c
# 连接成动态库
gcc -shared -o libmydll.so lib1.o lib2.o .... libN.o
~~~

~~~ bash
# 也可以直接使用一条命令
gcc -fPIC -shared -o libtest.so lib_test.c
~~~

### 使用动态链接库

+ `gcc -o main main.c ./libtest.so` //编译时指定搜索路径

+ 先`cp ./libtest /usr/lib` 然后 `gcc -o test test.c libtest.so` //so即使在当前文件夹下也找不到，必须在/usr/lib等环境变量路径下。 

### 动态链接库的路径搜索问题

动态库的搜索路径搜索的先后顺序是：

1. 编译目标代码时指定的动态库搜索路径；
2. 环境变量LD_LIBRARY_PATH指定的动态库搜索路径；
3. 配置文件/etc/ld.so.conf中指定的动态库搜索路径；//只需在在该文件中追加一行库所在的完整路径如"/root/test/conf/lib"即可,然后ldconfig是修改生效。
4. 默认的动态库搜索路径/lib；
5. 默认的动态库搜索路径/usr/lib。