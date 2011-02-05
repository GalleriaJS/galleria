/*
 * Galleria Media Theme v. 0.1 2011-02-05
 * http://trellon.com
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Trellon
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

Galleria.addTheme({
    name: 'media',
    author: 'Vadim Mirgorod',
    version: '0.1',
    css: 'galleria.media.css',
    defaults: {
        transition: 'slide',
        thumb_crop: 'height',
        
		// set this to false if you want to show the caption all the time:
        _toggle_info: false
    },
    init: function(options) {
        
        // add some elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });
        
        // cache some stuff
        var toggle   = this.$('image-nav-left,image-nav-right,counter'),
            info     = this.$('info-link,info-close,info-text'),
            click    = Galleria.TOUCH ? 'touchstart' : 'click';
        
        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity',.4)

        // some stuff for non-touch browsers
        if (! Galleria.TOUCH ) {
            
            // fade thumbnails
            this.$('thumbnails').children().hover(function() {
                $(this).not('.active').children().stop().fadeTo(100, 1);
            }, function() {
                $(this).not('.active').children().stop().fadeTo(400, .6);
            });
            
            this.addIdleState( this.get('image-nav-left'), { left:-62 });
            this.addIdleState( this.get('image-nav-right'), { right:-62 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }
        
        // toggle info
        if ( options._toggle_info ) {
            info.bind( click, function() {
                info.toggle();
            });
        }
        
        // bind some stuff
        this.bind(Galleria.THUMBNAIL, function(e) {
            $(e.thumbTarget).parent(':not(.active)').children().css('opacity',.6)
        });
        
        this.bind(Galleria.LOADSTART, function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, .4);
            }
            
            this.$('info').toggle( this.hasInfo() );
            
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity',.6);
        });
        
        this.bind(Galleria.LOADFINISH, function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

})(jQuery);
