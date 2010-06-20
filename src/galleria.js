/*!
 * Galleria v 1.1.7.1 2010-06-20
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function() {

var initializing = false,
    fnTest = /xyz/.test(function(){xyz;}) ? /\b__super\b/ : /.*/,
    Class = function(){},
    window = this;

Class.extend = function(prop) {
    var __super = this.prototype;
    initializing = true;
    var proto = new this();
    initializing = false;
    for (var name in prop) {
        if (name) {
            proto[name] = typeof prop[name] == "function" && 
                typeof __super[name] == "function" && fnTest.test(prop[name]) ? 
                (function(name, fn) { 
                    return function() { 
                        var tmp = this.__super; 
                        this.__super = __super[name]; 
                        var ret = fn.apply(this, arguments);       
                        this.__super = tmp; 
                        return ret; 
                    }; 
                })(name, prop[name]) : prop[name]; 
        } 
    }

    function Class() {
        if ( !initializing && this.__constructor ) {
            this.__constructor.apply(this, arguments);
        }
    }
    Class.prototype = proto;
    Class.constructor = Class;
    Class.extend = arguments.callee;
    return Class;
};

var Base = Class.extend({
    loop : function( elem, fn) {
        var scope = this;
        if (typeof elem == 'number') {
            elem = new Array(elem);
        }
        jQuery.each(elem, function() {
            fn.call(scope, arguments[1], arguments[0]);
        });
        return elem;
    },
    create : function( elem, className ) {
        elem = elem || 'div';
        var el = document.createElement(elem);
        if (className) {
            el.className = className;
        }
        return el;
    },
    getElements : function( selector ) {
        var elems = {};
        this.loop( jQuery(selector), this.proxy(function( elem ) {
            this.push(elem, elems);
        }));
        return elems;
    },
    setStyle : function( elem, css ) {
        jQuery(elem).css(css);
        return this;
    },
    getStyle : function( elem, styleProp ) {
    	var val;
    	if (elem.currentStyle)
    		val = elem.currentStyle[styleProp];
    	else if (window.getComputedStyle)
    		val = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
    	return val;
    },
    cssText : function( string ) {
        var style = document.createElement('style');
        this.getElements('head')[0].appendChild(style);
        if (style.styleSheet) { // IE
            style.styleSheet.cssText = string;
        } else {
            var cssText = document.createTextNode(string);
            style.appendChild(cssText);
        }
        return this;
    },
    loadCSS : function(href) {
        link = this.create('link');
        link.rel = 'stylesheet';
        link.media = 'all';
        if (href) {
            link.href = href;
        }
        var get = function(tag) {
            return document.getElementsByTagName(tag);
        }
        var li = get('link').length ?
            get('link') : get('style');
        if (li[0]) {
            li[0].parentNode.insertBefore(link, li[0]);
        } else {
            get('head')[0].appendChild(link);
        }
        return link;
    },
    moveOut : function( elem ) {
        return this.setStyle(elem, {
            position: 'absolute',
            left: '-10000px',
            display: 'block'
        });
    },
    moveIn : function( elem ) {
        return this.setStyle(elem, {
            left: '0'
        }); 
    },
    reveal : function( elem ) {
        return jQuery( elem ).show();
    },
    hide : function( elem ) {
        return jQuery( elem ).hide();
    },
    mix : function( obj, ext ) {
        return jQuery.extend(obj, ext);
    },
    proxy : function( fn, scope ) {
        if ( typeof fn !== 'function' ) {
            return function() {};
        }
        scope = scope || this;
        return function() {
            return fn.apply( scope, Array.prototype.slice.call(arguments) );
        };
    },
    listen : function( elem, type, fn ) {
        jQuery(elem).bind( type, fn );
    },
    forget : function( elem, type ) {
        jQuery(elem).unbind(type);
    },
    dispatch : function( elem, type ) {
        jQuery(elem).trigger(type);
    },
    clone : function( elem, keepEvents ) {
        keepEvents = keepEvents || false;
        return jQuery(elem).clone(keepEvents)[0];
    },
    removeAttr : function( elem, attributes ) {
        this.loop( attributes.split(' '), function(attr) {
            jQuery(elem).removeAttr(attr);
        });
    },
    push : function( elem, obj ) {
        if (typeof obj.length == 'undefined') {
            obj.length = 0;
        }
        Array.prototype.push.call( obj, elem );
        return elem;
    },
    width : function( elem, outer ) {
        return this.meassure(elem, outer, 'Width');
    },
    height : function( elem, outer ) {
        return this.meassure(elem, outer, 'Height');
    },
    meassure : function(el, outer, meassure) {
        var elem = jQuery( el );
        var ret = outer ? elem['outer'+meassure](true) : elem[meassure.toLowerCase()]();
        // fix quirks mode
        if (G.QUIRK) {
            var which = meassure == "Width" ? [ "left", "right" ] : [ "top", "bottom" ];
            this.loop(which, function(s) {
                ret += elem.css('border-' + s + '-width').replace(/[^\d]/g,'') * 1;
                ret += elem.css('padding-' + s).replace(/[^\d]/g,'') * 1;
            });
        }
        return ret;
    },
    toggleClass : function( elem, className, arg ) {
        if (typeof arg !== 'undefined') {
            var fn = arg ? 'addClass' : 'removeClass';
            jQuery(elem)[fn](className);
            return this;
        }
        jQuery(elem).toggleClass(className);
        return this;
    },
    hideAll : function( el ) {
        jQuery(el).find('*').hide();
    },
    animate : function( el, options ) {
        var elem = jQuery(el);
        if (!elem.length) {
            return;
        }
        if (options.from) {
            elem.css(from);
        }
        elem.animate(options.to, {
            duration: options.duration || 400,
            complete: options.complete || function(){}
        });
    },
    wait : function(fn, callback, err, max) {
        fn = this.proxy(fn);
        callback = this.proxy(callback);
        err = this.proxy(err);
        var ts = new Date().getTime() + (max || 3000);
        window.setTimeout(function() {
            if (fn()) {
                callback();
                return false;
            }
            if (new Date().getTime() >= ts) {
                err();
                callback();
                return false;
            }
            window.setTimeout(arguments.callee, 1);
        }, 1);
        return this;
    },
    loadScript: function(url, callback) {
       var script = document.createElement('script');
       script.src = url;
       script.async = true; // HTML5

       var done = false;
       callback = this.proxy(callback);

       // Attach handlers for all browsers
       script.onload = script.onreadystatechange = function() {
           if ( !done && (!this.readyState ||
               this.readyState == "loaded" || this.readyState == "complete") ) {
               done = true;
               callback();

               // Handle memory leak in IE
               script.onload = script.onreadystatechange = null;
           }
       };
       
       var ex = document.getElementsByTagName('script');
       ex = ex[ex.length-1];
       ex.parentNode.insertBefore(script, ex.nextSibling);
       return this;
    }
});

