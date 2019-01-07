---
layout: post
title: WinForm窗体全局快捷键/组合键的设置方法
category: 编程语言
group: Coding
tags: [.net]
keywords: [winform, 快捷键]
description: C# .net winform全局快捷键 组合键

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-27
---

# 全局快捷键
在窗体运行后，焦点将会在控件上，窗体将捕捉不到快捷的，winform的键盘事件将不会被执行。
将winform的KeyPreview设置为True，快捷键将会先被传递到窗体，实现全局快捷键。

# 屏蔽快捷键后续事件

~~~ csharp
if (e.KeyCode == Keys.F1)
{
    //如果还有keypress事件，不让此快捷键触发其事件可加一句代码
    e.Handled = true; //将Handled设置为true，指示已经处理过KeyPress事件
    事件函数();       //执行按下快捷键的动作
}
~~~

# 组合快捷键(keypress事件)

1）方法一

~~~ csharp
if (e.Modifiers == Keys.Alt && e.KeyCode == Keys.D0)
{ 
MessageBox.Show("按下了Alt + 0"); 
}
~~~

2）方法二


~~~ csharp
if (e.Control  && e.Alt && e.KeyCode == Keys.D1)
{
MessageBox.Show("按下了Control+Alt +1"); 
}
~~~

3）方法三

~~~ csharp
if ((int)e.Modifiers == ((int)Keys.Control + (int)Keys.Alt) && e.KeyCode == Keys.D0) 
{
MessageBox.Show("按下了Control + Alt + 0"); 
}
~~~