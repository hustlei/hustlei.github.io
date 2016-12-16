var root="http://hustlei.qiniudn.com/mygirl/";
for(var i in glist)
{
var gname=glist[i].name;
var a=glist[i].album;
for(var j in a)
{
document.write('<a href="girl.html?i='+i+'&j='+j+'">');
document.write('<div class="col-sm-3 col-xs-4 card">');
document.write('<img class="card-img-top w-100" src="'+root+a[j].img[0]+'">'); 
document.write('<div class="card-block"><h4 class="card-title">');
document.write(gname+'--'+a[j].name);
document.write('</h4></div></div></a>');
}
}