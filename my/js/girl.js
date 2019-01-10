var i = GetArgsFromHref("i", window.location.href);
var j = GetArgsFromHref("j", window.location.href);
var gname=glist[i].name;
var aname=glist[i].album[j].name;
var img=glist[i].album[j].img;
var dir=gname+"/"
if(aname != "default") dir+=aname+"/";

document.getElementById('now').innerHTML = gname;
document.write('<header class="col-xs-12 text-xs-center m-1"><h2>'+gname);
if(aname != "default")document.write('--'+aname);
document.write('</h2></header><div class="row">');
for(var k in img)
{
document.write('<figure class="figure col-md-6 text-xs-center">');
document.write('<img class="figure-img img-fluid" src="'+root+dir+img[k]+'">');
var fnarr=img[k].split(/[\,.]/);
document.write('<figcaption class="figure-caption">'+fnarr[fnarr.length-2]+'</figcaption>');
document.write('</figure>');
}
document.write('</div>');

var url,ii,jj;
i=parseInt(i);j=parseInt(j);
if(j>0){
ii=i;jj=j-1;
}
else if(j==0 && i > 0){
ii=i-1;jj=glist[ii].album.length-1;
}
if(j==0 && i==0){
url="没有了";
}
else{
url='<a href="girl.html?i='+ii+'&j='+jj+'">';
if(glist[ii].album[jj].name!="default")
url+=glist[ii].album[jj].name+" - ";
url+=glist[ii].name+'</a>';
}
document.write('<p>[上一页：'+url+']</p><p>[下一页：');

if(j<glist[i].album.length-1){
ii=i;jj=j+1;
}
else if(j==glist[i].album.length-1 && i < glist.length-1){
ii=i+1;jj=0;
}
if(i==glist.length-1 && j==glist[i].album.length-1){
url="没有了";
}
else{
url='<a href="girl.html?i='+ii+'&j='+jj+'">';
if(glist[ii].album[jj].name!="default")
url+=glist[ii].album[jj].name+" - ";
url+=glist[ii].name+'</a>';
}
document.write(url+']</p>');

  function GetArgsFromHref(sArgName, sHref) {
        var args = sHref.split("?");
        var retval = "";
        if (args[0] == sHref) /*参数为空*/ {
            return retval; /*无需做任何处理*/
        }
        var str = args[1];
        args = str.split("&");
        for (var i = 0; i < args.length; i++) {
            str = args[i];
            var arg = str.split("=");
            if (arg.length <= 1) continue;
            if (arg[0] == sArgName) retval = arg[1];
        }
        return retval;
    }