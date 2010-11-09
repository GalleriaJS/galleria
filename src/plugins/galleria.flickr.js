/*!
 * Galleria Flickr Plugin v 1.2
 * http://galleria.aino.se
 *
 * Copyright 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

// If no Galleria, fail silently
var G = window.Galleria;
if (typeof G == 'undefined') {
    return;
}

var F = G.Flickr = function(api_key) {

    if (!api_key) {
        G.raise('No API key found');
        return;
    }

    this.callback = function() {};

    // The required API key
    this.api_key = api_key;

    this.options = {
        max: 40, // photos to return
        size: 'big', // photo size ( small,medium,big,original )
        sort: 'interestingness-desc', // sort option ( date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, relevance )
        description: false // set this to true to get description as caption
    };
};

F.prototype = {

    // find any photos by search string
    search: function( str ) {
        this._set(arguments);
        return this._find({
            text: str
        });
    },

    // find any photos by tagname
    getTags: function( str ) {
        this._set(arguments);
        return this._find({
            tags: str
        });
    },

    // get photos from a user
    getUser: function(username) {
        var args = arguments;
        return this._call({
            method: 'flickr.urls.lookupUser',
            url: 'flickr.com/photos/' + username
        }, function(data) {
            this._set(args);
            this._find({
                user_id: data.user.id,
                method: 'flickr.people.getPublicPhotos'
            });
        });
    },

    // get photos from a photoset
    getSet: function(photoset_id) {
        this._set(arguments);
        return this._find({
            photoset_id: photoset_id,
            method: 'flickr.photosets.getPhotos'
        });
    },

    // get photos from a gallery
    getGallery: function(gallery_id) {
        this._set(arguments);
        return this._find({
            gallery_id: gallery_id,
            method: 'flickr.galleries.getPhotos'
        });
    },

    // search for groups by search string, returns an array with group objects
    // use getGroup to get the photos from a group ID
    // added in 1.2
    searchGroup: function(str, callback) {
        callback = callback || function() {};
        this._call({
            text: str,
            method: 'flickr.groups.search'
        }, function(data) {
            callback.call( window, data.groups.group);
        });
        return this;
    },

    // get photos from a group ID
    // added in 1.2
    getGroup: function ( group_id ) {
        this._set( arguments );
        return this._find({
            group_id: group_id,
            method: 'flickr.groups.pools.getPhotos'
        });
    },

    // set options
    setOptions: function( options ) {
        $.extend(this.options, options);
        return this;
    },

    // shortens the arguments and applies options
    // private
    _set: function( args ) {

        args = Array.prototype.slice.call(args);

        this.callback = args[2] || args[1];

        if (typeof args[1] == 'object') {
            this.setOptions(args[1]);
        }

        return this;
    },

    // call Flickr and raise errors
    _call: function( params, callback ) {

        var url = 'http://api.flickr.com/services/rest/?';

        var scope = this;

        params = $.extend({
            format : 'json',
            jsoncallback : '?',
            api_key: this.api_key
        }, params );

        $.each(params, function( key, value ) {
            url += '&' + key + '=' + value;
        });

        $.getJSON(url, function(data) {
            if ( data.stat == 'ok' ) {
                callback.call(scope, data);
            } else {
                Galleria.raise( data.code.toString() + ' ' + data.stat + ': ' + data.message );
            }
        });
        return scope;
    },

    // ask flickr for photos, parse the result and call the callback with the galleria-ready data array
    _find: function(params) {

        params = $.extend({
            method: 'flickr.photos.search',
            extras: 'url_t, url_m, url_o, url_s, url_l, description',
            sort: this.options.sort
        }, params );

        return this._call(params, function(data) {

            var gallery = [],
            photos = data.photos ? data.photos.photo : data.photoset.photo,
            len = Math.min(this.options.max, photos.length);

            for ( var i=0; i<len; i++ ) {
                var photo = photos[i],
                img = photo.url_m;

                switch(this.options.size) {
                    case 'small':
                    img = photo.url_s;
                    break;

                    case ( 'big' || 'large' ):
                    if ( photo.url_l ) {
                        img = photo.url_l;
                    } else if ( parseInt( photo.width_o ) > 1280 ) {
                        img = 'http://farm'+photo['farm']+'.static.flickr.com/'+photo['server']+
                        '/'+photo['id']+'_' + photo['secret'] + '_b.jpg';

                    } else if( photo.url_o ) {
                        img = photo.url_o;
                    }
                    break;

                    case 'original':
                    if( photo.url_o ) {
                        img = photo.url_o;
                    }
                    break;
                }
                var item = {
                    thumb: photos[i].url_t,
                    image: img,
                    title: photos[i].title,
                    description: this.options.description && photos[i].description ? photos[i].description._content : ''
                };
                gallery.push( item );
            }
            this.callback.call( this, gallery );
        });
    }
};

// Static
// TODO: fetch any flickr feed ( YQL integration )
F.getFeed = function(type, params) {

};

})( jQuery );