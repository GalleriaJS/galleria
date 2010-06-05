/*!
 * Galleria SlideShowPro Plugin v 1.1
 * http://galleria.aino.se
 *
 * Copyright 2010, Aino
 * Licensed under the MIT license.
 */

(function() {
   
var G = window.Galleria; 
if (typeof G == 'undefined') {
    return;
}

var S = G.SSP = function(url) {
    var query = "select * from xml where url='" + url + "' limit 1";
    var encodedQuery = encodeURIComponent(query.toLowerCase());
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?';
    var scope = this;
    
    if (url.substr(0,7) == 'http://') {
        var a = document.createElement('a');
        a.href = url;
        this.domain = a.protocol+'//'+a.hostname;
        this.path = url.substring(0,(url.lastIndexOf("/")) + 1);
    }
    
    $.getJSON(yql, function(data) {
        scope.data = data;
    });
    
}

S.prototype = {
    data: null,
    domain: '',
    path:'',
    getAlbum: function(index, callback) {
        this.ready(function() {
            var data = this.parseData(index);
            callback.call(this, data);
        });
        return this;
    },
    getAbsoluteUrl: function(path) {
        if (path.substr(0,7) != 'http://') {
            if (path.substr(0,1) != '/') {
                path = this.path + path;
            } else {
                path = this.domain + path;
            }
        }
        return path;
    },
    parseData: function(index) {
        var albums = this.data.query.results.gallery.album;
        var album = albums[index] || albums;
        var path = album.lgPath || '';
        var thumbPath = album.tnPath || path;
        
        var arr = [];
        var scope = this;

        G.prototype.loop(album.img, function(img) {
            var obj = {
                image: scope.getAbsoluteUrl(path+img.src),
                thumb: scope.getAbsoluteUrl(thumbPath+img.src),
                title: img.title
            };
            if (img.caption) {
                obj.description = img.caption
            }
            if (img.link) {
                obj.link = img.link;
            }
            arr.push(obj);
        });
        return arr;
    },
    ready: function(callback) {
        var scope = this;
        G.prototype.wait(function() {
            return !!scope.data;
        }, function() {
            callback.call(scope);
        }, function() {
            G.raise('YQL not available.')
        }, 10000);
    }
}

})();