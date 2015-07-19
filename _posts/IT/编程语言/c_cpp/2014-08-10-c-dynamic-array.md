---
layout: post
title: c语言动态数组
category: C
group: IT
tags: [c语言]
keywords: [c语言, 动态数组]
description: c语言动态数组，可变长数组

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

* 目录
{:toc}

# c数组简介

c语言数组默认是静态数组，即数组长度是预先定义好的，在整个程序中，一旦数组大小给定后就无法改变。c语言数组在声明时必须用常量指定数组长度，数组在编译时便已经指定了内存空间。

动态数组指可以通过程序需要重新指定大小，动态数组内存空间是从堆（heap）上动态分配的，当程序执行到这些语句时，才为其分配，程序员需要自己负责释放内存。

c99支持可变长度数组，但并非真正的动态数组，虽然是在运行时动态分配的内存空间，但是数组长度是不可变的。c99可变长数组在声明时，数组长度可以用变量指定（而不必须是常量）。

c语言可以通过malloc或者calloc动态分配内存来创建动态数组，用realloc改变数组大小，用free释放数组内存空间。

# c89数组（静态数组）

~~~ c
int a[10];
float b[10], c[20];  
int a[10]={ 0,1,2,3,4,5,6,7,8,9 };
~~~

对于数组类型说明应注意以下几点：

c数组名不能与其它变量名相同。例如： 

~~~ c
int a;
float a[10];
~~~

是错误的。

c不能在方括号中用变量来表示元素的个数，但是可以是符号常数或常量表达式。

~~~ c
#define FD 5

int a[3+2],b[7+FD];
~~~

是合法的。但是

~~~ c
int n=5;
int a[n];
~~~

c允许在同一个类型说明中，说明多个数组和多个变量。

~~~ c
int a,b,c,d,k1[10],k2[20];
~~~


# c99动态数组

~~~ c
int n=10, m=20;
char a[n];
int b[m][n];
~~~

~~~ c
int n;
scanf("%d",&n);
int a[n]; 
~~~

# c动态数组(stdlib.h)

> malloc.h和alloc.h是比较老的用法，各操作系统也不兼容，建议使用stdlib.h

|函数|说明|示例|
|:---|:---|:---|
|`void *malloc(unsigned int size);`|向系统申请size字节的堆空间|`int *array = (int *)malloc(sizeof(int)*num);`|
|`void *calloc(unsigned int num, 　unsigned int size);`|按类型申请num个size字节的堆空间|`char *pc=(char *)calloc(2,sizeof(char));`|
|`void free(void *p);`|释放p指向的堆空间|free(array)|
|`void *realloc(void *p,unsigned int 　size);`|将p指向的堆空间变为size|realloc(array,10*sizeof(int)| 

将分配的内存空间强制转换为相应类型后，可以用数组的方式访问

~~~ c
#include <stdio.h>
#include <stdlib.h>

int main()
{

int n1,i;
int *array;

puts("输入数组长度：");
scanf("%d",&n1);
array=(int*)malloc(n1*sizeof(int));

for(i=0;i<n1;i++)
{
array[i]=i+1;
printf("%d\t",array[i]);
}

free(array);//释放指针
return 0;
~~~

二维数组、多维数组等方法类似，相对复杂，可参看baike。

