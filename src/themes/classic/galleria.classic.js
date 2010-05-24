Galleria.themes.create({
    name: 'classic',
    author: 'Galleria',
    version: '1.0',
    css: 'galleria.classic.css',
    defaults: {
        transition: 'slide'
    },
    init: function(options) {
        
        var mc = Galleria.MAC && Galleria.CHROME;
        
        if (!mc) {
            this.$('thumbnails').children().hover(function() {
                $(this).not('.active').fadeTo(200, .4);
            }, function() {
                $(this).fadeTo(400, 1);
            });
        }

        this.$('loader').show().fadeTo(200, 0.4);
        this.$('counter').show().fadeTo(200, 0.4);
        
        this.$('container').hover(this.proxy(function() {
            this.$('image-nav-left,image-nav-right,counter').fadeIn(200);
        }), this.proxy(function() {
            this.$('image-nav-left,image-nav-right,counter').fadeOut(500);
        }));
        
        this.$('image-nav-left,image-nav-right,counter').hide();
        
        var elms = this.$('info-link,info-close,info-text').click(function() {
            elms.toggle();
        });
        
        this.bind(Galleria.LOADSTART, function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, .4);
            }
            if (this.hasInfo()) {
                this.$('info').show();
            } else {
                this.$('info').hide();
            }
            if (!mc) {
                $(e.thumbTarget).parent().css('opacity',1).addClass('active').siblings().removeClass('active');
            }
        });

        this.bind(Galleria.LOADFINISH, function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});