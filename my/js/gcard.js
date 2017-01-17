var card="";
for(var i in glist)
{
var gname=glist[i].name;
var a=glist[i].album;
for(var j in a)
{
card+='<div class="col-md-3 col-sm-4 col-xs-6">';
card+='<a href="girl.html?i='+i+'&j='+j+'">';
card+='<img class="w-100" src="'+root+a[j].img[0]+'">'; 
card+='</a><p class="text-xs-center">';
card+='<a href="girl.html?i='+i+'&j='+j+'">';
if(a[j].name != "default")card+=a[j].name+' - ';
card+=gname;
card+='</a></p></div>';
}
}
document.getElementById("girls").innerHTML=card;
