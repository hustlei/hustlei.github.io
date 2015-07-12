---
layout: post
title: C# .net 调用dll
category: 编程语言
group: IT
tags: [.net]
keywords: [C#, dll]
description: C# 调用dll

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# C# .net dll简介

dll文件在windows上通常是指动态链接库文件，但是在.Net平台上dll为托管代码，虽然同样是为了共享代码，但不再是传统意义上的动态链接库了。

在.NET中，引入了一个程序集的概念，指经由编译器编译得到的，供CLR进一步编译执行的那个中间产物，在WINDOWS系统中，它一般表现为.dll,或者是.exe的格式。因此，在.Net中dll文件为程序集，也叫类库，是托管代码，.Net可以像动态链接库一样引用它，但是非托管代码，如C程序等无法直接调用该dll。

本文总结了.Net平台下调用.dll类库和动态链接库(本地dll，native code)文件的基本方法。

# .Net程序集(DLL类库文件）调用

## .Net程序集直接引用

在visual studio中引用类库非常方便，不仅可以直接浏览类库内的类和函数，还可以智能补全引用的函数。

+ 解决方案资源管理器中找到“引用”=>右键=>添加引用=>浏览需要引用的类库
+ 在代码前部用using语句引用类库的命名空间（可以不这样做，但会导致引用函数时，需要输入很长的名称）
+ 然后在代码中直接调用类库内的函数

## .NET利用反射的动态加载和卸载程序集(DLL类库文件)

反射提供了封装程序集、模块和类型的对象（Type 类型）。可以使用反射动态创建类型的实例，将类型绑定到现有对象，或从现有对象获取类型并调用其方法或访问其字段和属性。

需要引入System.Reflection命名空间，具体步骤如下：

~~~ csharp
Assembly dllx = Assembly.Load("file.dll");
object obj=dllx.CreateInstance("dllClass");
//调用没有参数的方法
object result=obj.GetType().GetMethod("dllmethod").Invoke(obj,null);
//调用有参数的方法
object result=obj.GetType().GetMethod("dllmethod").Invoke(obj,a,b);
~~~

object可以用var代替。使用object的效率低，在以上代码中建议用var。

> 在C#中，所有类型（预定义类型、用户定义类型、引用类型和值类型）都直接或间接从 Object 继承。可以将任何类型的值赋给 object 类型的变量。将值类型的变量转换为对象的过程称为“装箱”。将对象类型的变量转换为值类型的过程称为“拆箱”。
> 
> 而Var则根据赋值的类型自动设置变量的类型，如：`var intinput=5;`等于`int intinput =5`, `var intinput ="5.5"`等于`string intinput ="5.5"` 

var的使用情况 

1. 必须在定义时初始化。也就是必须是`var s = “abcd”`形式，而不能是：`var s; s = “abcd”;`  
2. 一但初始化完成，就不能再给变量赋与初始化值类型不同的值了。  
3.   var要求是局部变量。  
4.   使用var定义变量和object不同，它在效率上和使用强类型方式定义变量完全一样。  


# .NET调用c动态链接库(Native dll)

## P/Invoke调用Native dll

需要引用InteropServices命名空间：

~~~ csharp
using System.Runtime.InteropServices;
~~~

### 简单P/Invoke调用
.NET调用P/Invoke是完成这一任务的最常用方法。另一种方法是使用 Managed Extensions to C++ 来包装函数(在此不作介绍)。

例如，我们要调用kernel32.dll中的beep函数，该函数在MSDN中的原型为：

~~~ cpp
BOOL Beep(DWORD dwFreq, DWORD dwDuration)
~~~

在.NET调用时需要编写这一原型，因此需要把数据类型转换为相应的.NET类型。

以C#为例，由于DWORD是4字节的整数，因此可以用int或uint作为C#对应类型。bool类型与Bool对应。因此可以用C#编写该函数原型如下：

~~~ chh
public static extern bool Beep(int frequency, int duration);
~~~

使用extern指明该函数在别处。此原型将告诉运行时如何调用函数；现在我们在原型中添加DllImport属性告诉运行时在何处找到该函数。

~~~ csharp
[DllImport("kernel32.dll")]
public static extern bool Beep(int frequency, int duration);
~~~

> 需要在程序声明中使用System.Runtime.InteropServices命名空间
> 
> DllImport 允许您调用 Win32 中的任何代码。
> 
> 在C#中，函数只支持\__stdcall的调用方式。**如果要调\__cdecl的c/C++函数，要在DllImport里面指定 CallingConvention = CallConvention.Cdecl。**


### windows和.net数据类型对应表

| Win32 Types                                                          | Specification                   | CLR Type      |
|----------------------------------------------------------------------|---------------------------------|---------------|
| `char, INT8, SBYTE, CHAR`                                            | 8-bit signed integer            |`System.SByte` |
| `short, short int, INT16, SHORT`                                     | 16-bit signed integer           |`System.Int16` |
| `int, long, long int, INT32, LONG32, BOOL, INT`                      | 32-bit signed integer           |`System.Int32` |
| `__int64, INT64, LONGLONG`                                           | 64-bit signed integer           |`System.Int64` |
| `unsigned char, UINT8, UCHAR, BYTE`                                  | 8-bit unsigned integer          |`System.Byte`  |
| `unsigned short, UINT16, USHORT, WORD, ATOM, WCHAR, __wchar_t`       | 16-bit unsigned integer         |`System.UInt16`|
| `unsigned, unsigned int, UINT32, ULONG32, DWORD32, ULONG, DWORD, UINT`| 32-bit unsigned integer        |`System.UInt32`|
| `unsigned __int64, UINT64, DWORDLONG, ULONGLONG`                     | 64-bit unsigned integer         |`System.UInt64`|
| `float, FLOAT`                                                       | Single-precision floating point |`System.Single`|
| `double, long double, DOUBLE`                                        | Double-precision floating point |`System.Double`|



### DllImport属性使用方法

+ DllImport只能放置在方法声明上
+ 用DllImport 属性修饰的方法必须具有 extern 修饰符
+ DllImport具有单个定位参数：指定包含被导入方法的 dll 名称的 dllName 参数
+ DllImport具有五个命名参数：
    - CallingConvention 参数指示入口点的调用约定。如果未指定 CallingConvention，则使用默认值 CallingConvention.Winapi，也就是`__stdcall`，这是C#的默认调用方式，不用显式声明。
    - CharSet 参数指示用在入口点中的字符集。如果未指定 CharSet，则使用默认值 CharSet.Auto
    - EntryPoint 参数给出 dll 中入口点的名称。如果未指定 EntryPoint，则使用方法本身的名称
    - ExactSpelling 参数指示 EntryPoint 是否必须与指示的入口点的拼写完全匹配。如果未指定 ExactSpelling，则使用默认值 false
    - PreserveSig 参数指示方法的签名应当被保留还是被转换。当签名被转换时，它被转换为一个具有 HRESULT 返回值和该返回值的一个名为 retval 的附加输出参数的签名。如果未指定 PreserveSig，则使用默认值 true
    - SetLastError 参数指示方法是否保留 Win32"上一错误"。如果未指定 SetLastError，则使用默认值 false


### 复杂函数P/Invoke调用

如果要调用的函数参数是指针或是地址变量，怎么办？

对于这种情况可以使用C#提供的非安全代码来进行解决，但是，毕竟是非托管代码，垃圾资源处理不好的话对应用程序是很不利的。所以还是使用C#提供的ref以及out修饰字比较好。

例如：

`int __stdcall FunctionName(unsigned char &param1, unsigned char *param2)`

在C#中对其进行调用的方法是：

~~~csharp
[DllImport("file.dll")]
extern static int FunctionName(ref byte param1, ref byte param2);
~~~

看到这，可能有人会问，&是取地址，*是传送指针，为何都只用ref就可以了呢？一种可能的解释是ref是一个具有重载特性的修饰符，会自动识别是取地址还是传送指针。

在实际的情况中，我们利用参数传递地址更多还是用在传送数组首地址上。如：

`byte[] param1 = new param1(6);`

在这里我们声明了一个数组，现在要将其的首地址传送过去，只要将param1数组的第一个元素用ref修饰。具体如下：

~~~csharp
[DllImport("file.dll")]
extern static int FunctionName(ref byte param1[1], ref byte param2);
~~~


## 通过api动态加载Native dll

因为C#中使用DllImport是不能像动态load/unload assembly那样，所以只能借助API函数了。在kernel32.dll中，与动态库调用有关的函数包括[3]：

+ LoadLibrary（或MFC 的AfxLoadLibrary），装载动态库。 
+ GetProcAddress，获取要引入的函数，将符号名或标识号转换为DLL内部地址。
+ FreeLibrary（或MFC的AfxFreeLibrary），释放动态链接库。

它们的原型分别是：

+ HMODULE LoadLibrary(LPCTSTR lpFileName);
+ FARPROC GetProcAddress(HMODULE hModule, LPCWSTR lpProcName);
+ BOOL FreeLibrary(HMODULE hModule);

现在，我们可以用IntPtr hModule=LoadLibrary(“Count.dll”);来获得Dll的句柄,用IntPtr farProc=GetProcAddress(hModule,”_count@4”);来获得函数的入口地址。

但是，知道函数的入口地址后，怎样调用这个函数呢？因为在C#中是没有函数指针的，没有像C++那样的函数指针调用方式来调用函数，所以我们得借助其它方法。经过研究，发现我们可以通过结合使用System.Reflection.Emit及System.Reflection.Assembly里的类和函数达到我们的目的。

详见《C#程序实现动态调用DLL的研究》一文。

# 类库（托管dll）搜索路径

+ 托管dll(类库）的搜索路径与native dll的搜索路径是不同的
+ 搜索路径的方式是按照被调用的dll库（是类库还是native dll）决定的，与调用程序是否托管代码无关

.net CLR在运行时寻找正确的Assembly（类库dll也是Assembly），Net提供了搜索算法，可以根据.config文件添加自定义搜索路径。

搜索顺序如下：

+ 在GAC(Global Assembly Cache,全局程序集缓存)中搜索相应版本的DLL.
+ 配置文件(web.config或app.config)中配置codeBase（assemblyIdentity应该可以不用）

~~~ xml
<configuration>
   <runtime>
      <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
         <dependentAssembly>
            <assemblyIdentity name="myAssembly"
                              publicKeyToken="32ab4ba45e0a69a1"
                              culture="neutral" />
            <codeBase version="2.0.0.0"
                      href="om/myAssembly.dll"/>
         </dependentAssembly>
      </assemblyBinding>
   </runtime>
</configuration>
~~~

+ 应用程序(.exe)当前目录下
+ 配置文件(web.config或app.config)中配置privatePath

~~~ xml
<configuration>
   <runtime>
      <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
         <probing privatePath="bin;bin2\subbin;bin3"/>
      </assemblyBinding>
   </runtime>
</configuration>
~~~

OK,CLR就是根据上面的顺序从1到4进行搜索Assembly的。如果没有搜索到指定版本的类库DLL，则程序会抛出异常，提示：DLL文件无法找到。

