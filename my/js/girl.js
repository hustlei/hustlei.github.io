var i = GetArgsFromHref("i", window.location.href);
var j = GetArgsFromHref("j", window.location.href);
var gname=glist[i].name;
var aname=glist[i].album[j].name;
var img=glist[i].album[j].img;

document.write(gname+'--'+aname);
for(var k in img)
{
document.write('<div class="col-sm-3 col-xs-4 card">');
document.write('<img class="card-img-top w-100" src="'+root+img[k]+'">'); 
document.write('<div class="card-block"><h4 class="card-title">');
var fnarr=img[k].split(/[\,.]/);
var fn=fnarr[fnarr.length-2];
document.write(fn);
document.write('</h4></div></div>');
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