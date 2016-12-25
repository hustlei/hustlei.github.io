---
layout: post
title: flowdocument(wpf文档)格式
category: 文档格式
group: PKM
tags: []
keywords: [flowdocument, wpf文档]
description: wpf文档, flowdocument文档格式

author: lileilei
revision:
    editor: lileilei
    date: 2014-08-25
---

* 目录
{:toc}

# WPF中的文档简介

WPF中的文档功能使得可以使用xaml编写文档并通过wpf程序/浏览器等显示，并可以直接调用.net的打包、打印等功能。WPF把文档按用途分成两个大的类别:“固定文档”和“流文档”，即FixedDocument和FlowDocument。

+ FlowDocument主要是面向表现(显示)的，类似html，对文档结构描述的功能极弱
+ FlowDocument可以方便的嵌入.net控件，且方便用C#等语言操作，更加适合打印，感觉类似pdf。

> FlowDocument可以直接在浏览器中显示。

> wpf文档是可编程的，内部可以加入按钮等wpf控件，并且可以添加动作代码。


# FlowDocument

FlowDocument包含小节、段落、图片、表格等文档元素，同时还可以包含按钮、多选框、文本框等控件。如果文档需要编辑，可以放在RichTextBox标签中。

FlowDocument内容框架由多级嵌套元素组成，表示不同的内容显示方式。由于FlowDocument重点在于显示，因此对文档逻辑结构支持不是很好，因此，我通常用DocBook编辑文档然后用xslt转换为FlowDocument。

## FlowDocument文档结构

FlowDocument文档根元素为`<FlowDocument>`标签，其子元素主要分为3类：块(Block)内容元素、行内(Inline)内容元素、控件元素。具体总结如下：

+ FlowDocument
    1. Block元素
        - Section
        - Paragraph
        - List
            * ListItem
        - Table
            * TableCloumn
            * TableRowGroup
                + TableRow
                    - TableCell：只能包含Block元素
        - BlockUIContainer
        - Floater（浮动元素）
        - Figure（支持图片或其他内容）      
    2. Inline元素
        - Run
        - Span
        - Hyperlink
        - Bold
        - Italic
        - Underline
        - LineBreak
        - InlineUIContainer
        - anchoredBlock
            * Figure
            * Floater
    3. 控件元素
        - StackPanel
        - Label
        - TextBox
        - ComboBox
        - Button
        - RadioButton

Run 标签用于包含无格式文本，在xaml文档中，Run无需显示调用，例如Paragraph标签省略Run标签直接包含文本。Span元素是可以包含其他Inline元素的Inline元素。

> FlowDocument命名空间声明为`xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"`,另外可能用到的命名空间有：`xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"`

FlowDocument各元素嵌套关系简介如下：

+ 可以包含Block元素的元素
    - Section
    - Figure
    - Floater
    - ListItem
    - TableCell
+ 可以包含Inline元素的元素
    - Paragraph
    - Span
+ 可以包含控件的元素
    - BlockUIContainer
    - InlineUIContainer
+ 可以包含纯文本的元素
    - Run
+ 不能有字内容的空标签
    - LineBreak
    - TableColumn

Section不能直接包含文本，只能包含其他Block元素。Inline元素必须放在Block元素内。

控件元素也必须放在UIContainer里，但是，InlineUIContainer可以省略（编译代码时仍将创建一个 InlineUIContainer），BlockUIContainer不可以省略。

>  Figure 或 Floater 元素通常用于突出显示或强调内容的某些部分，承载主内容流中的支持图像或其他内容，或者用于插入松散相关的内容（如广告）。

**表格**

~~~ xml
  <Table>
    <!--声明表格有3列-->
    <Table.Columns>
      <TableColumn />
      <TableColumn />
      <TableColumn />
    </Table.Columns>
    <TableRowGroup>
       <TableRow>
        <TableCell><Paragraph>Cell at Row 1 Column 1</Paragraph></TableCell>
        <TableCell><Paragraph>Cell at Row 1 Column 2</Paragraph></TableCell>
        <TableCell><Paragraph>Cell at Row 1 Column 3</Paragraph></TableCell>
      </TableRow>
      <TableRow>
        <TableCell><Paragraph>Cell at Row 2 Column 1</Paragraph></TableCell>
        <TableCell><Paragraph>Cell at Row 2 Column 2</Paragraph></TableCell>
        <TableCell><Paragraph>Cell at Row 2 Column 3</Paragraph></TableCell>
      </TableRow>
    </TableRowGroup>
  </Table>
~~~

**列表**

