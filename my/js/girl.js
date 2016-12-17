var i = GetArgsFromHref("i", window.location.href);
var j = GetArgsFromHref("j", window.location.href);
var gname=glist[i].name;
var aname=glist[i].album[j].name;
var img=glist[i].album[j].img;

document.getElementById('now').innerHTML = gname;
document.write('<header class="col-xs-12 text-xs-center m-1"><h2>'+gname);
if(aname != "default")document.write('--'+aname);
document.write('</h2></header>');
for(var k in img)
{
document.write('<figure class="figure col-md-6 text-xs-center">');
document.write('<img class="figure-img img-fluid" src="'+root+img[k]+'">');
var fnarr=img[k].split(/[\,.]/);
document.write('<figcaption class="figure-caption">'+fnarr[fnarr.length-2]+'</figcaption>');
document.write('</figure>');
}

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