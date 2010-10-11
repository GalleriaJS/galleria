/*!
 * Galleria Fullscreen Theme
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

Galleria.addTheme({
    name: 'fullscreen',
    author: 'Galleria',
    version: '2.0',
    css: 'galleria.fullscreen.css',
    defaults: {
        transition: 'none',
        image_crop: true,
        thumb_crop: 'height',
        
        _hide_dock: true
    },
    init: function(options) {
        
        this.addElement('thumbnails-tab');
        this.appendChild('thumbnails-container','thumbnails-tab');
        
        var tab      = this.$('thumbnails-tab'),
            loader   = this.$('loader'),
            thumbs   = this.$('thumbnails-container'),
            list     = this.$('thumbnails-list'),
            infotext = this.$('info-text'),
            info     = this.$('info'),
            
            OPEN = !options._hide_dock,
            POS = 0;

        if (Galleria.IE) {
            this.addElement('iefix');
            this.appendChild('container','iefix');
            this.setStyle(this.get('iefix'), {
                zIndex:3,
                position:'absolute',
                backgroundColor: '#000',
                opacity:.4
            })
        }
        
        if ( options.thumbnails === false ) {
            thumbs.hide();
        }
        
        var fixCaption = this.proxy(function(img) {
            if (!(img || img.width)) {
                return;
            }
            var w = Math.min(img.width, $(window).width());
            infotext.width(w-40);
            if (Galleria.IE && this.options.show_info) {
                this.$('iefix').width(info.outerWidth()).height(info.outerHeight());
            }
        });
        
        this.bind(Galleria.RESCALE, function() {
            POS = this.stageHeight - tab.height()-2;
            thumbs.css('top', OPEN ? POS - list.outerHeight() + 2 : POS);
            var img = this.getActiveImage();
            if (img) {
                fixCaption(img);
            }
        });
        
        this.bind(Galleria.LOADSTART, function(e) {
            if (!e.cached) {
                loader.show().fadeTo(100, 1);
            }
            $(e.thumbTarget).css('opacity',1).parent().siblings('.active').children().css('opacity',.5);
        });

        this.bind(Galleria.LOADFINISH, function(e) {
            loader.fadeOut(300);
            this.$('info,iefix').toggle(this.hasInfo());
        });
        
        this.bind(Galleria.IMAGE, function(e) {
            fixCaption(e.imageTarget);
        });
        
        this.bind(Galleria.THUMBNAIL, function(e) {
            $(e.thumbTarget).click(function() {
                if (OPEN) {
                    tab.click();
                }
            });
        });
        
        this.trigger(Galleria.RESCALE);
        
        this.addIdleState(thumbs, { opacity:0 });
        this.addIdleState(this.get('info'), { opacity:0 });
        
        if (Galleria.IE) {
            this.addIdleState(this.get('iefix'), { opacity:0 });
        }
        
        this.attachKeyboard({
            up: function(e) {
                if (!OPEN) {
                    tab.click();
                }
                e.preventDefault();
            },
            down: function(e) {
                if (OPEN) {
                    tab.click();
                }
                e.preventDefault();
            }
        });
        
        this.$('image-nav-left, image-nav-right').css('opacity',0.01).hover(function() {
            $(this).animate({opacity:1},100);
        }, function() {
            $(this).animate({opacity:0});
        }).show();
        
        if (options._hide_dock) {
            tab.click(this.proxy(function() {
                tab.toggleClass('open', !OPEN);
                if (!OPEN) {
                    thumbs.animate({
                        top: POS - list.outerHeight() + 2
                    },400,'galleria');
                } else {
                    thumbs.animate({
                        top: POS
                    },400,'galleria');
                }
                OPEN = !OPEN;
            }));
        } else {
            Galleria.log(OPEN)
            this.bind(Galleria.THUMBNAIL, function() {
                thumbs.css('top', POS - list.outerHeight() + 2);
            });
            tab.css('visibility','hidden');
        }
        
        this.$('thumbnails').children().hover(function() {
            $(this).not('.active').children().css('opacity', 1);
        }, function() {
            $(this).not('.active').children().fadeTo(200, .5);
        }).children().css('opacity',.5)
        
        this.enterFullscreen();
    }
});

})(jQuery);