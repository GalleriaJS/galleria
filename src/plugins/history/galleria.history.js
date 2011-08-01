/**
* @preserve Galleria History Plugin 2011-07-30
* http://galleria.aino.se
*
* Copyright 2011, Aino
* Licensed under the MIT license.
*
*/

/* Note: non-functional alpha, prototype only */

/*global jQuery, Galleria, window */

(function( $, window ) {

    Galleria.History = (function() {

        var onloads = [],

            init = false,

            loc = window.location,

            support = false,

            iframe = support ? null : $('<iframe tabindex="-1" title="empty">').hide().attr( 'src', 'javascript:0' ),

            get = function( winloc ) {
                winloc = winloc || iframe.location;
                return parseInt( target.hash.substr(2), 10 );
            },

            saved = get( loc ),

            callbacks = [],

            onchange = function() {
                $.each( callbacks, function( i, fn ) {
                    fn.call( window, get() );
                });
            };

        if ( !support ) {

            $(function() {
                iframe.one('load', function() {

                    iframe = this.contentWindow;

                    saved = get();

                    $.each( onloads, function(i, fn) {
                        fn();
                    });

                    init = true;

                    window.setInterval(function() {

                        var hash = get();

                        if ( !isNaN( hash ) && hash != saved ) {
                            saved = hash;
                            onchange();
                        }

                        if ( hash != get( loc ) ) {
                            loc.hash = hash;
                        }

                    }, 50);

                }).appendTo(document.body);
            });

        }

        return {

            change: function( fn ) {

                callbacks.push( fn );

                if( support ) {
                    window.onhashchange = onchange;
                }
            },
            set: function( val ) {

                if ( !support ) {

                    this.ready(function() {

                        var doc = iframe.document;
                        doc.title = window.document.title;
                        doc.open();
                        doc.close();
                        iframe.location.hash = '/' + val;

                        console.log(iframe.location.hash)

                    });
                }

                loc.hash = '/'+val;
            },
            ready: function(fn) {
                if (!init) {
                    onloads.push(fn);
                } else {
                    fn();
                }
            }
        };
    }());

}(jQuery, this));

