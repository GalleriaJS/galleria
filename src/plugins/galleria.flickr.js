/*!
 * Galleria Flickr Plugin v 1.0
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

var F = G.Flickr = function(api_key) {
    if (!api_key) {
        G.raise('No API key found');
    }
	this.callback = function(){};
	this.api_key = api_key;
	this.options = {
		max: 40,
		size: 'big',
		sort: 'interestingness-desc'
	}
}

F.prototype = {
	search: function(str) {
		this._set(arguments);
		return this._find({
			text: str
		});
	},
	getTags: function(str) {
		this._set(arguments);
		return this._find({
			tags: str
		});
	},
	getUser: function(username) {
		var args = arguments;
		return this._call({
			method: 'flickr.urls.lookupUser',
			url: 'flickr.com/photos/'+username
		}, function(data) {
			this._set(args);
			this._find({
				user_id: data.user.id,
				method: 'flickr.people.getPublicPhotos'
			});
		});
	},
	getSet: function(photoset_id) {
		this._set(arguments);
		return this._find({
			photoset_id: photoset_id,
			method: 'flickr.photosets.getPhotos'
		});
	},
	getGallery: function(gallery_id) {
		this._set(arguments);
		return this._find({
			gallery_id: gallery_id,
			method: 'flickr.galleries.getPhotos'
		});
	},
	setOptions: function(options) {
		jQuery.extend(this.options, options);
		return this;
	},
	_set: function(args) {
		args = Array.prototype.slice.call(args);
		this.callback = args[2] || args[1];
		if (typeof args[1] == 'object') {
			this.setOptions(args[1]);
		}
		return this;
	},
	_call: function(params, callback) {
		var url = 'http://api.flickr.com/services/rest/?';
		var scope = this;
		params = jQuery.extend({
			format : 'json',
			jsoncallback : '?',
			api_key: this.api_key
		}, params);
		jQuery.each(params, function(key, value) {
			url += '&'+ key + '=' +value;
		});
		jQuery.getJSON(url, function(data) {
			if (data.stat == 'ok') {
				callback.call(scope, data);
			} else {
				G.raise(data.code.toString() + ' ' + data.stat + ': ' + data.message);
			}
		});
		return scope;
	},
	_find: function(params) {
		params = jQuery.extend({
			method: 'flickr.photos.search',
		    extras: 'o_dims, url_t, url_m, url_o',
		    sort: this.options.sort
		}, params);
		
		return this._call(params, function(data) {
			var obj = { length: 0 };
			var photos = data.photos ? data.photos.photo : data.photoset.photo;
			var len = Math.min(this.options.max, photos.length);
		    
			for (var i=0; i<len; i++) {
    		    var photo = photos[i];
    		    var img = photo.url_m;
    		    if (photos.url_o) {
    		        if (this.options.size == 'big') {
    		            // there is a "secret" size
    		            var img = 'http://farm'+photo['farm']+'.static.flickr.com/'+photo['server']+'/'+photo['id']+'_' + photo['secret'] + '_b.jpg';
    		        } else if (this.options.size == 'original') {
    		            var img = photo.url_o;
    		        }
    		    }
				var item = {
					thumb: photos[i].url_t,
					image: img,
					title: photos[i].title
				};
				Array.prototype.push.call(obj, item);
			}
			this.callback.call(this, obj);
		});
	}
}


// Static
F.getFeed = function(type, params) {
	
}

})();