/**
 * @preserve Galleria Vimeo Plugin 2011-07-28
 * http://galleria.aino.se
 *
 * Copyright 2011, Aino
 * Licensed under the MIT license.
 */

/*global jQuery, Galleria */

( function($) {

	var data, elem,
	
    path = (function(src) {
        var slices = src.split('/');
        if (slices.length == 1) {
            return '';
        }
        slices.pop();
        return slices.join('/') + '/';
    }( $('script:last').attr('src') )),
	
	onload = function() {
		this.addElement('vimeo').prependChild('stage', 'vimeo');

		var z = Galleria.utils.parseValue(this.$('image-nav-left').css('z-index'));

		var vimeo = this.$('vimeo').css({
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: z,
			background: 'url('+path+'play.png) no-repeat 50% 50%'
		}).hide(),

		insert = function() {
			var source = '';

			$.each(data, function(key, val) {
				if(key == 'vimeo') {
					source = val;
				}
			});
			if(source.length) {
				elem = $('<iframe>', {
				frameborder: '0',
				src: 'http://player.vimeo.com/video/'+source+'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1'
				}).appendTo(vimeo);

			} else {
				elem = false;
			}
		};

		this.bind('loadfinish', function(e) {
			data = this.getData(e.index);

			if(vimeo.children().length) {
				vimeo.fadeOut(200, function() {
					$(this).empty().hide();
					insert();
				});
			} else {
				insert();
			}

		});
		
		this.bind('image', function(e) {
			if(elem) {
				elem.attr({
					width: this.getStageWidth(),
					height: this.getStageHeight()
				}).hide();

				vimeo.show().bind('touchend mouseup', function() {
					elem.fadeIn(200);
				});
			}
		});
		
		this.bind('rescale', function() {
			if(elem){
				elem.attr({
					width : this.getStageWidth(),
					height : this.getStageHeight()
				});
			}
		});
	};

	Galleria.ready(onload);

}(jQuery));
