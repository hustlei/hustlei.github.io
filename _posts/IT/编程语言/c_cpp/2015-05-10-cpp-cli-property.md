---
layout: post
title: C++/CLI属性(property)
category: C++
group: IT
tags: [c++]
keywords: [C++/CLI, property]
description: C++/CLI, 属性, property

author: lileilei
revision:
    editor: lileilei
    date: 2015-05-10
---

* 目录
{:toc}

# C++/CLI及property简介 

C++/CLI（Common Language Infrastructure，通用语言框架），简单说，C++/CLI就是用C++在.NET中编程，也可以说是.net CLR(通用语言运行时)托管环境中的C++。

C++/CLI在C++类中引入了property（C#中的属性），其使用方式简介如下：

> 属性（property）是一种用于访问对象或类的特性的成员，属性是字段(变量)的扩展，访问字段和属性的语法是相同的。
> 
> > 与字段不同，属性不表示存储位置
> 
> > 属性有访问器,访问器指定它们的值被读取或写入时需要执行的语句。


# C++/CLI类 property实现

示例如下：

~~~ cpp
public ref class Point2D
{
private:
	double x;
	double y;
public:
	Point2D(double x, double y){
		X = x;
		Y = y;
	};

public:
	property double X{
		double get(){ return x; }
		void set(double value){ x = value; }
	}

	property double Y{
		double get(){ return y; }
    private:
		void set(double value){ y = value; }
	}
};
~~~

# C++/CLI类 自动属性 实现

+ 自动属性不需要显示声明支持字段，编译器将创建一个私有的匿名支持字段。
+ 自动属性只能通过构造函数或工厂方法初始化属性值，不能通过赋值来初始化属性

> 在 C# 3.0 和更高版本中，当属性的访问器中不需要其他逻辑时，自动实现的属性可使属性声明更加简洁。编译器将创建一个私有的匿名支持字段，该字段只能通过属性的 get 和 set 访问器进行访问。 

~~~ cpp
public ref class Point2D sealed { 
public:
   property double X; 
   property double Y;
};
//X,Y,Z均为自动属性，可以直接使用这些属性
//声明为自动属性后，不能再编写get，set的代码
~~~

# 在头文件声明在源文件实现

xxx.h

~~~ cpp
public ref class Point
{

private:
	double y;
	double z;
public:
	Point(double x, double y, double z);

public:
	property double X;
	property double Y{double get(); void set(double value); };
	property double Z{double get(); private: void set(double value); };
};
~~~

xxx.cpp

~~~ cpp
#include "xxx.h"

Point::Point(double x, double y, double z)
{
	X = x;
	Y = y;
	Z = z;
}

double Point::Y::get() {
	return y;
}

void Point::Y::set(double value){
	y = value;
}

double Point::Z::get() {
	return z;
}

void Point::Z::set(double value){
	z = value;
}
~~~

# 参考文档

+ [Visual C++ 中的 .NET 编程](https://msdn.microsoft.com/zh-cn/library/68td296t.aspx)
+ [C++/CLI属性声明](https://msdn.microsoft.com/zh-cn/library/ms235304(v=vs.110).aspx)
+ [C#自动属性](https://msdn.microsoft.com/zh-cn/library/bb384054.aspx)