~~~ xml
<List>
  <ListItem><Paragraph>ListItem 1</Paragraph></ListItem>
  <ListItem><Paragraph>ListItem 2</Paragraph></ListItem>
  <ListItem><Paragraph>ListItem 3</Paragraph></ListItem>
</List>
~~~

List有如下属性可确定列表项的项目符号样式的外观

+ MarkerStyle
    - None	不显示标记。
    - Disc	显示实心圆形。
    - Circle	显示空心圆形。
    - Square	显示空心方形。
    - Box	显示实心方框。
    - LowerRoman	显示小写罗马数字，从数字 i 开始，例如 i、ii、iii 和 iv。 对于添加到列表中的每一项，TextMarkerStyle 会自动递增。
    - UpperRoman	显示大写罗马数字，从数字 I 开始，例如 I、II、III 和 IV。 对于添加到列表中的每一项，TextMarkerStyle 会自动递增。
    - LowerLatin	显示小写 ASCII 字符，从字母 a 开始，例如，a、b 和 c。 对于添加到列表中的每一项，TextMarkerStyle 会自动递增。
    - UpperLatin	显示大写 ASCII 字符，从字母 A 开始，例如，A、B 和 C。 对于添加到列表中的每一项，TextMarkerStyle 会自动递增。
    - Decimal	显示十进制数字，从数字 1 开始，例如，1、2 和 3。 对于添加到列表中的每一项，TextMarkerStyle 会自动递增。
+ StartIndex：有序列表中的项的起始索引。
    - 默认为1


**自定义文本**

