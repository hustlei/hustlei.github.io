for(var i in glist)
{
var gname=glist[i].name;
var a=glist[i].album;
for(var j in a)
{
document.write('<div class="col-md-3 col-sm-4 col-xs-6 card px-0">');
document.write('<a href="girl.html?i='+i+'&j='+j+'">');
document.write('<img class="card-img-top w-100" src="'+root+a[j].img[0]+'">'); 
document.write('</a><div class="card-block text-xs-center">');
document.write('<a href="girl.html?i='+i+'&j='+j+'">');
if(a[j].name != "default")document.write(a[j].name+' - ');
document.write(gname);
document.write('</a></div></div>');
}
}