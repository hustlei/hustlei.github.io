---
loyout: post
title: Ϊʲô����powershell
subtitle: 
category: ��̻���������
group: Coding
tags: [������, �ű�]
keywords: [������, �ű�, powershell]
description: Ϊʲô����powershell

author: lileilei
revision:
    editor: lileilei
    date: 2018-12-11
---

+ Ŀ¼
{:toc}

������powershell�޸У����ǿ���powershell��Ϊwindows����һ���ű�����������cmd�������������bash�����һ��ܹ���linux�����У����ܳ���shell���ǳ�ǿ�����ű�cmd���õ����飬windows����shell���ֲ��㣬˳���˽���һ�¡�

## powershell���ص�

+ powershell���ݲ���shell������
    - ����ls�ȣ�����ֻ��dir������ı���������Ҳ��̫һ����
+ powershell���ݲ���cmd����
    - dir���������ֱ����
    - doskey��������Ҫ������`doskey /exename=powershell.exe ls=dir`���Ĳ�����
    - title���������Ҫ$host.ui.RawUI.WindowTitle=xx,������
    - cmd���û���������set path=xx%path%��ok�ˣ�����powershell��Ҫ$env:path="xxx;"+$env:path
+ powershell����.net framework��������󣬿��Ե���.net��һЩ�⣬����ǿ��
    - ȷʵ����ǿ�󣬵��Ǵ������������get-xxmethod��set-xxmethod������
    - powershell������һ��������ԣ���Ϊ�ű���ǿ���ڿ���̨���úܲ�����
+ powershell����̨֧����չ���кܶ��̵߳���չ���԰�װ�������б༭����
    - ȷʵ����Щ���ܣ�����win7��û�а�װ.net framework4.5,�ܶలװ���ˣ���������һ�£�����powershell��.net framework
    
## powershell���������ĵط�

### ps1�ű�ִ���в��رտ���̨�ķ���

batִ�к����̨���رպܼ򵥣�ֱ����bat�ļ�������cmd��ok�ˡ�powershell�ű�ĩβ���powershell������á���Ȼbatĩβ���powershell����ű�ִ�����Ҳһ����رա�

���������ýű�ִ������powershell����̨���ر��أ���Ҫ�ڽű�ĩβ����������

```powershell
PowerShell -NoExit
```

### powershell���û�������

����ʹ�����´��룺

`$env:path= "C:\Program Files\Notepad++;"+$env:path`

Ҳ����ʹ��

`$env:path+= ";C:\Program Files\Notepad++"`

### powershell���ÿ���̨����

`$host.ui.RawUI.WindowTitle="new title"`

`$host.ui.RawUI.WindowTitle=$host.ui.RawUI.WindowTitle+"title"`

��`$host.ui.RawUI.WindowTitle+="title"`��ͬ

### ��������������

��cmd��ʹ��

```bat
doskey cargo1=cargo $* --target i686-pc-windows-msvc
```

��ִ��cargo1 xxx��ʵ���ϻ�ִ��cargo xxx --target i686-pc-windows-msvc

��powershell��ʵ�ָù�����Ҫ����function���������£�

```
function cargofun { cargo $args --target i686-pc-windows-msvc};
Set-Alias cargo1 cargofun
```


### ��powershell��ִ�����

��ps1�ű��У�β�����������䣬�����ڽű�ִ������powershell����̨����ִ��function��set-alias���

```
PowerShell -NoExit -Command {
    $Host.UI.RawUI.WindowTitle += ' - rust4win7up'; 
    Write-host 'PS: Ready for copile rust progam running on win7,8,10!' }
```

��bat�п�������������

```
powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle += ' - rust4win7up'; Write-host 'PS: Ready for copile rust progam running on win7,8,10!'"
```

ע����ps1�п��԰����������ڴ�����{}�У�������Ի��С���bat�У�ֻ�ܰѴ�����������ڣ����Ҳ��ܻ��С�

## ����powershell������

+ ������win7�����밲װ.net 4.5�ȵ��Ӵ�Ķ���
+ ��ϲ��get-xx,set-xx��Щ�﷨
+ powershell alias��û��doskey����
+ powershell����title�����Ļ�������������ȵ�
+ ���˸�������ڿ���̨��ʹ���������˵cmd��powershell������
+ ��װclink��С��������cmdҲ֧���б༭����
+ ʹ��cmder����ʹcmd����̨��ǿ��
+ 2018���msys2���ԱȽ�������֧��shell��gcc��emacs��vim���������԰�װqt,gtk,python

���ԣ�С����������bat(cmd+clink)������̨��msys2�����Ϸ���powershell��








