---
layout: post
title: python通过ctypes调用dll
category: 编程语言
group: Coding
tags: [混合编程]
keywords: [python, ctypes, dll]
description: python 通过 ctypes 调用dll

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# ctypes库简介

python调用c等语言的方法很多如，python c api, boost.python, Swig 等等。ctypes库可以通过一种较为简单的方法，在python中直接调用dll动态链接库，且ctypes是python默认已安装的一个标准库。

# 调用方法

python中如果要通过ctypes模块调用dll，在程序开头需要导入ctypes模块 `import ctypes`

由于调用约定的不同，python调用dll的方法也不同，主要有两种调用规则，即 cdecl和stdcal，还有其他的一些调用约定，关于他们的不同，可以查阅其他资料


假定有一个test.dll文件，含有`int sum(int a, int b)`函数，则调用方法为：

## stdcal的调用方法


~~~ python
import ctypes
dll=ctypes.windll.LoadLibrary('test.dll')
n=dll.sum(1,2)
~~~

~~~ python
import ctypes
dll=ctypes.WinDll('test.dll')
n=dll.sum(1,2)
~~~

~~~ python
from cypes import *
dll=WinDll('test.dll')
sum=dll.sum
n=sum(1,2)
~~~

其中ctypes.windll为ctypes.WinDll类的一个对象，已经在ctypes模块中定义好的。

> 在linux中用相同的方法，只需把dll文件换成so文件
> 
> 在windows下加载so文件或在linux下加载dll文件均无法运行


## cdecl的调用方法

与stdcal调用方式相似

~~~ python
from ctypes import *
dll=CDll('test.dll')
n=dll.sum(1,2)
~~~


# python与dll参数传递

python中仅有4个类型可以直接传递给dll函数

+ None：C语言的NULL指针
+ byte objects：ANSI字符串（char \*）
+ string:unicode字符串(wchar_t \*)
+ integer:C语言整形(int)

传递其他类型参数给dll函数，必须使用ctypes 数据类型

## ctypes基础数据类型

ctypes定义了一系列类型用于兼容c数据类型，这些类型以`c_`开头

|ctypes type | C type | Python type|
|:---------|:---------|:------|
|**c_bool**|_Bool| bool (1)| 
|**c_char**|char|1-character bytes object| 
|**c_wchar**|wchar_t|1-character string|
|c_byte|char|int|
|c_ubyte | unsigned | char int|
|c_short | short | int| 
|c_ushort |unsigned short| int| 
|**c_int**| int| int| 
|c_uint| unsigned int| int |
|c_long| long| int| 
|c_ulong| unsigned long| int| 
|c_longlong| \__int64 or long long |int| 
|c_ulonglong| unsigned \__int64 or unsigned long long |int| 
|c_size_t| size_t| int| 
|c_ssize_t| ssize_t or Py_ssize_t| int| 
|c_float| float| float| 
|**c_double**| double| float| 
|c_longdouble| long double| float| 
|**c_char_p**| char * (NUL terminated)| bytes object or None |
|**c_wchar_p**| wchar_t * (NUL terminated)| string or None| 
|c_void_p| void * |int or None |

可以通过value属性修改ctypes类型数据的值

~~~ python
from ctypes import *
i=c_int(42)
i.value=40
c=c_char(b"x")
c.value=b"y"
s=c_wchar_p("hello")
s.value="hi"
f=c_double(4.3)
~~~

c_char_p和c_wchar_p是字符串指针，在改变value值时，相当于指向另一个地址，原字符串长度是不可变的，可变长度字符串需要用到create_string_buffer()或create_unicode_buffer()

~~~ python
from ctypes import *
p=create_string_buffer(b"hello")
p.value=b"hi"
~~~


## ctypes复杂数据类型

### 数组

~~~ python
n=10
a=(c_double*n)()
a[0]=1
~~~

### 结构

~~~ python
from ctypes import *
class POINT(Structure):
    _fields_=[("x",c_int),
              ("y",c_int)]
pt1=POINT(10,20)
~~~

### 引用

用byref()函数可以实现传递引用参数

~~~
>>> i = c_int()
>>> f = c_float()
>>> s = create_string_buffer(b'\000' * 32)
>>> print(i.value, f.value, repr(s.value))
0 0.0 b''
>>> libc.sscanf(b"1 3.14 Hello", b"%d %f %s",
...             byref(i), byref(f), s)
3
>>> print(i.value, f.value, repr(s.value))
1 3.1400001049 b'Hello'
~~~

### 指针

指针也可以实现传递应用类型，但是指针比byref()功能更多，ctypes的Pointer()类型还可以在python中像数组一样访问

用contents属性可以访问指针内容

~~~
>>> from ctypes import *
>>> i=c_int(42)
>>> pi=pointer(i)
>>> pi.contents
c_long(42)
>>> j=c_int(99)
>>> pi.contents=j
>>> pi[0]
99
~~~


# python调用dll返回值类型

python通过ctypes调用的dll函数返回值，被默认假定为

+ integer

如果返回值是其他类型，必须通过restype属性指定

~~~
>>> strchr = libc.strchr
>>> strchr(b"abcdef", ord("d")) 
8059983
>>> strchr.restype = c_char_p
>>> strchr(b"abcdef", ord("d"))
b'def'
~~~


# python默认已加载库

kernel32, user32, msvcrt是python默认已加载的库，可以通过`cdll.msvcrt.printf()`, `windll.kernel32.GetMessageBoxW()`形式调用

msvcrt是ms标准c库函数

kernel32， user32内函数需要指明是A版（ANSI字符）还是W版（Unicode字符）windows接口。

~~~
GetSystemDirectory = windll.kernel32.GetSystemDirectoryA
buf = create_string_buffer(100)
GetSystemDirectory(buf,100)
print buf.value
MessageBox = windll.user32.MessageBoxW
MessageBox(None, u"Hello World", u"Hi", 0)
~~~


# 其他

通过ctypes使用回调函数，递归数据类型, 空指针等更多功能，可以参考python文档Generic Operating System Services中的ctypes部分