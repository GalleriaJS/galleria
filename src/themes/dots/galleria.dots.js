/*!
 * Galleria Dots Theme
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

Galleria.addTheme({
    name: 'dots',
    author: 'Galleria',
    version: '1.1',
    css: 'galleria.dots.css',
    defaults: {
        transition: 'slide',
        transition_speed: 500,
        thumbnails: 'empty',
        carousel: false,
        image_crop: false,
        autoplay: true
    },
    init: function(options) {
        this.$('thumbnails').find('.galleria-image').css('opacity',0.5).hover(function() {
            $(this).fadeTo(200,1);
        }, function() {
            $(this).not('.active').fadeTo(200,.5);
        });
        this.$('info').insertAfter(this.target);
        this.bind(Galleria.LOADSTART, function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, .8);
            }
            $(e.thumbTarget).parent().stop().css('opacity',1).siblings('.active').css('opacity',0.5)
        });
        this.bind(Galleria.LOADFINISH, function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

})(jQuery);