+ 文本修饰(TextDecorations属性)：向文本应用下划线、上划线、基线和删除线效果
    - 可用于下列元素
        * Paragraph
        * Inline
        * TextBlock、TexBox控件
    - 有如下可选值
        * Strikethrough
        * Overline
        * Underline
        * [Baseline](https://msdn.microsoft.com/zh-cn/library/ms752372(v=vs.100).aspx)
+ 版式(Typography属性)：控制文本版式特征如小型大写字母、大写大写字母、上下标等。[Typography]((https://msdn.microsoft.com/zh-cn/library/system.windows.documents.typography(v=vs.100).aspx))对OpenType版式属性的访问，属性很多，部分列举如下：
    - 可用于下列元素
        * Paragraph
        * FlowDocument
        * TextElement、TextBlock、TextBox
    - 可用属性和值
        * Typography.Variants
            + Normal 默认字体行为。 字体缩放和定位是正常的。
            + Superscript 上标标志符号。
            + Subscript 下标标志符号。
            + Ordinal 序号标志符号。（没弄明白，效果有点像上标）
            + Inferior 下标标志符号
            + Ruby 较小的日语假名标志符号
        * Typography.Capitals：大写字母样式
            + Normal 大写字母正常呈现
            + AllSmallCaps	大写字母和小写字母都被替换为高度大致相同的大写字母的标志符号形式
            + SmallCaps	小写字母都被替换为高度大致相同的大写字母的标志符号形式
            + AllPetiteCaps	大写字母和小写字母都被替换为高度大致相同的大写字母的标志符号形式。 小号大写字母比小型大写字母要小
            + PetiteCaps 小写字母都被替换为高度大致相同的大写字母的标志符号形式。 小号大写字母比小型大写字母要小
            + Unicase 大写字母以 Unicase 字体显示。 Unicase font 字体以大小写标志符号混合形式（由字体设计者确定）同时呈现大写和小写字母
            + Titling 标志符号格式被替换为专门为标题设计的版式格式。
        * Typography.NumeralStyle
            + Normal 默认数字样式
            + Lining 使用内层数字样式。高度相等的数字形式
            + OldStyle 旧式数字样式。 高度和颜色与小写字母匹配的数字样式。
 
> Flowdocument可以对文字进行变换、加阴影、应用动画、空心处理等，不详细叙述，详见[FlowDocument版式](https://msdn.microsoft.com/zh-cn/library/ms750402(v=vs.100).aspx)

## FlowDocument样式

### 样式设置方式

可以直接设置属性，例如

~~~ xml
<Paragraph FontStyle="Italic" Background="Beige" Foreground="DarkGreen" >
    A Figure embeds content into flow content with placement properties 
    that can be customized independently from the primary content flow
</Paragraph>
<Paragraph
  TextAlignment="Left"
  FontSize="18" 
  FontFamily="Palatino Linotype"
  Typography.NumeralStyle="OldStyle"
  Typography.Fraction="Stacked"
  Typography.Variants="Inferior"
>
  <Run>
    This text has some altered typography characteristics.  Note
    that use of an open type font is necessary for most typographic
    properties to be effective.
  </Run>
  <LineBreak/><LineBreak/>
  <Run>
    0123456789 10 11 12 13
  </Run>
  <LineBreak/><LineBreak/>
  <Run>
    1/2 2/3 3/4
  </Run>
</Paragraph>
~~~


可以像windows和page标签一样包含FlowDocument.Resources标签，内部设置各个Style。

例如

~~~ xml
<FlowDocument>
  <FlowDocument.Resources>
    <!-- This style is used to set the margins for all paragraphs in the FlowDocument to 0. -->
    <Style TargetType="{x:Type Paragraph}">
      <Setter Property="Margin" Value="0"/>
    </Style>
  </FlowDocument.Resources>

  <Paragraph>
    Spacing between paragraphs is caused by margins set on the paragraphs.  Two adjacent margins
    will "collapse" to the larger of the two margin widths, rather than doubling up.
  </Paragraph>

  <Paragraph>
    To eliminate extra spacing between two paragraphs, just set the paragraph margins to 0.
  </Paragraph>
</FlowDocument>
~~~

### 常见属性

+ Background：属性值为Brush
+ Foreground：属性值为Brush
+ BorderThickness：边框宽度
    - "xxx"：统一边框宽度为xxx,xxx可以带单位
    - "x1,x2,x3,x4":按左、顶、右、底设置边框宽度
+ BorderBrush：边框的画刷样式，属性值为Brush
+ FontFamily
    - 字符串，指定一个字体系列名称。 例如，"Arial" 或 "Century Gothic"
    - 一个字符串，指定多个字体系列名称，彼此间用逗号分隔（逗号后面空白将被忽略）。例如，"Arial, Century Gothic" 指定 Arial 为主字体系列，Century Gothic 为备用字体系列。
    - 也可以用字体文件位置，暂不介绍
+ FontSize：值为xaml数值
+ FontStyle
    - Normal：正常,普通字体（或正体）中的字符是直立的
    - Italic：斜体，斜体字体中的字符真正倾斜，并按设计的样式显示
    - Oblique：倾斜，倾斜字体中的字符是人为倾斜的，倾斜度是通过对普通字体中的字符进行扭曲变换获得的
+ FontWeight：指定字体粗细
    - Thin：100
    - ExtraLight/UltraLight：200
    - Light：300
    - Normal/Regular：400
    - Medium：500
    - DemiBold：SemiBold：600
    - Bold：700
    - ExtraBold/UltraBold：800
    - Black/Heavy：900
    - ExtraBlack/UltraBlack：950
+ LineHeight：行高度
+ Margin：元素边距宽度
    - "xxx":统一边距
    - "x1,x2,x3,x4":按左、顶、右、底设置边距
+ Padding：元素内容到元素边的距离
    - 设置方法同Margin
+ TextAlignment：
    - Left 默认值。文本左对齐。
    - Right	文本右对齐。
    - Center 文本居中。
    - Justify 文本两端对齐。
+ TextEffects：比较复杂，暂时不会用
+ TextIndent:xaml数值，指定Paragraph的第一行的缩进距离
+ TextDecorations：见本文上一节
+ Typography：见本文上一节
+ Style：元素要使用的样式
    - Style="{resourceExtension StyleResourceKey}"
    - Style="{DynamicResource ResourceKey=key}"
+ FlowDirection：流内容方向
    - LeftToRight
    - RightToLeft

+ 属性为XAML数值时表示方法说明
    - Auto：自动，一般为默认值，等效于Double.NaN属性值
    - px：点（默认单位），设备相关的单位，等于1/96英寸
    - in：英寸为单位，1in=2.54cm
    - cm：厘米为单位
    - pt：磅，1pt=(96/72)px
+ 属性为Brush时，可以取值如下：
    - SolidColorBrush
        * BorderBrush="predefinedBrushName"
        * BorderBrush="#rgb"
        * BorderBrush="#argb"
        * BorderBrush="#rrggbb"
        * BorderBrush="#aarrggbb"
        * BorderBrush="sc#scA,scR,scG,scB"
        * BorderBrush="ContextColor profileUri alphaValue,colorValue"
    - 还可以是DrawingBrush，ImageBrush，LinearGradientBrush，RadialGradientBrush，VisualBrush，暂不介绍



# 参考

+ [msdn 流文档](https://msdn.microsoft.com/zh-cn/library/aa970909(v=vs.100).aspx)
+ [FlowDocument细节帮助主题](https://msdn.microsoft.com/zh-cn/library/ms754030(v=vs.100).aspx)
+ [FlowDocument文字样式](https://msdn.microsoft.com/zh-cn/library/ms750402(v=vs.100).aspx)