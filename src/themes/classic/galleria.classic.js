Galleria.themes.create({
    name: 'classic',
    author: 'Galleria',
    version: '1.1',
    css: 'galleria.classic.css',
    defaults: {
        transition: 'slide'
    },
    init: function(options) {

        this.$('loader').show().fadeTo(200, .4);
        this.$('counter').show().fadeTo(200, .4);
        
        this.$('container').hover(this.proxy(function() {
            this.$('image-nav-left,image-nav-right,counter').fadeIn(200);
        }), this.proxy(function() {
            this.$('image-nav-left,image-nav-right,counter').fadeOut(500);
        }));
        
        this.$('image-nav-left,image-nav-right,counter').hide();
        
        var elms = this.$('info-link,info-close,info-text').click(function() {
            elms.toggle();
        });
        
        this.bind(Galleria.THUMBNAIL, function(e) {
            $(e.thumbTarget).css('opacity',0).fadeTo(200,.4).hover(function() {
                if (!$(this).parent().hasClass('active')) {
                    $(this).fadeTo(200, 1);
                }
            }, function() {
                if (!$(this).parent().hasClass('active')) {
                    $(this).fadeTo(400, .4);
                }
            });
        })
        
        this.bind(Galleria.LOADSTART, function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, .4);
            }
            if (this.hasInfo()) {
                this.$('info').show();
            } else {
                this.$('info').hide();
            }
            $(e.thumbTarget).parent().addClass('active')
                .siblings('.active').removeClass('active').children().fadeTo(400,.4);
        });

        this.bind(Galleria.LOADFINISH, function(e) {
            this.$('loader').fadeOut(200);
            $(e.thumbTarget).css('opacity',1)
        });
    }
});