/**
 * Galleria Fullscreen Theme v. 2.2 2010-10-28
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

// If no Galleria, fail silently.
var G = window.Galleria;
if ( typeof G === 'undefined' ) {
    return;
}

G.addTheme({

    name : 'fullscreen',
    author : 'Galleria',
    version : '2.2',
    css : 'galleria.fullscreen.css',

    defaults : {
        transition : 'none',
        image_crop : true,
        thumb_crop : 'height',
        // set this to false if you want to keep the thumbnails:
        _hide_dock : true,
        // set this to true if you want to shrink the carousel when clicking a thumbnail:
        _close_on_click : false
    },

    init : function( options ) {

        this.addElement('thumbnails-tab');

        this.appendChild('thumbnails-container', 'thumbnails-tab');

        var tab      = this.$('thumbnails-tab'),
            loader   = this.$('loader'),
            thumbs   = this.$('thumbnails-container'),
            list     = this.$('thumbnails-list'),
            infotext = this.$('info-text'),
            info     = this.$('info'),
            OPEN     = !options._hide_dock,
            POS      = 0,
            CLICK    = G.TOUCH ? 'touchstart' : 'click';

        // Add fixes for Internet Explorer.
        if ( G.IE ) {
            this.addElement('iefix');
            this.appendChild('container', 'iefix');
            this.$('iefix').css({
                zIndex : 3,
                position : 'absolute',
                backgroundColor : '#000',
                opacity : 0.4
            });
        }

        if ( options.thumbnails === false ) {
            thumbs.hide();
        }

        var fixCaption = this.proxy(function(img) {

            if (!(img || img.width)) {
                return;
            }
            var w = Math.min( img.width, $(window).width() );
            infotext.width(w - 40);
            if ( G.IE && this.getOptions('show_info') ) {
                this.$('iefix').width(info.outerWidth()).height(info.outerHeight());
            }
        });

        this.bind(G.RESCALE, function() {
            POS = this.getStageHeight() - tab.height() - 2;
            thumbs.css('top', OPEN ? POS - list.outerHeight() + 2 : POS);
            var img = this.getActiveImage();
            if ( img ) {
                fixCaption(img);
            }
        });

        this.bind(G.LOADSTART, function(e) {
            if ( !e.cached ) {
                loader.show().fadeTo(100, 1);
            }
            $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind(G.LOADFINISH, function(e) {
            loader.fadeOut(300);
            this.$('info, iefix').toggle(this.hasInfo());
        });

        this.bind(G.IMAGE, function(e) {
            fixCaption(e.imageTarget);
        });

        this.bind(G.THUMBNAIL, function(e) {
            $(e.thumbTarget).parent(':not(.active)').children().css('opacity', 0.6);
            $(e.thumbTarget).click(function() {
                if (OPEN && options._close_on_click) {
                    tab.click();
                }
            });
        });

        this.trigger(G.RESCALE);

        this.addIdleState(thumbs, { opacity: 0 });

        this.addIdleState(this.get('info'), { opacity: 0 });

        if ( G.IE ) {
            this.addIdleState(this.get('iefix'), { opacity: 0 });
        }

        this.$('image-nav-left, image-nav-right').css('opacity', 0.01).hover(function() {
            $(this).animate({opacity: 1}, 100);
        }, function() {
            $(this).animate({opacity: 0});
        }).show();

        if ( options._hide_dock ) {

            tab.click(this.proxy(function() {

                tab.toggleClass('open', !OPEN);

                if ( !OPEN ) {
                    thumbs.animate({
                        top: POS - list.outerHeight() + 2
                    }, 400, 'galleria');
                } else {
                    thumbs.animate({
                        top: POS
                    }, 400, 'galleria');
                }

                OPEN = !OPEN;

            }));

        } else {

            this.bind(G.THUMBNAIL, function() {
                thumbs.css('top', POS - list.outerHeight() + 2);
            });

            tab.css('visibility', 'hidden');

        }

        // Fade thumbnails on hover.
        this.$('thumbnails').children().hover(function() {
            $(this).not('.active').children().stop().fadeTo(100, 1);
        }, function() {
            $(this).not('.active').children().stop().fadeTo(400, 0.6);
        });

        // Enter fullscreen mode.
        this.enterFullscreen();

        // Attach keyboard events.
        this.attachKeyboard({
            escape : function(e) {
                return false;
            },
            up : function(e) {
                if ( !OPEN ) {
                    tab.click();
                }
                e.preventDefault();
            },
            down : function(e) {
                if ( OPEN ) {
                    tab.click();
                }
                e.preventDefault();
            }
        });

    }

});

})(jQuery);
