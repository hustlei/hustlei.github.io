$(document).ready(function () {
    var entries = null;
    $('#search-form').removeAttr("action");
    search();

    $('#search-form').submit(function (e) {
        search();
        return false;
    });


    function search(){
        var s = GetArgsFromHref("s", window.location.href);
        var q=unescape(decodeURI(s).replace("+", " "));
        $('#query').val(q);/*$('#query').attr("value",query);*/
        var query = $('#query').val();
        $('#search_content').hide();
        $('#loader').show();
        if (entries == null) {
            $.ajax({
                url: '/atom.xml',
                dataType: 'xml',
                success: function (data) {
                    entries = data.getElementsByTagName('entry');
                    findEntries(query);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var html = '<article class="nested">';
                    html += '<h1>出错</h1>';
                    html += '<p>出错代码：<strong>' + textStatus + '</strong></p></article>';
                    $('#search_result').html(html);
                    $('#loader').hide();
                    $('#search_content').attr("class", "text-warning");
                    $('#search_content').show();
                }
            });
        }
        else {
            findEntries(query);
        }
        $('#query').blur().attr('disabled', false);
        return false;
    }
/*func************/
    /** myself func **/
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

    function htmlEscape(s) {
        return String(s).replace(/[&<>"'\/]/g, function (s) {
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            return entityMap[s];
        });
    }

    function xmlDateToJavascriptDate(xmlDate) {
        var re = /^([0-9]{4,})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]+)?(Z|([+-])([0-9]{2}):([0-9]{2}))?$/;
        var match = xmlDate.match(re);
        if (!match)
            return null;

        var all = match[0];
        var year = match[1]; var month = match[2]; var day = match[3];
        var hour = match[4]; var minute = match[5]; var second = match[6];
        var milli = match[7];
        var z_or_offset = match[8]; var offset_sign = match[9];
        var offset_hour = match[10]; var offset_minute = match[11];

        if (offset_sign) {
            var direction = (offset_sign == "+" ? 1 : -1);
            hour = parseInt(hour) + parseInt(offset_hour) * direction;
            minute = parseInt(minute) + parseInt(offset_minute) * direction;
        }
        month = parseInt(month) - 1;
        var utcDate = Date.UTC(year, month, day, hour, minute, second, (milli || 0));
        return new Date(utcDate);
    }

    function formatDate(date) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    }

    function findEntries(q) {
        var matches = [];
        var rq = new RegExp(q, 'im');
        /* var rl = /^http:\/\/hustlei\.github\.io\/(.+)$/; */
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var title = $(entry.getElementsByTagName('title')[0]).text();
            var link = $(entry.getElementsByTagName('link')[0]).attr('href');
            /*var title_en = rl.exec(link)[1].replace(/-/g, ' ');*/
            var title_en = link.replace(/-/g, ' ');
            var content = $(entry.getElementsByTagName('content')[0]).text();
            if (rq.test(title) || rq.test(title_en) || rq.test(content)) {
                var updated = formatDate(xmlDateToJavascriptDate($(entry.getElementsByTagName('updated')[0]).text()));
                matches.push({ 'title': title, 'link': link, 'date': updated, 'content': content });
            }
        }
        var html = '';
        if (matches.length != 0) {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                html += '<article class="nested">';
                html += '<header><h2><a href="' + match.link + '">' + htmlEscape(match.title) + '</a></h2></header>';
                html += '<section><pre  style="background-color: transparent;border: 0;">' + htmlEscape(match.content) + '</pre></section>';
                html += '<footer><p>更新日期：' + match.date + '</p></footer>';
                html += '</article>';
            }
        } else {
            html += '<article class="nested">';
            html += '<h1>你输入的关键词没有搜索结果，请更换关键词！ O(∩_∩)O~</h1>';
            html += '</article>';
        }

        $('#search_result').html(html);
        $('#loader').hide();
        $('#search_content').attr("class", "text-success");
        $('#search_content').show();
    }
/*funcend*********/

});
