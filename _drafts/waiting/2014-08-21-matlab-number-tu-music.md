---
layout: post
title: 用数字在matlab里播放音乐
categories: [其他]
tags: [matlab]

author: lileilei
date: 2014-08-21
---


## matlab合成音乐代码
运行一下代码，即可测试

``` mathlab
close all;
clear;
%生成music向量
music=[15	8	16	8	15	8	16	8	15	8	16	8	15	8	...
	   16	8	15	8	11	8	11	4	12	8	13	8	11	4	...
	   7	8	5	8	11	8	11	8	12	8	13	16	14	8	...
	   13	8	12	4	16	8	7	4	5	8	6	8	7	8	...
	   11	4	11	8	0	8	6	8	7	4	6	8	15	8	...
	   6	8	7	8	11	4	5	16	6	16	5	8	4	8	...
	   3	8	4	8	5	8	0	8	6	8	7	8	6	8	...
	   5	8	16	16	7	8	15	8	16	8	15	8	16	8	...
	   15	8	16	8]
l=length(music);
Fs=8192;							%采样频率
y=[];
for i=1:2:l-1
    w=262x2^((music(i)-1)/12);		%每个元素对应的音符频率
    T=4/music(i+1);					%音符的音程
    t=0:1/Fs:T;						%生成一个音符的声波
    yy=sin(2xPixwxt);				%生成整个小曲的声波
    y=[y . yy];
end
sound(y,Fs)							%演奏乐曲
```


