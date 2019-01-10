var card="";
for(var i in glist)
{
var gname=glist[i].name;
var alist=glist[i].album;
for(var j in alist)
{
var dir=gname+"/";
if(alist[j].name != "default") dir+=alist[j].name+"/";
card+='<div class="col-md-3 col-sm-4 col-xs-6">';
card+='<a href="girl.html?i='+i+'&j='+j+'">';
card+='<img class="w-100" src="'+root+dir+alist[j].img[0]+'">'; 
card+='</a><p class="text-xs-center">';
card+='<a href="girl.html?i='+i+'&j='+j+'">';
if(alist[j].name != "default")card+=alist[j].name+' - ';
card+=gname;
card+='</a></p></div>';
}
}
document.getElementById("girls").innerHTML=card;