var Picture = Base.extend({
    __constructor : function(order) {
        this.image = null;
        this.elem = this.create('div', 'galleria-image');
        this.setStyle( this.elem, {
            overflow: 'hidden',
            position: 'relative' // for IE Standards mode
        } );
        this.order = order;
        this.orig = { w:0, h:0, r:1 };
    },
    
    cache: {},
    
    add: function(src) {
        if (this.cache[src]) {
            return this.cache[src];
        }
        var image = new Image();
        image.src = src;
        this.setStyle(image, {display: 'block'});
        if (image.complete && image.width) {
            this.cache[src] = image;
            return image;
        }
        image.onload = (function(scope) {
            return function() {
                scope.cache[src] = image;
            };
        })(this);
        return image;
    },
    
    isCached: function(src) {
        return this.cache[src] ? this.cache[src].complete : false;
    },
    
    make: function(src) {
        var i = this.cache[src] || this.add(src);
        return this.clone(i);
    },
    
    load: function(src, callback) {
        callback = this.proxy( callback );
        this.elem.innerHTML = '';
        this.image = this.make( src );
        this.moveOut( this.image );
        this.elem.appendChild( this.image );
        this.wait(function() {
            return (this.image.complete && this.image.width);
        }, function() {
            this.orig = {
                h: this.image.height,
                w: this.image.width
            };
            callback( {target: this.image, scope: this} );
        }, function() {
            G.raise('image not loaded in 10 seconds: '+ src);
        }, 10000);
        return this;
    },
    
    scale: function(options) {
        var o = this.mix({
            width: 0,
            height: 0,
            min: undefined,
            max: undefined,
            margin: 0,
            complete: function(){},
            position: 'center'
        }, options);
        if (!this.image) {
            return this;
        }
        this.wait(function() {
            width  = o.width || this.width(this.elem);
            height = o.height || this.height(this.elem);
            return width && height;
        }, function() {
            var ratio = Math[ (o.crop ? 'max' : 'min') ](width / this.orig.w, height / this.orig.h);
            if (o.max) {
                ratio = Math.min(o.max, ratio);
            }
            if (o.min) {
                ratio = Math.max(o.min, ratio);
            }
            this.setStyle(this.elem, {
                width: width,
                height: height
            });
            this.image.width = Math.ceil(this.orig.w * ratio) - o.margin*2;
            this.image.height = Math.ceil(this.orig.h * ratio) - o.margin*2;
            
            var getPosition = this.proxy(function(value, img, m) {
                var result = 0;
                if (/\%/.test(value)) {
                    var pos = parseInt(value) / 100;
                    result = Math.floor(this.image[img] * -1 * pos + m * pos - o.margin);
                } else {
                    result = parseInt(value) + o.margin;
                }
                return result;
            });
            
            var map = {
                'top': { top: 0 },
                'left': { left: 0 },
                'right': { left: '100%' },
                'bottom': { top: '100%' }
            }
            
            var pos = {};
            var mix = {};
            
            this.loop(o.position.toLowerCase().split(' '), function(p, i) {
                if (p == 'center') {
                    p = '50%';
                }
                pos[i ? 'top' : 'left'] = p;
            });

            this.loop(pos, function(val, key) {
                if (map.hasOwnProperty(val)) {
                    mix = this.mix(mix, map[val]);
                }
            });
            
            pos = pos.top ? this.mix(pos, mix) : mix;
            
            pos = this.mix({
                top: '50%',
                left: '50%'
            }, pos);
            
            this.setStyle(this.image, {
                position : 'relative',
                top :  getPosition(pos.top, 'height', height),
                left : getPosition(pos.left, 'width', width)
            });
            o.complete.call(this);
        });
        return this;
    }
});

