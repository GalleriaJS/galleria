/**
 * Galleria - v1.5.3 2017-02-13
 * https://galleria.io
 *
 * Copyright (c) 2010 - 2017 worse is better UG
 * Licensed under the MIT License.
 * https://raw.github.com/worseisbetter/galleria/master/LICENSE
 *
 */

!function(a,b){Galleria.requires(1.25,"The History Plugin requires Galleria version 1.2.5 or later."),Galleria.History=function(){var c,d=[],e=!1,f=b.location,g=b.document,h=Galleria.IE,i="onhashchange"in b&&(void 0===g.mode||g.mode>7),j=function(a){return a=c&&!i&&Galleria.IE?a||c.location:f,parseInt(a.hash.substr(2),10)},k=j(f),l=[],m=function(){a.each(l,function(a,c){c.call(b,j())})},n=function(){a.each(d,function(a,b){b()}),e=!0},o=function(a){return"/"+a};return i&&h<8&&(i=!1),i?n():a(function(){b.setInterval(function(){var a=j();isNaN(a)||a==k||(k=a,f.hash=o(a),m())},50);h?a('<iframe tabindex="-1" title="empty">').hide().attr("src","about:blank").one("load",function(){c=this.contentWindow,n()}).insertAfter(g.body):n()}),{change:function(a){l.push(a),i&&(b.onhashchange=m)},set:function(a){isNaN(a)||(!i&&h&&this.ready(function(){var b=c.document;b.open(),b.close(),c.location.hash=o(a)}),f.hash=o(a))},ready:function(a){e?a():d.push(a)}}}()}(jQuery,this);