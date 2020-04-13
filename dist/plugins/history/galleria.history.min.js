/**
 * Galleria - v1.6.1 2019-10-17
 * 
 *
 * Copyright (c) 2010 - 2019 worse is better UG
 * Licensed under the MIT License.
 */


!function(a,b){"function"==typeof define&&define.amd?define(["../galleria","jquery"],function(c,d){return b(a,c,d)}):"object"==typeof module&&module.exports?module.exports=b(a,require("galleria"),require("jquery")):b(a,a.Galleria,a.jQuery)}(window,function(a,b,c){return b.requires(1.25,"The History Plugin requires Galleria version 1.2.5 or later."),b.History=function(){var d,e=[],f=!1,g=a.location,h=a.document,i=b.IE,j="onhashchange"in a&&(void 0===h.mode||h.mode>7),k=function(a){return a=d&&!j&&b.IE?a||d.location:g,parseInt(a.hash.substr(2),10)},l=k(g),m=[],n=function(){c.each(m,function(b,c){c.call(a,k())})},o=function(){c.each(e,function(a,b){b()}),f=!0},p=function(a){return"/"+a};return j&&i<8&&(j=!1),j?o():c(function(){a.setInterval(function(){var a=k();isNaN(a)||a==l||(l=a,g.hash=p(a),n())},50);i?c('<iframe tabindex="-1" title="empty">').hide().attr("src","about:blank").one("load",function(){d=this.contentWindow,o()}).insertAfter(h.body):o()}),{change:function(b){m.push(b),j&&(a.onhashchange=n)},set:function(a){isNaN(a)||(!j&&i&&this.ready(function(){var b=d.document;b.open(),b.close(),d.location.hash=p(a)}),g.hash=p(a))},ready:function(a){f?a():e.push(a)}}}(),b});