var tID; // the private timeout handler

var G = window.Galleria = Base.extend({
    
    __constructor : function(options) {
        this.theme = undefined;
        this.options = options;
        this.playing = false;
        this.playtime = 3000;
        this.active = null;
        this.queue = {};
        this.data = {};
        this.dom = {};
        this.controls = {
            active : 0,
            swap : function() {
                this.active = this.active ? 0 : 1;
            },
            getActive : function() {
                return this[this.active];
            },
            getNext : function() {
                return this[Math.abs(this.active - 1)];
            }
        };
        this.thumbnails = {};
        this.stageWidth = 0;
        this.stageHeight = 0;
        
        var elems = 'container stage images image-nav image-nav-left image-nav-right ' + 
                    'info info-link info-text info-title info-description info-author info-close ' +
                    'thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right ' +
                    'loader counter';
        elems = elems.split(' ');
        
        this.loop(elems, function(blueprint) {
            this.dom[ blueprint ] = this.create('div', 'galleria-' + blueprint);
        });
    },
    
    init: function() {
        if (typeof this.options.target === 'undefined' ) {
            G.raise('No target.');
        }
        
        this.options = this.mix(G.theme.defaults, this.options);
        this.options = this.mix({
            autoplay: false,
            carousel: true,
            carousel_follow: true,
            carousel_speed: 400,
            carousel_steps: 'auto',
            data_config : function( elem ) { return {}; },
            data_image_selector: 'img',
            data_source: this.options.target,
            data_type: 'auto',
            debug: false,
            extend: function(options) {},
            height: 'auto',
            image_crop: false,
            image_margin: 0,
            image_position: '50%',
            keep_source: false,
            link_source_images: true,
            max_scale_ratio: undefined,
            min_scale_ratio: undefined,
            on_image: function(img,thumb) {},
            popup_links: false,
            preload: 2,
            queue: true,
            show: 0,
            thumb_crop: true,
            thumb_margin: 0,
            thumb_quality: 'auto',
            thumbnails: true,
            transition: G.transitions.fade,
            transition_speed: 400
        }, this.options);
        
        var o = this.options;
        
        this.target = this.dom.target = this.getElements(o.target)[0];
        if (!this.target) {
             G.raise('Target not found.');
        }
        
        this.bind(G.DATA, function() {
            this.run();
        });
        
        this.bind(G.LOADFINISH, function(e) {
             o.on_image.call(this, e.imageTarget, e.thumbTarget);
        });
        
        this.bind(G.READY, function() {
            if (G.History) {
                G.History.change(this.proxy(function(e) {
                    var val = parseInt(e.value.replace(/\//,''));
                    if (isNaN(val)) {
                        window.history.go(-1);
                    } else {
                        this.show(val, undefined, true);
                    }
                }));
            }

            G.theme.init.call(this, o);
            o.extend.call(this, o);
            
            if (/^[0-9]{1,4}$/.test(hash) && G.History) {
                this.show(hash, undefined, true);
            } else if (typeof o.show == 'number') {
                this.show(o.show);
            }
            
            if (o.autoplay) {
                if (typeof o.autoplay == 'number') {
                    this.play(o.autoplay);
                } else {
                    this.play();
                }
            }
        });
        this.load();
        return this;
    },
    
    bind : function(type, fn) {
        this.listen( this.get('container'), type, this.proxy(fn) );
        return this;
    },
    
    trigger : function( type ) {
        type = typeof type == 'object' ? 
            this.mix( type, { scope: this } ) : 
            { type: type, scope: this };
        this.dispatch( this.get('container'), type );
        return this;
    },
    run : function() {
        var o = this.options;
        if (!this.data.length) {
            G.raise('Data is empty.');
        }
        if (!o.keep_source && !Galleria.IE) {
            this.target.innerHTML = '';
        }
        this.loop(2, function() {
            var image = new Picture();
            this.setStyle( image.elem, {
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.setStyle(this.get( 'images' ), {
                position: 'relative',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });
            this.get( 'images' ).appendChild( image.elem );
            this.push(image, this.controls);
        }, this);
        
        for( var i=0; this.data[i]; i++ ) {
            var thumb;
            if (o.thumbnails === true) {
                thumb = new Picture(i);
                var src = this.data[i].thumb || this.data[i].image;
                this.get( 'thumbnails' ).appendChild( thumb.elem );
                thumb.load(src, this.proxy(function(e) {
                    var orig = this.width(e.target);
                    e.scope.scale({
                        crop: o.thumb_crop,
                        margin: o.thumb_margin,
                        complete: this.proxy(function() {
                            // set high quality if downscale is moderate
                            this.toggleQuality(e.target, o.thumb_quality === true || ( o.thumb_quality == 'auto' && orig < e.target.width * 3 ));
                            this.trigger({
                                type: G.THUMBNAIL,
                                thumbTarget: e.target,
                                thumbOrder: e.scope.order
                            });
                        })
                    });
                }));
                if (o.preload == 'all') {
                    thumb.add(this.data[i].image);
                }
            } else if (o.thumbnails == 'empty') {
                thumb = {
                    elem:  this.create('div','galleria-image'),
                    image: this.create('span','img')
                };
                thumb.elem.appendChild(thumb.image);
                this.get( 'thumbnails' ).appendChild( thumb.elem );
            } else {
                thumb = {
                    elem: false,
                    image: false
                }
            }
            var activate = this.proxy(function(e) {
                e.preventDefault();
                var ind = e.currentTarget.rel;
                if (this.active !== ind) {
                    this.show( ind );
                }
            });
            if (o.thumbnails !== false) {
                thumb.elem.rel = i;
                this.listen(thumb.elem, 'click', activate);
            }
            if (o.link_source_images && o.keep_source && this.data[i].elem) {
                this.data[i].elem.rel = i;
                this.listen(this.data[i].elem, 'click', activate);
            }
            this.push(thumb, this.thumbnails );
        }
        this.setStyle( this.get('thumbnails'), { opacity: 0 } );
        this.build();
        this.target.appendChild(this.get('container'));
        var threshold = 0;
        
        if (o.height && o.height != 'auto') {
            this.setStyle( this.get('container'), { height: o.height })
        }
        
        this.wait(function() {
            // the most sensitive piece of code in Galleria, we need to have all the meassurements right to continue
            threshold++;
            var cssHeight = parseFloat(this.getStyle( this.get( 'container' ), 'height' ));
            this.stageWidth = this.width(this.get( 'stage' ));
            this.stageHeight = this.height( this.get( 'stage' ));
            if (!this.stageHeight && !cssHeight && threshold > 100 && o.height == 'auto') {
                // no height detected for sure, set reasonable ratio (16/9)
                this.setStyle( this.get( 'container' ),  { 
                    height: Math.round( this.stageWidth*9/16 ) 
                } );
                this.stageHeight = this.height( this.get( 'stage' ));
            }
            return this.stageHeight && this.stageWidth && threshold > 5;
        }, function() {
            
            var thumbWidth  = this.width( this.get('thumbnails').childNodes[0], true );
            var thumbsWidth = thumbWidth * this.thumbnails.length;
            
            if (thumbsWidth < this.stageWidth) {
                o.carousel = false;
            }
            if (o.carousel) {
                this.addCarousel(thumbWidth, thumbsWidth);
            }
            this.listen(this.get('image-nav-right'), 'click', this.proxy(function() {
                this.next();
            }));
            this.listen(this.get('image-nav-left'), 'click', this.proxy(function() {
                this.prev();
            }));
            this.setStyle( this.get('thumbnails'), { opacity: 1 } );
            this.trigger( G.READY );
        }, function() {
            G.raise('Galleria could not load. Make sure stage has a height and width.');
        }, 5000);
    },
    
    addCarousel : function(thumbWidth, thumbsWidth) {
        this.toggleClass(this.get('thumbnails-container'), 'galleria-carousel');
        this.carousel = {
            right: this.get('thumb-nav-right'),
            left: this.get('thumb-nav-left'),
            overflow: 0,
            setOverflow: this.proxy(function(newWidth) {
                newWidth = newWidth || this.width(this.get('thumbnails-list'));
                this.carousel.overflow = Math.ceil( ( (thumbsWidth - newWidth) / thumbWidth ) + 1 ) * -1;
            }),
            pos: 0,
            setClasses: this.proxy(function() {
                this.toggleClass( this.carousel.left, 'disabled', this.carousel.pos === 0);
                this.toggleClass( this.carousel.right, 'disabled', this.carousel.pos == this.carousel.overflow + 1);
            }),
            animate: this.proxy(function() {
                window.setTimeout(this.proxy(function() {
                    this.carousel.setClasses();
                    this.animate( this.get('thumbnails'), {
                        to: { left: thumbWidth * this.carousel.pos },
                        duration: this.options.carousel_speed,
                        easing: 'galleria'
                    });
                }), 1);
            })
        };
        this.carousel.setOverflow();
    
        this.setStyle(this.get('thumbnails-list'), {
            overflow:'hidden',
            position: 'relative' // for IE Standards mode
        });
        this.setStyle(this.get('thumbnails'), {
            width: thumbsWidth,
            position: 'relative'
        });
        
        this.proxy(function(c, steps) {
            steps = (typeof steps == 'string' && steps.toLowerCase() == 'auto') ? this.thumbnails.length + c.overflow : steps;
            c.setClasses();
            this.loop(['left','right'], this.proxy(function(dir) {
                this.listen(c[dir], 'click', function(e) {
                    if (c.pos === ( dir == 'right' ? c.overflow : 0 ) ) {
                        return;
                    }
                    c.pos = dir == 'right' ? Math.max(c.overflow + 1, c.pos - steps) : Math.min(0, c.pos + steps);
                    c.animate();
                });
            }));
        })(this.carousel, this.options.carousel_steps);
    },
    addElement : function() {
        this.loop(arguments, function(b) {
            this.dom[b] = this.create('div', 'galleria-' + b );
        });
        return this;
    },
    getDimensions: function(i) {
        return {
            w: i.width,
            h: i.height,
            cw: this.stageWidth,
            ch: this.stageHeight,
            top: (this.stageHeight - i.height) / 2,
            left: (this.stageWidth - i.width) / 2
        };
    },
    attachKeyboard : function(map) {
        jQuery(document).bind('keydown', {map: map, scope: this}, this.keyNav);
        return this;
    },
    detachKeyboard : function() {
        jQuery(document).unbind('keydown', this.keyNav);
        return this;
    },
    keyNav : function(e) {
        var key = e.keyCode || e.which;
        var map = e.data.map;
        var scope = e.data.scope;
        var keymap = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            RETURN: 13,
            ESCAPE: 27,
            BACKSPACE: 8
        };
        for( var i in map ) {
            var k = i.toUpperCase();
            if ( keymap[k] ) {
                map[keymap[k]] = map[i];
            }
        }
        if (typeof map[key] == 'function') {
            map[key].call(scope, e);
        }
    },
    build : function() {
        this.append({
            'info-text' :
                ['info-title', 'info-description', 'info-author'],
            'info' : 
                ['info-link', 'info-text', 'info-close'],
            'image-nav' : 
                ['image-nav-right', 'image-nav-left'],
            'stage' : 
                ['images', 'loader', 'counter', 'image-nav'],
            'thumbnails-list' :
                ['thumbnails'],
            'thumbnails-container' : 
                ['thumb-nav-left', 'thumbnails-list', 'thumb-nav-right'],
            'container' : 
                ['stage', 'thumbnails-container', 'info']
        });
    },
    
    appendChild : function(parent, child) {
        try {
            this.get(parent).appendChild(this.get(child));
        } catch(e) {}
    },
    
    append : function(data) {
        for( var i in data) {
            if (data[i].constructor == Array) {
                for(var j=0; data[i][j]; j++) {
                    this.appendChild(i, data[i][j]);
                }
            } else {
                this.appendChild(i, data[i]);
            }
        }
        return this;
    },
    
    rescale : function(width, height) {
        
        var o = this.options;
        
        var check = this.proxy(function() {
            this.stageWidth = width || this.width(this.get('stage'));
            this.stageHeight = height || this.height(this.get('stage'));
            return this.stageWidth && this.stageHeight;
        });
        if ( G.WEBKIT ) {
            this.wait(check);// wekit is too fast
        } else {
            check.call(this); 
        }
        this.controls.getActive().scale({
            width: this.stageWidth, 
            height: this.stageHeight, 
            crop: o.image_crop, 
            max: o.max_scale_ratio,
            min: o.min_scale_ratio,
            margin: o.image_margin,
            position: o.image_position
        });
        if (this.carousel) {
            this.carousel.setOverflow();
        }
        
    },
    
    show : function(index, rewind, history) {
        if (!this.options.queue && this.queue.stalled) {
            return;
        }
        rewind = typeof rewind != 'undefined' ? !!rewind : index < this.active;
        history = history || false;
        index = parseInt(index);
        if (!history && G.History) {
            G.History.value(index.toString());
            return;
        }
        this.active = index;
        this.push([index,rewind], this.queue);
        if (!this.queue.stalled) {
            this.showImage();
        }
        return this;
    },
    
    showImage : function() {
        var o = this.options;
        var args = this.queue[0];
        var index = args[0];
        var rewind = !!args[1];
        if (o.carousel && this.carousel && o.carousel_follow) {
            this.proxy(function(c) {
                if (index <= Math.abs(c.pos)) {
                    c.pos = Math.max(0, (index-1))*-1;
                    c.animate();
                } else if ( index >= this.thumbnails.length + c.overflow + Math.abs(c.pos)) {
                    c.pos = this.thumbnails.length + c.overflow - index - 1 + (index == this.thumbnails.length-1 ? 1 : 0);
                    c.animate();
                }
            })(this.carousel);
        }
        
        var src = this.getData(index).image;
        var active = this.controls.getActive();
        var next = this.controls.getNext();
        var cached = next.isCached(src);
        var complete = this.proxy(function() {
            this.queue.stalled = false;
            this.toggleQuality(next.image, o.image_quality);
            this.setStyle( active.elem, { zIndex : 0 } );
            this.setStyle( next.elem, { zIndex : 1 } );
            this.controls.swap();
            this.moveOut( active.image );
            if (this.getData( index ).link) {
                this.setStyle( next.image, { cursor: 'pointer' } );
                this.listen( next.image, 'click', this.proxy(function() {
                    if (o.popup_links) {
                        var win = window.open(this.getData( index ).link, '_blank');
                    } else {
                        window.location.href = this.getData( index ).link;
                    }
                }));
            }
            Array.prototype.shift.call( this.queue );
            if (this.queue.length) {
                this.showImage();
            }
            this.playCheck();
        });
        if (typeof o.preload == 'number' && o.preload > 0) {
            var p,n = this.getNext();
            try {
                for (var i = o.preload; i>0; i--) {
                    p = new Picture();
                    p.add(this.getData(n).image);
                    n = this.getNext(n);
                }
            } catch(e) {}
        }
        this.trigger( {
            type: G.LOADSTART,
            cached: cached,
            imageTarget: next.image,
            thumbTarget: this.thumbnails[index].image
        } );
        next.load( src, this.proxy(function(e) {
            next.scale({
                width: this.stageWidth, 
                height: this.stageHeight, 
                crop: o.image_crop, 
                max: o.max_scale_ratio, 
                min: o.min_scale_ratio,
                margin: o.image_margin,
                position: o.image_position,
                complete: this.proxy(function() {
                    if (active.image) {
                        this.toggleQuality(active.image, false);
                    }
                    this.toggleQuality(next.image, false);
                    this.trigger({
                        type: G.LOADFINISH,
                        cached: cached,
                        imageTarget: next.image,
                        thumbTarget: this.thumbnails[index].image
                    });
                    this.queue.stalled = true;
                    var transition = G.transitions[o.transition] || o.transition;
                    if (typeof transition == 'function') {
                        transition.call(this, {
                            prev: active.image,
                            next: next.image,
                            rewind: rewind,
                            speed: o.transition_speed || 400
                        }, complete );
                    } else {
                        complete();
                    }
                })
            });
            this.setInfo(index);
            this.get('counter').innerHTML = '<span class="current">' + (index+1) + 
                '</span> / <span class="total">' + this.thumbnails.length + '</span>';
        }));
    },
    
    getNext : function(base) {
        base = base || this.active;
        return base == this.data.length - 1 ? 0 : base + 1;
    },
    
    getPrev : function(base) {
        base = base || this.active;
        return base === 0 ? this.data.length - 1 : base - 1;
    },
    
    next : function() {
        if (this.data.length > 1) {
            this.show(this.getNext(), false);
        }
        return this;
    },
    
    prev : function() {
        if (this.data.length > 1) {
            this.show(this.getPrev(), true);
        }
        return this;
    },
    
    get : function( elem ) {
        return this.dom[ elem ] || false;
    },
    
    getData : function( index ) {
        return this.data[index] || this.data[this.active];
    },
    
    play : function(delay) {
        this.playing = true;
        this.playtime = delay || this.playtime;
        this.playCheck();
        return this;
    },
    
    pause : function() {
        this.playing = false;
        return this;
    },
    
    playCheck : function() {
        if (this.playing) {
            window.clearInterval(tID);
            tID = window.setTimeout(this.proxy(function() {
                if (this.playing) {
                    this.next();
                }
            }), this.playtime);
        }
    },
    
    setActive: function(val) {
        this.active = val;
        return this;
    },
    
    setInfo : function(index) {
        var data = this.getData(index);
        var set = this.proxy(function() {
            this.loop(arguments, function(type) {
                var elem = this.get('info-'+type);
                var fn = data[type] && data[type].length ? 'reveal' : 'hide';
                this[fn](elem);
                elem.innerHTML = data[type];
            });
        });
        set('title','description','author');
        return this;
    },
    
    hasInfo : function(index) {
        var d = this.getData(index);
        var check = 'title description author'.split(' ');
        for ( var i=0; check[i]; i++ ) {
            if ( d[ check[i] ] && d[ check[i] ].length ) {
                return true;
            }
        }
        return false;
    },
    
    getDataObject : function(o) {
        var obj = {
            image: '',
            thumb: '',
            title: '',
            description: '',
            author: '',
            link: ''
        };
        return o ? this.mix(obj,o) : obj;
    },
    
    jQuery : function( str ) {
        var ret = [];
        this.loop(str.split(','), this.proxy(function(elem) {
            elem = elem.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            if (this.get(elem)) {
                ret.push(elem);
            }
        }));
        var jQ = jQuery(this.get(ret.shift()));
        this.loop(ret, this.proxy(function(elem) {
            jQ = jQ.add(this.get(elem));
        }));
        return jQ;
    },
    
    $ : function( str ) {
        return this.jQuery( str );
    },
    
    toggleQuality : function(img, force) {
        if (!G.IE7 || typeof img == 'undefined' || !img) {
            return this;
        }
        if (typeof force === 'undefined') {
            force = img.style.msInterpolationMode == 'nearest-neighbor';
        }
        img.style.msInterpolationMode = force ? 'bicubic' : 'nearest-neighbor';

        return this;
    },
    
    load : function() {
        var loaded = 0;
        var o = this.options;
        if (
            (o.data_type == 'auto' && 
                typeof o.data_source == 'object' && 
                !(o.data_source instanceof jQuery) && 
                !o.data_source.tagName
            ) || o.data_type == 'json' || o.data_source.constructor == 'Array' ) {
            this.data = o.data_source;
            this.trigger( G.DATA );
            
        } else { // assume selector
            var images = jQuery(o.data_source).find(o.data_image_selector);
            var getData = this.proxy(function( elem ) {
                var i,j,anchor = elem.parentNode;
                if (anchor && anchor.nodeName == 'A') {
                    if (anchor.href.match(/\.(png|gif|jpg)/i)) {
                        i = anchor.href;
                    } else {
                        j = anchor.href;
                    }
                }
                var obj = this.getDataObject({
                    title: elem.title,
                    thumb: elem.src,
                    image: i || elem.src,
                    description: elem.alt,
                    link: j || elem.getAttribute('longdesc'),
                    elem: elem
                });
                return this.mix(obj, o.data_config( elem ) );
            });
            
            this.loop(images, function( elem ) {
                loaded++;
                this.push( getData( elem ), this.data );
                if (!o.keep_source && !Galleria.IE) {
                    elem.parentNode.removeChild(elem);
                }
                if ( loaded == images.length ) {
                    this.trigger( G.DATA );
                }
            });
        }
    }
});

G.log = function() {
    try { 
        console.log.apply( console, Array.prototype.slice.call(arguments) ); 
    } catch(e) {
        try {
            opera.postError.apply( opera, arguments ); 
        } catch(er) { 
              alert( Array.prototype.join.call( arguments, " " ) ); 
        } 
    }
};

G.DATA = 'data';
G.READY = 'ready';
G.THUMBNAIL = 'thumbnail';
G.LOADSTART = 'loadstart';
G.LOADFINISH = 'loadfinish';
G.THEMELOAD = 'themeload';

var nav = navigator.userAgent.toLowerCase();

G.IE7 = (window.XMLHttpRequest && document.expando);
G.IE6 = (!window.XMLHttpRequest);
G.IE = !!(G.IE6 || G.IE7);
G.WEBKIT = /webkit/.test( nav );
G.SAFARI = /safari/.test( nav );
G.CHROME = /chrome/.test( nav );
G.QUIRK = (G.IE && document.compatMode && document.compatMode == "BackCompat");
G.MAC = /mac/.test(navigator.platform.toLowerCase());

var hash = window.location.hash.replace(/#\//,'');

G.themes = {};
G.themes.create = G.addTheme = function(obj) {
    var theme = {};
    var orig = ['name','author','version','defaults','init'];
    var proto = G.prototype;
    proto.loop(orig, function(val) {
        if (!obj[ val ]) {
            G.raise(val+' not specified in theme.');
        }
        if (val != 'name' && val != 'init') {
            theme[val] = obj[val];
        }
    });
    theme.init = obj.init;
    if (obj.css) {
        proto.loop(proto.getElements('script'), function(el) {
            var reg = new RegExp('galleria.' + obj.name.toLowerCase() + '.js');
            if(reg.test(el.src)) {
                var css = el.src.replace(/[^\/]*$/, "") + obj.css;
                var link = proto.getElements('#galleria-styles');
                if (link.length) {
                    link = link[0];
                } else {
                    link = proto.loadCSS();
                    link.id = 'galleria-styles';
                }
                link.href = css;
                jQuery(function() {
                    G.theme = theme;
                    jQuery(document).trigger( G.THEMELOAD );
                });
            } else {
                G.raise('No theme CSS loaded');
            }
        });  
    }
    return theme;
};

G.raise = function(msg) {
    if ( G.debug ) {
        throw new Error( msg );
    }
};

G.loadTheme = function(src) {
    G.prototype.loadScript(src);
};

jQuery.easing.galleria = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) { 
        return c/2*t*t*t*t + b;
    }
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
};

G.transitions = {
    add: function(name, fn) {
        if (name != arguments.callee.name ) {
            this[name] = fn;
        }
    },
    fade: function(params, complete) {
        jQuery(params.next).show().css('opacity',0).animate({
            opacity: 1
        }, params.speed, complete);
        if (params.prev) {
            jQuery(params.prev).css('opacity',1).animate({
                opacity: 0
            }, params.speed);
        }
    },
    flash: function(params, complete) {
        jQuery(params.next).css('opacity',0);
        if (params.prev) {
            jQuery(params.prev).animate({
                opacity: 0
            }, (params.speed/2), function() {
                jQuery(params.next).animate({
                    opacity: 1
                }, params.speed, complete);
            });
        } else {
            jQuery(params.next).animate({
                opacity: 1
            }, params.speed, complete);
        }
    },
    slide: function(params, complete) {
        var image = jQuery(params.next).parent();
        var images =  this.$('images');
        var width = this.stageWidth;
        image.css({
            left: width * ( params.rewind ? -1 : 1 )
        });
        images.animate({
            left: width * ( params.rewind ? 1 : -1 )
        }, {
            duration: params.speed,
            queue: false,
            easing: 'galleria',
            complete: function() {
                images.css('left',0);
                image.css('left',0);
                complete();
            }
        });
    },
    fadeslide: function(params, complete) {
        if (params.prev) {
            jQuery(params.prev).css({
                opacity: 1,
                left: 0
            }).animate({
                opacity: 0,
                left: 50 * ( params.rewind ? 1 : -1 )
            },{
                duration: params.speed,
                queue: false,
                easing: 'swing'
            });
        }
        jQuery(params.next).css({
            left: 50 * ( params.rewind ? -1 : 1 ), 
            opacity: 0
        }).animate({
            opacity: 1,
            left:0
        }, {
            duration: params.speed,
            complete: complete,
            queue: false,
            easing: 'swing'
        });
    }
};

jQuery.fn.galleria = function(options) {
    options = options || {};
    
    var selector = this.selector;
    if ( !options.keep_source ) {
        jQuery(this).children().hide();
    }
    
    options = G.prototype.mix(options, {target: selector } );
    var height = G.prototype.height(this);
    if (height) {
        options = G.prototype.mix( { height: height }, options );
    }
    
    G.debug = !!options.debug;
    
    var gallery = new G(options);
    if (typeof G.theme == 'undefined') {
        jQuery(document).bind(G.THEMELOAD, function() {
            gallery.init();
        });
    } else {
        gallery.init();
    }
    return gallery;
    
};

})();