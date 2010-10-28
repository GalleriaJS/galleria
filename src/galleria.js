/*
 * Galleria v 1.2 prerelease 1.1 2010-10-28
 * http://galleria.aino.se
 *
 * Copyright (c) 2010, Aino
 * Licensed under the MIT license.
 */

(function($) {

// some references
var undef,
    window = this,
    doc    = document,
    $doc   = $( doc );

// internal constants
var DEBUG = false,
    NAV   = navigator.userAgent.toLowerCase(),
    HASH  = window.location.hash.replace(/#\//, ''),
    CLICK = function() {
        // use this to make touch devices snappier
        return Galleria.TOUCH ? 'touchstart' : 'click';
    },
    IE    = (function() {
        var v = 3,
            div = doc.createElement( 'div' );
        while (
            div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
        );
        return v > 4 ? v : undef;
    }() ),
    DOM   = function() {
        return {
            html:  doc.documentElement,
            body:  doc.body,
            head:  doc.getElementsByTagName('head')[0],
            title: doc.title
        };
    },

    // the internal timeouts object
    // provides helper methods for controlling timeouts
    _timeouts = {

        trunk: {},

        add: function( id, fn, delay, loop ) {
            loop = loop || false;
            this.clear( id );
            if ( loop ) {
                var old = fn;
                fn = function() {
                    old();
                    _timeouts.add( id, fn, delay );
                };
            }
            this.trunk[ id ] = window.setTimeout( fn, delay );
        },

        clear: function( id ) {

            var del = function( i ) {
                window.clearTimeout( this.trunk[ i ] );
                delete this.trunk[ i ];
            };

            if ( !!id && id in this.trunk ) {
                del.call( _timeouts, id );

            } else if ( typeof id == 'undefined' ) {
                for ( var i in this.trunk ) {
                    del.call( _timeouts, i );
                }
            }
        }
    },

    // the internal gallery holder
    _galleries = [],

    // the transitions holder
    _transitions = {

        fade: function(params, complete) {
            $(params.next).css('opacity', 0).show().animate({
                opacity: 1
            }, params.speed, complete);

            if (params.prev) {
                $(params.prev).css('opacity', 1).show().animate({
                    opacity: 0
                }, params.speed);
            }
        },

        flash: function(params, complete) {
            $(params.next).css('opacity', 0);
            if (params.prev) {
                $(params.prev).animate({
                    opacity: 0
                }, (params.speed / 2), function() {
                    $(params.next).animate({
                        opacity: 1
                    }, params.speed, complete);
                });
            } else {
                $(params.next).animate({
                    opacity: 1
                }, params.speed, complete);
            }
        },

        pulse: function(params, complete) {
            if (params.prev) {
                $(params.prev).hide();
            }
            $(params.next).css('opacity', 0).animate({
                opacity:1
            }, params.speed, complete);
        },

        slide: function(params, complete) {
            var image  = $(params.next).parent(),
                images = this.$('images'), // ??
                width  = this._stageWidth,
                easing = this.getOptions( 'easing' );

            image.css({
                left: width * ( params.rewind ? -1 : 1 )
            });
            images.animate({
                left: width * ( params.rewind ? 1 : -1 )
            }, {
                duration: params.speed,
                queue: false,
                easing: easing,
                complete: function() {
                    images.css('left', 0);
                    image.css('left', 0);
                    complete();
                }
            });
        },

        fadeslide: function(params, complete) {

            var x = 0,
                easing = this.getOptions('easing');

            if (params.prev) {
                x = Utils.parseValue( $(params.prev).css('left') );
                $(params.prev).css({
                    opacity: 1,
                    left: x
                }).animate({
                    opacity: 0,
                    left: x + ( 50 * ( params.rewind ? 1 : -1 ) )
                },{
                    duration: params.speed,
                    queue: false,
                    easing: easing
                });
            }

            x = Utils.parseValue( $(params.next).css('left') );

            $(params.next).css({
                left: x + ( 50 * ( params.rewind ? -1 : 1 ) ),
                opacity: 0
            }).animate({
                opacity: 1,
                left: x
            }, {
                duration: params.speed,
                complete: complete,
                queue: false,
                easing: easing
            });
        }
    },

    // the Utils singleton
    Utils = (function() {

        return {

            array : function( obj ) {
                return Array.prototype.slice.call(obj);
            },

            create : function( className, nodeName ) {
                nodeName = nodeName || 'div';
                var elem = doc.createElement( nodeName );
                elem.className = className;
                return elem;
            },

            forceStyles : function( elem, styles ) {
                elem = $(elem);
                if ( elem.attr( 'style' ) ) {
                    elem.data( 'styles', elem.attr( 'style' ) ).removeAttr( 'style' );
                }
                elem.css( styles );
            },

            revertStyles : function() {
                $.each( Utils.array( arguments ), function( i, elem ) {

                    elem = $( elem ).removeAttr( 'style' );

                    if ( elem.data( 'styles' ) ) {
                        elem.attr( 'style', elem.data('styles') ).data( 'styles', null );
                    }
                });
            },

            moveOut : function( elem ) {
                Utils.forceStyles( elem, {
                    position: 'absolute',
                    left: -10000
                });
            },

            moveIn : function() {
                Utils.revertStyles.apply( Utils, Utils.array( arguments ) );
            },

            hide : function( elem, speed, callback ) {
                elem = $(elem);

                // save the value if not exist
                if (! elem.data('opacity') ) {
                    elem.data('opacity', elem.css('opacity') );
                }

                // always hide
                var style = { opacity: 0 };

                if (speed) {
                    elem.stop().animate( style, speed, callback );
                } else {
                    elem.css( style );
                };
            },

            show : function( elem, speed, callback ) {
                elem = $(elem);

                // bring back saved opacity
                var saved = parseFloat( elem.data('opacity') ) || 1,
                    style = { opacity: saved };

                // reset save if opacity == 1
                if (saved == 1) {
                    elem.data('opacity', null);
                }

                // animate or toggle
                if (speed) {
                    elem.stop().animate( style, speed, callback );
                } else {
                    elem.css( style );
                };
            },

            addTimer : function() {
                _timeouts.add.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            clearTimer : function() {
                _timeouts.clear.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            wait : function(options) {
                options = $.extend({
                    until : function() { return false; },
                    success : function() {},
                    error : function() { Galleria.raise('Could not complete wait function.'); },
                    timeout: 3000
                }, options);

                var start = Utils.timestamp(),
                    elapsed,
                    now;

                window.setTimeout(function() {
                    now = Utils.timestamp();
                    elapsed = now - start;
                    if ( options.until( elapsed ) ) {
                        options.success();
                        return false;
                    }

                    if (now >= start + options.timeout) {
                        options.error();
                        return false;
                    }
                    window.setTimeout(arguments.callee, 2);
                }, 2);
            },

            toggleQuality : function( img, force ) {

                if ( !( IE == 7 || IE == 8 ) || !!img === false ) {
                    return;
                }

                if ( typeof force === 'undefined' ) {
                    force = img.style.msInterpolationMode == 'nearest-neighbor';
                }

                img.style.msInterpolationMode = force ? 'bicubic' : 'nearest-neighbor';
            },

            insertStyleTag : function( styles ) {
                var style = doc.createElement( 'style' );
                DOM().head.appendChild( style );

                if ( style.styleSheet ) { // IE
                    style.styleSheet.cssText = styles;
                } else {
                    var cssText = doc.createTextNode( styles );
                    style.appendChild( cssText );
                }
            },

            // a loadscript method that works for local scripts
            loadScript: function( url, callback ) {
                var done = false,
                    script = $('<scr'+'ipt>').attr({
                        src: url,
                        async: true
                    }).get(0);

               // Attach handlers for all browsers
               script.onload = script.onreadystatechange = function() {
                   if ( !done && (!this.readyState ||
                       this.readyState == 'loaded' || this.readyState == 'complete') ) {
                       done = true;

                       if (typeof callback == 'function') {
                           callback.call( this, this );
                       }

                       // Handle memory leak in IE
                       script.onload = script.onreadystatechange = null;
                   }
               };

               var s = doc.getElementsByTagName( 'script' )[0];
               s.parentNode.insertBefore( script, s );
            },

            // parse anything into a number
            parseValue: function( val ) {
                if (typeof val == 'number') {
                    return val;
                } else if (typeof val == 'string') {
                    var arr = val.match(/\-?\d/g);
                    return arr && arr.constructor == Array ? arr.join('') * 1 : 0;
                } else {
                    return 0;
                }
            },

            // timestamp abstraction
            timestamp: function() {
                return new Date().getTime();
            },

            // this is pretty crap, but works for now
            // it will add a callback, but it can't guarantee that the styles can be fetched
            // using getComputedStyle further checking needed, possibly a dummy element
            loadCSS : function( href, id, callback ) {

                var link,
                    ready = false,
                    length;

                // look for manual css
                $('link[rel=stylesheet]').each(function() {
                    if ( new RegExp( href ).test( this.href ) ) {
                        link = this;
                        return false;
                    }
                });

                if ( typeof id == 'function' ) {
                    callback = id;
                    id = undef;
                }

                callback = callback || function() {}; // dirty

                // if already present, return
                if ( link ) {
                    callback.call( link, link );
                    return link;
                }

                // save the length of stylesheets to check against
                length = doc.styleSheets.length;

                // add timestamp if DEBUG is true
                if ( DEBUG ) {
                    href += '?' + Utils.timestamp();
                }

                // check for existing id
                if( $('#'+id).length ) {
                    $('#'+id).attr('href', href);
                    length--;
                    ready = true;
                } else {
                    link = $( '<link>' ).attr({
                        rel: 'stylesheet',
                        href: href,
                        id: id
                    }).get(0);

                    window.setTimeout(function() {
                        var styles = $('link[rel="stylesheet"], style');
                        if ( styles.length ) {
                            styles.get(0).parentNode.insertBefore( link, styles[0] );
                        } else {
                            DOM().head.appendChild( link );
                        }

                        if ( IE ) {
                            link.attachEvent( 'onreadystatechange', function(e) {
                                if( link.readyState == 'complete' ) {
                                    ready = true;
                                }
                            });
                        } else {
                            // what to do here? returning for now.
                            ready = true;
                        }
                    }, 10);
                }

                if (typeof callback == 'function') {

                    Utils.wait({
                        until: function() {
                            return ready && doc.styleSheets.length > length;
                        },
                        success: function() {
                            Utils.addTimer( 'css', function() {
                                callback.call( link, link );
                            }, 100);
                        },
                        error: function() {
                            Galleria.raise( 'Theme CSS could not load' );
                        },
                        timeout: 1000
                    });
                }
                return link;
            }
        };
    })();

/**
    The main Galleria class

    @class

    @example var gallery = new Galleria();

    @author http://aino.se

    @requires jQuery

    @returns {Galleria}
*/

Galleria = function() {

    var self = this;

    // the theme used
    this._theme = undef;

    // internal options
    this._options = {};

    // flag for controlling play/pause
    this._playing = false;

    // internal interval for slideshow
    this._playtime = 5000;

    // internal variable for the currently active image
    this._active = null;

    // the internal queue, arrayified
    this._queue = { length: 0 };

    // the internal data array
    this._data = [];

    // the internal dom collection
    this._dom = {};

    // the internal thumbnails array
    this._thumbnails = [];

    // internal init flag
    this._initialized = false;

    // global stagewidth/height
    this._stageWidth = 0;
    this._stageHeight = 0;

    // target holder
    this._target = undef;

    // instance id
    this._id = Utils.timestamp();

    // add some elements
    var divs =  'container stage images image-nav image-nav-left image-nav-right ' +
                'info info-text info-title info-description info-author ' +
                'thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right ' +
                'loader counter tooltip',
        spans = 'current total';

    $.each( divs.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId );
    });

    $.each( spans.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId, 'span' );
    });

    // the internal keyboard object
    // keeps reference of the keybinds and provides helper methods for binding keys
    var keyboard = this._keyboard = {

        keys : {
            'UP': 38,
            'DOWN': 40,
            'LEFT': 37,
            'RIGHT': 39,
            'RETURN': 13,
            'ESCAPE': 27,
            'BACKSPACE': 8
        },

        map : {},

        bound: false,

        press: function(e) {
            var key = e.keyCode || e.which;
            if ( key in k.map && typeof keyboard.map[key] == 'function' ) {
                keyboard.map[key].call(self, e);
            }
        },

        attach: function(map) {
            for( var key in map ) {
                var up = key.toUpperCase();
                if ( up in keyboard.keys ) {
                    keyboard.map[ keyboard.keys[up] ] = map[key];
                }
            }
            if ( !keyboard.bound ) {
                keyboard.bound = true;
                $doc.bind('keydown', keyboard.press);
            }
        },

        detach: function() {
            keyboard.bound = false;
            $doc.unbind('keydown', keyboard.press);
        }
    };

    // internal controls for keeping track of active / inactive images
    var controls = this._controls = {

        0: undef,

        1: undef,

        active : 0,

        swap : function() {
            controls.active = controls.active ? 0 : 1;
        },

        getActive : function() {
            return controls[ controls.active ];
        },

        getNext : function() {
            return controls[ 1 - controls.active ];
        }
    };

    // internal carousel object
    var carousel = this._carousel = {

        // shortcuts
        next: self.$('thumb-nav-right'),
        prev: self.$('thumb-nav-left'),

        // cache the width
        width: 0,

        // track the current position
        current: 0,

        // cache max value
        max: 0,

        // save all hooks for each width in an array
        hooks: [],

        // update the carousel
        // you can run this method anytime, f.ex on window.resize
        update: function() {
            var w = 0,
                h = 0,
                hooks = [0];

            $.each( self._thumbnails, function( i, thumb ) {
                if ( thumb.ready ) {
                    w += thumb.outerWidth || $( thumb.container ).outerWidth( true );
                    hooks[ i+1 ] = w;
                    h = Math.max( h, thumb.outerHeight || $( thumb.container).outerHeight() );
                }
            });
            self.$( 'thumbnails-container' ).toggleClass( 'galleria-carousel', w > self._stageWidth );

            self.$( 'thumbnails' ).css({
                width: w,
                height: h
            });

            carousel.max = w;
            carousel.hooks = hooks;
            carousel.width = self.$( 'thumbnails-list' ).width();
            carousel.setClasses();

            // todo: fix so the carousel moves to the left
        },

        bindControls: function() {

            carousel.next.bind( CLICK(), function(e) {
                e.preventDefault();

                if ( self._options.carousel_steps == 'auto' ) {

                    for ( var i = carousel.current; i < carousel.hooks.length; i++ ) {
                        if ( carousel.hooks[i] - carousel.hooks[ carousel.current ] > carousel.width ) {
                            carousel.set(i - 2);
                            break;
                        }
                    }

                } else {
                    carousel.set( carousel.current + self._options.carousel_steps);
                }
            });

            carousel.prev.bind( CLICK(), function(e) {
                e.preventDefault();

                if ( self._options.carousel_steps == 'auto' ) {

                    for ( var i = carousel.current; i >= 0; i-- ) {
                        if ( carousel.hooks[ carousel.current ] - carousel.hooks[i] > carousel.width ) {
                            carousel.set( i + 2 );
                            break;
                        } else if ( i == 0 ) {
                            carousel.set( 0 );
                            break;
                        }
                    }
                } else {
                    carousel.set( carousel.current - self._options.carousel_steps );
                }
            });
        },

        // calculate and set positions
        set: function( i ) {
            i = Math.max( i, 0 );
            while ( carousel.hooks[i - 1] + carousel.width > carousel.max && i >= 0 ) {
                i--;
            }
            carousel.current = i;
            carousel.animate();
        },

        // get the last position
        getLast: function(i) {
            return ( i || carousel.current ) - 1;
        },

        // follow the active image
        follow: function(i) {

            //don't follow if position fits
            if ( i == 0 || i == carousel.hooks.length - 2 ) {
                carousel.set( i );
                return;
            }

            // calculate last position
            var last = carousel.current;
            while( carousel.hooks[last] - carousel.hooks[ carousel.current ] <
                   carousel.width && last <= carousel.hooks.length ) {
                last ++;
            }

            // set position
            if ( i - 1 < carousel.current ) {
                carousel.set( i - 1 );
            } else if ( i + 2 > last) {
                carousel.set( i - last + carousel.current + 2 );
            }
        },

        // helper for setting disabled classes
        setClasses: function() {
            carousel.prev.toggleClass( 'disabled', !carousel.current );
            carousel.next.toggleClass( 'disabled', carousel.hooks[ carousel.current ] + carousel.width > carousel.max );
        },

        // the animation method
        animate: function(to) {
            carousel.setClasses();
            var num = carousel.hooks[ carousel.current ] * -1;

            if ( isNaN( num ) ) {
                return;
            }

            self.$( 'thumbnails' ).animate({
                left: num
            },{
                duration: self._options.carousel_speed,
                easing: self._options.easing,
                queue: false
            });
        }
    };

    // tooltip control
    // added in 1.2
    var tooltip = this._tooltip = {

        initialized : false,

        active: null,

        open: false,

        init: function() {

            tooltip.initialized = true;

            var css = '.galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3' +
                      'opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}';

            Utils.insertStyleTag(css);

            self.$( 'tooltip' ).css('opacity', .8);
            Utils.hide( self.get('tooltip') );

        },

        // move handler
        move: function( e ) {
            var mouseX = self.getMousePosition(e).x,
                mouseY = self.getMousePosition(e).y,
                $elem = self.$( 'tooltip' ),
        x = mouseX,
        y = mouseY,
        height = $elem.outerHeight( true ) + 1,
        width = $elem.outerWidth( true ),
        limitY = height + 15;

            var maxX = self._stageWidth - width;
            var maxY = self._stageHeight - height;

            if ( !isNaN(x) && !isNaN(y) ) {

                x += 15;
                y -= 35;

                x = Math.max( 0, Math.min( maxX, x ) );
                y = Math.max( 0, Math.min( maxY, y ) );

                if( mouseY < limitY ) {
                    y = limitY;
                }

                $elem.css({ left: x, top: y });
            }
        },

        // bind elements to the tooltip
        // you can bind multiple elementIDs using { elemID : function } or { elemID : string }
        // you can also bind single DOM elements using bind(elem, string)
        bind: function( elem, value ) {

            if (! tooltip.initialized ) {
                tooltip.init();
            }

            var hover = function( elem, value) {

                tooltip.define( elem, value );

                $( elem ).hover(function() {

                    tooltip.active = elem;
                    Utils.clearTimer('switch_tooltip');
                    self.$('container').unbind( 'mousemove', tooltip.move ).bind( 'mousemove', tooltip.move ).trigger( 'mousemove' );
                    tooltip.show( elem );

                    Galleria.utils.addTimer( 'tooltip', function() {

                        Utils.show( self.get( 'tooltip' ), 400 );
                        tooltip.open = true;

                    }, tooltip.open ? 0 : 1000);

                }, function() {

                    tooltip.active = null;

                    self.$( 'container' ).unbind( 'mousemove', tooltip.move );
                    Utils.clearTimer( 'tooltip' );

                    Utils.hide( self.get( 'tooltip' ), 200, function() {
                        Utils.addTimer('switch_tooltip', function() {
                            tooltip.open = false;
                        }, 1000);
                    });
                });
            };

            if (typeof value == 'string') {
                hover( ( elem in self._dom ? self.get(elem) : elem ), value );
            } else {
                // asume elemID here
                $.each( elem, function( elemID, val ) {
                    hover( self.get(elemID), val );
                });
            }
        },

        show: function( elem ) {
            var text = $(elem).data('tt');
            if ( ! text ) {
                return;
            }
            text = typeof text == 'function' ? text() : text;
            self.$( 'tooltip' ).html( text.replace(/\s/, '&nbsp;') );
        },

        // redefine the tooltip here
        define: function( elem, value ) {

            // we store functions, not strings
            if (typeof value !== 'function') {
                var s = value;
                value = function() {
                    return s;
                };
            }

            if ( elem in self._dom ) {
                elem = self.get( elem );
            }

            $(elem).data('tt', value);

            tooltip.show( elem );

        },

        refresh: function() {
            $.each( arguments, function(i, elem) {
                if ( tooltip.active == elem ) {
                    tooltip.show( elem );
                }
            });
        }
    };

    // internal fullscreen control
    // added in 1.195
    // still kind of experimental
    var fullscreen = this._fullscreen = {
        scrolled: 0,
        enter: function(callback) {

            // hide the image until rescale is complete
            Utils.hide( self.getActiveImage() );

            self.$( 'container' ).addClass( 'fullscreen' );

            fullscreen.scrolled = $(window).scrollTop();

            // begin styleforce
            Utils.forceStyles(self.get('container'), {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10000
            });

            var htmlbody = {
                height: '100%',
                overflow: 'hidden',
                margin:0,
                padding:0
            };

            Utils.forceStyles( DOM().html, htmlbody );
            Utils.forceStyles( DOM().body, htmlbody );

            // attach some keys
            self.attachKeyboard({
                escape: self.exitFullscreen,
                right: self.next,
                left: self.prev
            });

            // init the first rescale and attach callbacks
            self.rescale(function() {

                Utils.addTimer('fullscreen_enter', function() {
                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if (typeof callback == 'function') {
                        callback.call( self );
                    }

                }, 50);

                self.trigger( Galleria.FULLSCREEN_ENTER );
            });

            // bind the scaling to the resize event
            $(window).resize( function() {
                fullscreen.scale();
            } );
        },

        scale : function() {
            self.rescale();
        },

        exit: function(callback) {

            Utils.hide( self.getActiveImage() );

            self.$('container').removeClass( 'fullscreen' );

            // revert all styles
            Utils.revertStyles( self.get('container'), DOM().html, DOM().body );

            // scroll back
            window.scrollTo(0, fullscreen.scrolled);

            // detach all keyboard events (is this good?)
            self.detachKeyboard();

            self.rescale(function() {
                Utils.addTimer('fullscreen_exit', function() {

                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if ( typeof callback == 'function' ) {
                        callback.call( self );
                    }

                }, 50);

                self.trigger( Galleria.FULLSCREEN_EXIT );
            });

            $(window).unbind('resize', fullscreen.scale);
        }
    };

    // the internal idle object for controlling idle states
    // TODO occational event conflicts
    var idle = this._idle = {

        trunk: [],

        bound: false,

        add: function(elem, to) {
            if (!elem) {
                return;
            }
            if (!idle.bound) {
                idle.addEvent();
            }
            elem = $(elem);

            var from = {};

            for (var style in to) {
                from[style] = elem.css(style);
            }
            elem.data('idle', {
                from: from,
                to: to,
                complete: true,
                busy: false
            });
            idle.addTimer();
            idle.trunk.push(elem);
        },

        remove: function(elem) {

            elem = jQuery(elem);

            $.each(idle.trunk, function(i, el) {
                if ( el.length && !el.not(elem).length ) {
                    self._idle.show(elem);
                    self._idle.trunk.splice(i, 1);
                }
            });

            if (!idle.trunk.length) {
                idle.removeEvent();
                Utils.clearTimer('idle');
            }
        },

        addEvent : function() {
            idle.bound = true;
            self.$('container').bind('mousemove click', idle.showAll );
        },

        removeEvent : function() {
            idle.bound = false;
            self.$('container').unbind('mousemove click', idle.showAll );
        },

        addTimer : function() {
            Utils.addTimer('idle', function() {
                self._idle.hide();
            }, self._options.idle_time );
        },

        hide : function() {
            self.trigger( Galleria.IDLE_ENTER );

            $.each( idle.trunk, function(i, elem) {

                var data = elem.data('idle');

                if (! data) {
                    return;
                }

                data.complete = false;

                elem.stop().animate(data.to, {
                    duration: 600,
                    queue: false,
                    easing: 'swing'
                });
            });
        },

        showAll : function() {
            Utils.clearTimer('idle');

            $.each(self._idle.trunk, function( i, elem ) {
                self._idle.show( elem );
            });
        },

        show: function(elem) {

            var data = elem.data('idle');

            if (!data.busy && !data.complete) {

                data.busy = true;

                self.trigger( Galleria.IDLE_EXIT );

                elem.animate(data.from, {
                    duration: 300,
                    queue: false,
                    easing: 'swing',
                    complete: function() {
                        $(this).data('idle').busy = false;
                        $(this).data('idle').complete = true;
                    }
                });
            }
            idle.addTimer();
        }
    };

    // internal lightbox object
    // creates a predesigned lightbox for simple popups of images in galleria
    var lightbox = this._lightbox = {

        width : 0,

        height : 0,

        initialized : false,

        active : null,

        image : null,

        elems : {},

        init : function() {

            // trigger the event
            self.trigger( Galleria.LIGHTBOX_OPEN );

            if ( lightbox.initialized ) {
                return;
            }
            lightbox.initialized = true;

            // create some elements to work with
            var elems = 'overlay box content shadow title info close prevholder prev nextholder next counter image',
                el = {},
                op = self._options,
                css = '',
                cssMap = {
                    overlay:    'position:fixed;display:none;opacity:'+op.overlay_opacity+';top:0;left:0;width:100%;height:100%;background:'+op.overlay_background+';z-index:99990',
                    box:        'position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991',
                    shadow:     'position:absolute;background:#000;width:100%;height:100%;',
                    content:    'position:absolute;background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden',
                    info:       'position:absolute;bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px',
                    close:      'position:absolute;top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999',
                    image:      'position:absolute;top:10px;left:10px;right:10px;bottom:30px;overflow:hidden',
                    prevholder: 'position:absolute;width:50%;height:100%;cursor:pointer',
                    nextholder: 'position:absolute;width:50%;height:100%;right:0;cursor:pointer',
                    prev:       'position:absolute;top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;line-height:40px;text-align:center;color:#000',
                    next:       'position:absolute;top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;line-height:40px;text-align:center;color:#000',
                    title:      'float:left',
                    counter:    'float:right;margin-left:8px'
                },
                hover = function(elem) {
                    return elem.hover(
                        function() { $(this).css( 'color', '#bbb' ); },
                        function() { $(this).css( 'color', '#444' ); }
                    );
                };

            // create and insert CSS
            $.each(cssMap, function( key, value ) {
                css += '.galleria-lightbox-'+key+'{'+value+'}';
            });

            Utils.insertStyleTag( css );

            // create the elements
            $.each(elems.split(' '), function( i, elemId ) {
                self.addElement( 'lightbox-' + elemId );
                el[ elemId ] = lightbox.elems[ elemId ] = self.get( 'lightbox-' + elemId );
            });

            // initiate the image
            lightbox.image = new Galleria.Picture();

            // append the elements
            self.append({
                'lightbox-box': ['lightbox-shadow','lightbox-content', 'lightbox-close','lightbox-prevholder','lightbox-nextholder'],
                'lightbox-info': ['lightbox-title','lightbox-counter'],
                'lightbox-content': ['lightbox-info', 'lightbox-image'],
                'lightbox-prevholder': 'lightbox-prev',
                'lightbox-nextholder': 'lightbox-next'
            });

            $( el.image ).append( lightbox.image.container );

            $( DOM().body ).append( el.overlay, el.box );

            // add the prev/next nav and bind some controls

            hover( $( el.close ).bind( CLICK(), lightbox.hide ).html('&#215;') );

            $.each( ['Prev','Next'], function(i, dir) {

                var $d = $( el[ dir.toLowerCase() ] ).html( /v/.test( dir ) ? '‹&nbsp;' : '&nbsp;›' );

                $( el[ dir.toLowerCase()+'holder'] ).hover(function() {
                    $d.show();
                }, function() {
                    $d.fadeOut( 200 );
                }).bind( CLICK(), function() {
                    lightbox[ 'show' + dir ]();
                });

            });
            $( el.overlay ).bind( CLICK(), lightbox.hide );

        },

        rescale: function(event) {

            // calculate
            var width = Math.min( $(window).width(), lightbox.width ),
                height = Math.min( $(window).height(), lightbox.height ),
                ratio = Math.min( (width - 60) / lightbox.width, (height - 80) / lightbox.height ),
                destWidth = ( lightbox.width * ratio ) + 40,
                destHeight = ( lightbox.height * ratio ) + 60,
                to = {
                    width: destWidth,
                    height: destHeight,
                    marginTop: Math.ceil( destHeight / 2 ) *- 1,
                    marginLeft: Math.ceil( destWidth / 2 ) *- 1
                };

            // if rescale event, don't animate
            if ( event ) {
                $( lightbox.elems.box ).css( to );
            } else {
                $( lightbox.elems.box ).animate(
                    to,
                    self._options.lightbox_transition_speed,
                    self._options.easing,
                    function() {
                        var image = lightbox.image,
                            speed = self._options.lightbox_fade_speed;

                        self.trigger({
                            type: Galleria.LIGHTBOX_IMAGE,
                            imageTarget: image.image
                        });

                        image.show();
                        Utils.show( image.image, speed );
                        Utils.show( lightbox.elems.info, speed );
                    }
                );
            }
        },

        hide: function() {

            // remove the image
            lightbox.image.image = null;

            $(window).unbind('resize', lightbox.rescale);

            $( lightbox.elems.box ).hide();

            Utils.hide( lightbox.elems.info );

            Utils.hide( lightbox.elems.overlay, 200, function() {
                $( this ).hide().css( 'opacity', self._options.overlay_opacity );
                self.trigger( Galleria.LIGHTBOX_CLOSE );
            });
        },

        showNext: function() {
            lightbox.show( self.getNext( lightbox.active ) );
        },

        showPrev: function() {
            lightbox.show( self.getPrev( lightbox.active ) );
        },

        show: function(index) {

            lightbox.active = index = typeof index == 'number' ? index : self.getIndex();

            if ( !lightbox.initialized ) {
                lightbox.init();
            }

            $(window).unbind('resize', lightbox.rescale );

            var data = self.getData(index),
                total = self.getDataLength();

            Utils.hide( lightbox.elems.info );

            lightbox.image.load( data.image, function( image ) {

                lightbox.width = image.original.width;
                lightbox.height = image.original.height;

                $( image.image ).css({
                    width: '100.5%',
                    height: '100.5%',
                    top: 0,
                    zIndex: 99998,
                    opacity: 0
                });

                lightbox.elems.title.innerHTML = data.title;
                lightbox.elems.counter.innerHTML = (index + 1) + ' / ' + total;
                $(window).resize( lightbox.rescale );
                lightbox.rescale();
            });

            $( lightbox.elems.overlay ).show();
            $( lightbox.elems.box ).show();
        }
    };

    return this;
};

// end Galleria constructor

Galleria.prototype = {

    /**
        Use this function to initialize the gallery and start loading.
        Should only be called once per instance.

        @param {HTML Element} target The target element
        @param {Object} options The gallery options

        @returns {Galleria}
    */

    init: function( target, options ) {

        var self = this;

        // save the instance
        _galleries.push( this );

        // save the original ingredients
        this._original = {
            target: target,
            options: options,
            data: null
        };

        // save the target here
        this._target = this._dom.target = target.nodeName ? target : $( target ).get(0);

        // raise error if no target is detected
        if ( !this._target ) {
             Galleria.raise('Target not found.');
             return;
        }

        // apply options
        this._options = {
            autoplay: false,
            carousel: true,
            carousel_follow: true,
            carousel_speed: 400,
            carousel_steps: 'auto',
            clicknext: false,
            data_config : function( elem ) { return {}; },
            data_selector: 'img',
            data_source: this._target,
            debug: undef,
            easing: 'galleria',
            extend: function(options) {},
            height: 'auto',
            idle_time: 3000,
            image_crop: false,
            image_margin: 0,
            image_pan: false,
            image_pan_smoothness: 12,
            image_position: '50%',
            keep_source: false,
            lightbox_fade_speed: 200,
            lightbox_transition_speed: 500,
            link_source_images: true,
            max_scale_ratio: undef,
            min_scale_ratio: undef,
            on_image: function(img,thumb) {},
            overlay_opacity: .85,
            overlay_background: '#0b0b0b',
            pause_on_interaction: true, // 1.9.96
            popup_links: false,
            preload: 2,
            queue: true,
            show: 0,
            show_info: true,
            show_counter: true,
            show_imagenav: true,
            thumb_crop: true,
            thumb_event_type: CLICK(),
            thumb_fit: true,
            thumb_margin: 0,
            thumb_quality: 'auto',
            thumbnails: true,
            transition: 'fade',
            transition_initial: undef,
            transition_speed: 400,
            width: 'auto'
        };

        // apply debug
        if ( options && options.debug === true ) {
            DEBUG = true;
        }

        // hide all content
        $( this._target ).children().hide();

        // now we just have to wait for the theme...
        if ( Galleria.theme ) {
            this._init();
        } else {
            Utils.addTimer('themeload', function() {
                Galleria.raise( 'No theme found. ');
            }, 2000);

            $doc.one( Galleria.THEMELOAD, function() {
                Utils.clearTimer( 'themeload' );
                self._init.call( self );
            });
        }
    },

    // the internal _init is called when the THEMELOAD event is triggered
    // this method should only be called once per instance
    // for manipulation of data, use the .load method

    _init: function() {
        var self = this;

        if ( this._initialized ) {
            Galleria.raise( 'Init failed: Gallery instance already initialized.' );
            return this;
        }

        this._initialized = true;

        if ( !Galleria.theme ) {
            Galleria.raise( 'Init failed: No theme found.' );
            return this;
        }

        // merge the theme & caller options
        $.extend( true, this._options, Galleria.theme.defaults, this._original.options );

        // bind the gallery to run when data is ready
        this.bind( Galleria.DATA, function() {

            // save the new data
            this._original.data = this._data;

            // lets show the counter here
            this.get('total').innerHTML = this.getDataLength();

            // cache the container
            var $container = this.$( 'container' );

            // the gallery is ready, let's just wait for the css
            var num = { width: 0, height: 0 };
            var testElem =  Utils.create('galleria-image');

            // check container and thumbnail height
            Utils.wait({
                until: function() {

                    // keep trying to get the value
                    $.each(['width', 'height'], function( i, m ) {

                        if (self._options[ m ] && typeof self._options[ m ] == 'number') {
                            num[ m ] = self._options[ m ];
                        } else {
                            num[m] = $container[ m ]() ||
                                     Utils.parseValue( $container.css( m ) ) ||
                                     self.$( 'target' )[ m ]() ||
                                     Utils.parseValue( self.$( 'target' ).css( m ) );
                        }

                        $container[m]( num[ m ] );
                    });

                    var thumbHeight = function() {
                        return true;
                    };

                    // make sure thumbnails have a height as well
                    if ( self._options.thumbnails ) {
                        self.$('thumbnails').append( testElem );
                        thumbHeight = function() {
                            return !!$( testElem ).height();
                        };
                    }

                    return thumbHeight() && num.width && num.height > 50;

                },
                success: function() {

                    // remove the testElem
                    $( testElem ).remove();

                    // for some strange reason, webkit needs a single setTimeout to play ball
                    if ( Galleria.WEBKIT ) {
                        window.setTimeout( function() {
                            self._run();
                        }, 1);
                    } else {
                        self._run();
                    }
                },
                error: function() {
                    // Height was probably not set, raise a hard error
                    Galleria.raise('Width & Height not found.', true);
                },
                timeout: 2000
            });
        });

        // postrun some stuff after the gallery is ready
        // make sure it only runs once
        var one = false;

        this.bind( Galleria.READY, function() {

            // show counter
            Utils.show( this.get('counter') );

            // bind clicknext
            if ( this._options.clicknext ) {
                $.each( this._data, function( i, data ) {
                    delete data.link;
                });
                this.$( 'stage' ).css({ cursor : 'pointer' }).bind( CLICK(), function(e) {
                    self.next();
                });
            }

            // bind carousel nav
            if ( this._options.carousel ) {
                this._carousel.bindControls();
            }

            // start autoplay
            if ( this._options.autoplay ) {

                this.pause();

                if ( typeof this._options.autoplay == 'number' ) {
                    this._playtime = this._options.autoplay;
                }

                this.trigger( Galleria.PLAY );
                this._playing = true;
            }

            // if second load, just do the show and return
            if ( one ) {
                this.show( this._options.show );
                return;
            }

            one = true;

            // initialize the History plugin
            if ( Galleria.History ) {

                // bind the show method
                Galleria.History.change(function(e) {

                    // grab history ID
                    var val = parseInt( e.value.replace( /\//, '' ) );

                    // if ID is NaN, the user pressed back from the first image
                    // return to previous address
                    if (isNaN(val)) {
                        window.history.go(-1);

                    // else show the image
                    } else {
                        self.show( val, undef, true );
                    }
                });
            }

            // call the theme init method
            Galleria.theme.init.call( this, this._options );

            // call the extend option
            this._options.extend.call( this, this._options );

            // show the initial image
            // first test for permalinks in history
            if ( /^[0-9]{1,4}$/.test( HASH ) && Galleria.History ) {
                this.show( HASH, undef, true );

            } else {
                this.show( this._options.show );
            }

        });

        // build the gallery frame
        this.append({
            'info-text' :
                ['info-title', 'info-description', 'info-author'],
            'info' :
                ['info-text'],
            'image-nav' :
                ['image-nav-right', 'image-nav-left'],
            'stage' :
                ['images', 'loader', 'counter', 'image-nav'],
            'thumbnails-list' :
                ['thumbnails'],
            'thumbnails-container' :
                ['thumb-nav-left', 'thumbnails-list', 'thumb-nav-right'],
            'container' :
                ['stage', 'thumbnails-container', 'info', 'tooltip']
        });

        Utils.hide( this.$( 'counter' ).append(
            this.get( 'current' ),
            ' / ',
            this.get( 'total' )
        ) );

        this.setCounter('&#8211;');

        // add images to the controls
        $.each( new Array(2), function(i) {

            // create a new Picture instance
            var image = new Galleria.Picture();

            // apply some styles
            $( image.container ).css({
                position: 'absolute',
                top: 0,
                left: 0
            });

            // append the image
            self.$( 'images' ).append( image.container );

            // reload the controls
            self._controls[i] = image;

        });

        // some forced generic styling
        this.$( 'images' ).css({
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });

        this.$( 'thumbnails, thumbnails-list' ).css({
            overflow: 'hidden',
            position: 'relative'
        });

        // bind image navigation arrows
        this.$( 'image-nav-right, image-nav-left' ).bind( CLICK(), function(e) {

            // tune the clicknext option
            if ( self._options.clicknext ) {
                e.stopPropagation();
            }

            // pause if options is set
            if ( self._options.pause_on_interaction ) {
                self.pause();
            }

            // navigate
            var fn = /right/.test( this.className ) ? 'next' : 'prev';
            self[ fn ]();

        });

        // hide controls if chosen to
        $.each( ['info','counter','image-nav'], function( i, el ) {
            if ( self._options[ 'show_' + el.replace(/-/, '') ] === false ) {
                Utils.moveOut( self.get( el ) );
            }
        });

        // load up target content
        this.load();

        // now it's usually safe to remove the content
        // IE will never stop loading if we remove it, so let's keep it hidden for IE (it's usually fast enough anyway)
        if ( !this._options.keep_source && !IE ) {
            this._target.innerHTML = '';
        }

        // append the gallery frame
        this.$( 'target' ).append( this.get( 'container' ) );

        // parse the carousel on each thumb load
        if ( this._options.carousel ) {
            this.bind( Galleria.THUMBNAIL, function() {
                this.updateCarousel();
            });
        }

        // bind on_image helper
        this.bind( Galleria.IMAGE, function( e ) {
            this._options.on_image.call( this, e.imageTarget, e.thumbTarget );
        });

        return this;
    },

    // the internal _run method should be called after loading data into galleria
    // creates thumbnails and makes sure the gallery has proper meassurements
    _run : function() {
        // shortcuts
        var self = this,
            o = this._options,

            // width/height for calculations
            width  = 0,
            height = 0,

            // cache the thumbnail option
            optval = typeof o.thumbnails == 'string' ? o.thumbnails.toLowerCase() : null;

        // loop through data and create thumbnails
        for( var i = 0; this._data[i]; i++ ) {

            var thumb,
                data = this._data[i],
                $container;

            if ( o.thumbnails === true ) {

                // add a new Picture instance
                thumb = new Galleria.Picture(i);

                // get source from thumb or image
                var src = data.thumb || data.image;

                // append the thumbnail
                this.$( 'thumbnails' ).append( thumb.container );

                // cache the container
                $container = $( thumb.container );

                // move some data into the instance
                thumb.data = {
                    width  : Utils.parseValue( $container.css('width') ),
                    height : Utils.parseValue( $container.css('height') ),
                    order  : i
                };

                // grab & reset size for smoother thumbnail loads
                $container.css(( o.thumb_fit && o.thumb_crop !== true ) ?
                    { width: 0, height: 0 } :
                    { width: thumb.data.width, height: thumb.data.height });

                // load the thumbnail
                thumb.load( src, function( thumb ) {

                    // scale when ready
                    thumb.scale({
                        width:    thumb.data.width,
                        height:   thumb.data.height,
                        crop:     o.thumb_crop,
                        margin:   o.thumb_margin,
                        complete: function( thumb ) {

                            // shrink thumbnails to fit
                            var top = ['left', 'top'];
                            var arr = ['Width', 'Height'];

                            // calculate shrinked positions
                            $.each(arr, function( i, meassure ) {
                                var m = meassure.toLowerCase();
                                if ( (o.thumb_crop !== true || o.thumb_crop == m ) && o.thumb_fit ) {
                                    var css = {};
                                    css[m] = thumb[m];
                                    $( thumb.container ).css( css );
                                    css = {};
                                    css[top[i]] = 0;
                                    $( thumb.image ).css( css);
                                }

                                // cache outer meassures
                                thumb['outer' + meassure] = $( thumb.container )['outer' + meassure]( true );
                            });

                            // set high quality if downscale is moderate
                            Utils.toggleQuality( thumb.image,
                                o.thumb_quality === true ||
                                ( o.thumb_quality == 'auto' && thumb.original.width < thumb.width * 3 )
                            );

                            // trigger the THUMBNAIL event
                            self.trigger({
                                type: Galleria.THUMBNAIL,
                                thumbTarget: thumb.image,
                                thumbOrder: thumb.data.order
                            });
                        }
                    });
                });

                // preload all images here
                if ( o.preload == 'all' ) {
                    thumb.add( data.image );
                }

            // create empty spans if thumbnails is set to 'empty'
            } else if ( optval == 'empty' || optval == 'numbers' ) {

                thumb = {
                    container:  Utils.create( 'galleria-image' ),
                    image: Utils.create( 'img', 'span' ),
                    ready: true
                };

                // create numbered thumbnails
                if ( optval == 'numbers' ) {
                    $( thumb.image ).text( i + 1 );
                }

                $( thumb.container ).append( thumb.image );
                this.$( 'thumbnails' ).append( thumb.container );

                self.trigger({
                    type: Galleria.THUMBNAIL,
                    thumbTarget: thumb.image,
                    thumbOrder: i
                });

            // create null object to silent errors
            } else {
                thumb = {
                    container: null,
                    image: null
                };
            }

            // add events for thumbnails
            // you can control the event type using thumb_event_type
            // we'll add the same event to the source if it's kept

            $( thumb.container ).add( o.keep_source && o.link_source_images ? data.original : null )
                .data('index', i).bind(o.thumb_event_type, function(e) {
                    // pause if option is set
                    if ( o.pause_on_interaction ) {
                        self.pause();
                    }

                    // extract the index from the data
                    var index = $( e.currentTarget ).data( 'index' );
                    if ( self.getIndex() !== index ) {
                        self.show( index );
                    }

                    e.preventDefault();
            });

            this._thumbnails.push( thumb );
        }

        // make sure we have a stageHeight && stageWidth

        Utils.wait({

            until: function() {
                self._stageWidth  = self.$( 'stage' ).width();
                self._stageHeight = self.$( 'stage' ).height();
                return( self._stageWidth && self._stageHeight > 50 ); // what is an acceptable height?
            },

            success: function() {
                self.trigger( Galleria.READY );
            },

            error: function() {
                Galleria.raise('stage meassures not found');
            }

        });
    },

    /**
        Loads data into the gallery.
        You can call this method on an existing gallery to reload the gallery with new data.

        @param {Array or String} source Optional JSON array of data or selector of where to find data in the document.
        Defaults to the Galleria target or data_source option.

        @param {String} selector Optional element selector of what elements to parse.
        Defaults to 'img'.

        @param {Function} config Optional function to modify the data extraction proceedure from the selector.
        See the data_config option for more information.

        @returns {Galleria}
    */

    load : function( source, selector, config ) {

        var self = this;

        // empty the data array
        this._data = [];

        // empty the thumbnails
        this._thumbnails = [];
        this.$('thumbnails').empty();

        // shorten the arguments
        if ( typeof selector == 'function' ) {
            config = selector;
            selector = null;
        }

        // use the source set by target
        source = source || this._options.data_source;

        // use selector set by option
        selector = selector || this._options.data_selector;

        // use the data_config set by option
        config = config || this._options.data_config;

        // check if the data is an array already
        if ( source.constructor == Array ) {
            if ( this.validate( source) ) {
                this._data = source;
                this.trigger( Galleria.DATA );
            } else {
                Galleria.raise( 'Load failed: JSON Array not valid.' );
            }
            return this;
        }
        // loop through images and set data
        $( source ).find( selector ).each( function( i, img ) {
            var data = {},
                img = $( img ),
                parent = img.parent(),
                href = parent.attr( 'href' );

            // check if it's a link to another image
            if ( /\.(png|gif|jpg|jpeg)$/i.test(href) ) {
                data.image = href;

            // else assign the href as a link if it exists
            } else if ( href ) {
                data.link = href;
            }

            // mix default extractions with the hrefs and config
            // and push it into the data array
            self._data.push( $.extend({

                title:       img.attr('title'),
                thumb:       img.attr('src'),
                image:       img.attr('src'),
                description: img.attr('alt'),
                link:        img.attr('longdesc'),
                original:    img.get(0) // saved as a reference

            }, data, config( img ) ) );

        });
        // trigger the DATA event and return
        if ( this.getDataLength() ) {
            this.trigger( Galleria.DATA );
        } else {
            Galleria.raise('Load failed: no data found.');
        }
        return this;

    },

    _getActive: function() {
        return this._controls.getActive();
    },

    validate : function( data ) {
        // todo: validate a custom data array
        return true;
    },

    /**
        Bind any event to Galleria

        @param {String} type The Event type to listen for
        @param {Function} fn The function to execute when the event is triggered

        @example this.bind( Galleria.IMAGE, function() { Galleria.log('image shown') });

        @returns {Galleria}
    */

    bind : function(type, fn) {
        this.$( 'container' ).bind( type, this.proxy(fn) );
        return this;
    },

    /**
        Unbind any event to Galleria

        @param {String} type The Event type to forget

        @returns {Galleria}
    */

    unbind : function(type) {
        this.$( 'container' ).unbind( type );
        return this;
    },

    /**
        Manually trigger a Galleria event

        @param {String} type The Event to trigger

        @returns {Galleria}
    */

    trigger : function( type ) {
        type = typeof type == 'object' ?
            $.extend( type, { scope: this } ) :
            { type: type, scope: this };
        this.$( 'container' ).trigger( type );
        return this;
    },

    /**
        Assign an "idle state" to any element.
        The idle state will be applied after a certain amount of idle time
        Useful to hide f.ex navigation when the gallery is inactive

        @param {HTML Element or String} elem The Dom node or selector to apply the idle state to
        @param {Object} styles the CSS styles to apply

        @example addIdleState( this.get('image-nav'), { opacity: 0 });
        @example addIdleState( '.galleria-image-nav', { top: -200 });

        @returns {Galleria}
    */

    addIdleState: function( elem, styles ) {
        this._idle.add.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Removes any idle state previously set using addIdleState()

        @param {HTML Element or String} elem The Dom node or selector to remove the idle state from.

        @returns {Galleria}
    */

    removeIdleState: function( elem ) {
        this._idle.remove.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Force Galleria to enter idle mode.

        @returns {Galleria}
    */

    enterIdleMode: function() {
        this._idle.hide();
        return this;
    },

    /**
        Force Galleria to exit idle mode.

        @returns {Galleria}
    */

    exitIdleMode: function() {
        this.idle._show();
        return this;
    },

    /**
        Enter FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns {Galleria}
    */

    enterFullscreen: function( callback ) {
        this._fullscreen.enter.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Exits FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns {Galleria}
    */

    exitFullscreen: function( callback ) {
        this._fullscreen.exit.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Adds a tooltip to any element.
        You can also call this method with an object as argument with elemID:value pairs to apply tooltips to (see examples)

        @param {HTML Element} elem The DOM Node to attach the event to
        @param {String or Function} value The tooltip message. Can also be a function that returns a string.

        @example this.bindTooltip( this.get('thumbnails'), 'My thumbnails');
        @example this.bindTooltip( this.get('thumbnails'), function() { return 'My thumbs' });
        @example this.bindTooltip( { image_nav: 'Navigation' });

        @returns {Galleria}
    */

    bindTooltip: function( elem, value ) {
        this._tooltip.bind.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Redefine a tooltip
        Use this if you want to change the tooltip value at runtime

        @param {HTML Element} elem The DOM Node to attach the event to
        @param {String or Function} value The tooltip message. Can also be a function that returns a string.

        @returns {Galleria}
    */

    defineTooltip: function( elem, value ) {
        this._tooltip.define.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    // leave this out of the API for now

    refreshTooltip: function() {
        this._tooltip.refresh.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Open a pre-designed lightbox with the currently active image.
        You can control some visuals using gallery options.

        @returns {Galleria}
    */

    openLightbox: function() {
        this._lightbox.show.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Close the lightbox.

        @returns {Galleria}
    */

    closeLightbox: function() {
        this._lightbox.hide.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Get the currently active image element.

        @returns {HTML Element} The image element
    */

    getActiveImage: function() {
        return this._getActive().image || undef;
    },

    /**
        Get the currently active thumbnail element.

        @returns {HTML Element} The thumbnail element
    */

    getActiveThumb: function() {
        return this._thumbnails[ this._active ].image || undef;
    },

    /**
        Get the mouse position relative to the gallery container

        @param e The mouse event

        @example

var gallery = this;
$(document).mousemove(function(e) {
    console.log( gallery.getMousePosition(e).x );
});

        @returns {Object} Object with x & y of the relative mouse postion
    */

    getMousePosition : function(e) {
        return {
            x: e.pageX - this.$( 'stage' ).offset().left,
            y: e.pageY - this.$( 'stage' ).offset().top
        };
    },

    /**
        Adds a panning effect to the image

        @param img The optional image element. If not specified it takes the currently active image

        @returns {Galleria}
    */

    addPan : function( img ) {

        if ( this._options.image_crop === false ) {
            return;
        }

        img = $( img || this.getActiveImage() );

        // define some variables and methods
        var self   = this,
            x      = img.width() / 2,
            y      = img.height() / 2,
            curX   = destX = parseInt( img.css( 'left' ) ) || 0,
            curY   = destY = parseInt( img.css( 'top' ) ) || 0,
            distX  = 0,
            distY  = 0,
            active = false,
            ts     = Utils.timestamp(),
            cache  = 0,
            move   = 0,

            // positions the image
            position = function( dist, cur, pos ) {
                if ( dist > 0 ) {
                    move = Math.round( Math.max( dist * -1, Math.min( 0, cur ) ) );
                    if ( cache != move ) {

                        cache = move;

                        if ( IE == 8 ) { // scroll is faster for IE
                            img.parent()[ 'scroll' + pos ]( move * -1 );
                        } else {
                            var css = {};
                            css[ pos.toLowerCase() ] = move;
                            img.css(css);
                        }
                    }
                }
            },

            // calculates mouse position after 50ms
            calculate = function(e) {
                if (Utils.timestamp() - ts < 50) {
                    return;
                }
                active = true;
                x = self.getMousePosition(e).x;
                y = self.getMousePosition(e).y;
            },

            // the main loop to check
            loop = function(e) {

                if (!active) {
                    return;
                }

                distX = img.width() - self._stageWidth;
                distY = img.height() - self._stageHeight;
                destX = x / self._stageWidth * distX * -1;
                destY = y / self._stageHeight * distY * -1;
                curX += ( destX - curX ) / self._options.image_pan_smoothness;
                curY += ( destY - curY ) / self._options.image_pan_smoothness;

                position( distY, curY, 'Top' );
                position( distX, curX, 'Left' );

            };

        // we need to use scroll in IE8 to speed things up
        if ( IE == 8 ) {

            img.parent().scrollTop( curY * -1 ).scrollLeft( curX * -1 );
            img.css({
                top: 0,
                left: 0
            });

        }

        // unbind and bind event
        this.$( 'stage' ).unbind( 'mousemove', calculate ).bind( 'mousemove', calculate );

        // loop the loop
        Utils.addTimer('pan', loop, 50, true);

        return this;
    },

    /**
        Brings the scope into any callback

        @param fn The callback to bring the scope into
        @param scope Optional scope to bring

        @example $('#fullscreen').click( this.proxy(function() { this.enterFullscreen(); }) )

        @returns {Function} Return the callback with the gallery scope
    */

    proxy : function( fn, scope ) {
        if ( typeof fn !== 'function' ) {
            return function() {};
        }
        scope = scope || this;
        return function() {
            return fn.apply( scope, Utils.array( arguments ) );
        };
    },

    /**
        Removes the panning effect set by addPan()

        @returns {Galleria}
    */

    removePan: function() {

        if ( IE == 8 ) {
            // todo: doublecheck this
        }
        this.$( 'stage' ).unbind( 'mousemove' );

        Utils.clearTimer('pan');

        this.rescale();

        return this;
    },

    /**
        Adds an element to the Galleria DOM array.
        When you add an element here, you can access it using element ID in many API calls

        @param {String} id The element ID you wish to use. You can add many elements by adding more arguments.

        @example addElement('mybutton');
        @example addElement('mybutton','mylink');

        @returns {Galleria}
    */

    addElement : function( id ) {

        var dom = this._dom;

        $.each( Utils.array(arguments), function( i, blueprint ) {
           dom[ blueprint ] = Utils.create( 'galleria-' + blueprint );
        });

        return this;
    },

    /**
        Attach keyboard events to Galleria

        @param {Object} map The map object of events.
        Possible keys are 'UP', 'DOWN', 'LEFT', 'RIGHT', 'RETURN', 'ESCAPE' and 'BACKSPACE'.

        @example

this.attachKeyboard({
    right: this.next,
    left: this.prev,
    up: function() {
        console.log( 'up key pressed' )
    }
});

        @returns {Galleria}
    */

    attachKeyboard : function( map ) {
        this._keyboard.attach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Detach all keyboard events to Galleria

        @returns {Galleria}
    */

    detachKeyboard : function() {
        this._keyboard.detach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Fast helper for appending galleria elements that you added using addElement()

        @param {String} parentID The parent element ID where the element will be appended
        @param {String} childID the element ID that should be appended

        @example this.addElement('myElement');
        this.appendChild( 'info', 'myElement' );

        @returns {Galleria}
    */

    appendChild : function( parentID, childID ) {
        this.$( parentID ).append( this.get( childID ) || childID );
        return this;
    },

    /**
        Fast helper for appending galleria elements that you added using addElement()

        @param {String} parentID The parent element ID where the element will be preppended
        @param {String} childID the element ID that should be preppended

        @example

this.addElement('myElement');
this.prependChild( 'info', 'myElement' );

        @returns {Galleria}
    */

    prependChild : function( parenID, childID ) {
        this.$( parentID ).prepend( this.get( childID ) || childID );
        return this;
    },

    /**
        Remove an element by blueprint

        @param {String} elemID The element to be removed.
        You can remove multiple elements by adding arguments.

        @returns {Galleria}
    */

    remove : function( elemID ) {
        this.$( Utils.array( arguments ).join(',') ).remove();
        return this;
    },

    // a fast helper for building dom structures
    // leave this out of the API for now

    append : function( data ) {
        for( var i in data) {
            if ( data[i].constructor == Array ) {
                for( var j = 0; data[i][j]; j++ ) {
                    this.appendChild( i, data[i][j] );
                }
            } else {
                this.appendChild( i, data[i] );
            }
        }
        return this;
    },

    // an internal helper for scaling according to options
    _scaleImage : function( image, options ) {

        options = $.extend({
            width:    this._stageWidth,
            height:   this._stageHeight,
            crop:     this._options.image_crop,
            max:      this._options.max_scale_ratio,
            min:      this._options.min_scale_ratio,
            margin:   this._options.image_margin,
            position: this._options.image_position
        }, options );

       ( image || this._controls.getActive() ).scale( options );

        return this;
    },

    /**
        Updates the carousel,
        useful if you resize the gallery and want to re-check if the carousel nav is needed.

        @returns {Galleria}
    */

    updateCarousel : function() {
        this._carousel.update();
        return this;
    },

    /**
        Rescales the gallery

        @param {Number} width The target width
        @param {Number} height The target height
        @param {Function} complete The callback to be called when the scaling is complete

        @returns {Galleria}
    */

    rescale : function( width, height, complete ) {

        var self = this;

        // allow rescale(fn)
        if ( typeof width == 'function' ) {
            complete = width;
            width = undef;
        }

        var scale = function() {

            // shortcut
            var o = self._options;

            // set stagewidth
            self._stageWidth = width || self.$( 'stage' ).width();
            self._stageHeight = height || self.$( 'stage' ).height();

            // scale the active image
            self._scaleImage();

            if ( self._options.carousel ) {
                self.updateCarousel();
            }

            self.trigger( Galleria.RESCALE );

            if ( typeof complete == 'function' ) {
                complete.call( self );
            }
        };

        if ( Galleria.WEBKIT && !width && !height ) {
            Utils.addTimer( 'scale', scale, 5 );// webkit is too fast
        } else {
            scale.call( self );
        }

        return this;
    },

    /**
        Shows an image by index

        @param {Number} index The index to show
        @param {Boolean} rewind A boolean that should be true if you want the transition to go back

        @returns {Galleria}
    */

    show : function( index, rewind, _history ) {
        // do nothing if queue is false and transition is in progress
        if ( !this._options.queue && this._queue.stalled ) {
            return;
        }
        index = Math.max( 0, Math.min( parseInt(index), this.getDataLength() - 1 ) );

        rewind = typeof rewind != 'undefined' ? !!rewind : index < this.getIndex();

        _history = _history || false;

        // do the history thing and return
        if ( !_history && Galleria.History ) {
            Galleria.History.value( index.toString() );
            return;
        }

        this._active = index;

        Array.prototype.push.call( this._queue, {
            index : index,
            rewind : rewind
        });
        if ( !this._queue.stalled ) {
            this._show();
        }

        return this;
    },

    // the internal _show method does the actual showing
    _show : function() {

        // shortcuts
        var self   = this,
            queue  = this._queue[ 0 ],
            data   = this.getData( queue.index ),
            src    = data.image,
            active = this._controls.getActive(),
            next   = this._controls.getNext(),
            cached = next.isCached( src ),
            thumb  = this._thumbnails[ queue.index ];

            // to be fired when loading & transition is complete:
        var complete = function() {

            // remove stalled
            self._queue.stalled = false;

            // optimize quality
            Utils.toggleQuality( next.image, self._options.image_quality );

            // swap
            $( active.container ).css({
                zIndex: 0,
                opacity: 0
            });
            $( next.container ).css({
                zIndex: 1,
                opacity: 1
            });
            self._controls.swap();

            // add pan according to option
            if ( self._options.image_pan ) {
                self.addPan( next.image );
            }

            // make the image link
            if ( data.link ) {
                $( next.image ).css({
                    cursor: 'pointer'
                }).bind( CLICK(), function() {

                    // popup link
                    if ( self._options.popup_links ) {
                        var win = window.open( data.link, '_blank' );
                    } else {
                        window.location.href = data.link;
                    }
                });
            }

            // remove the queued image
            Array.prototype.shift.call( self._queue );

            // if we still have images in the queue, show it
            if ( self._queue.length ) {
                self._show();
            }

            // check if we are playing
            self._playCheck();

            // trigger IMAGE event
            self.trigger({
                type:        Galleria.IMAGE,
                index:       queue.index,
                imageTarget: next.image,
                thumbTarget: thumb.image
            });
        };

        // let the carousel follow
        if ( this._options.carousel && this._options.carousel_follow ) {
            this._carousel.follow( queue.index );
        }

        // preload images
        if ( this._options.preload ) {

            var p,
                n = this.getNext();

            try {
                for ( var i = this._options.preload; i > 0; i-- ) {
                    p = new Galleria.Picture();
                    p.add( self.getData( n ).image );
                    n = self.getNext( n );
                }
            } catch(e) {}
        }

        // show the next image, just in case
        Utils.show( next.container );

        // add active classes
        $( self._thumbnails[ queue.index ].container )
            .addClass( 'active' )
            .siblings( '.active' )
            .removeClass( 'active' );

        // trigger the LOADSTART event
        self.trigger( {
            type: Galleria.LOADSTART,
            cached: cached,
            index: queue.index,
            imageTarget: next.image,
            thumbTarget: thumb.image
        });

        // begin loading the next image
        next.load( src, function( next ) {
            self._scaleImage( next, {

                complete: function( next ) {

                    Utils.show( next.container );

                    // toggle low quality for IE
                    if ( 'image' in active ) {
                        Utils.toggleQuality( active.image, false );
                    }
                    Utils.toggleQuality( next.image, false );

                    // stall the queue
                    self._queue.stalled = true;

                    // remove the image panning, if applied
                    self.removePan();

                    // set the captions and counter
                    self.setInfo( queue.index );
                    self.setCounter( queue.index );

                    // trigger the LOADFINISH event
                    self.trigger({
                        type: Galleria.LOADFINISH,
                        cached: cached,
                        index: queue.index,
                        imageTarget: next.image,
                        thumbTarget: self._thumbnails[ queue.index ].image
                    });

                    var transition = active.image === null && self._options.transition_initial ?
                        self._options.transition_initial : self._options.transition;

                    // validate the transition
                    if ( transition in _transitions === false ) {

                        complete();

                    } else {
                        var params = {
                            prev:   active.image,
                            next:   next.image,
                            rewind: queue.rewind,
                            speed:  self._options.transition_speed || 400
                        };

                        // call the transition function and send some stuff
                        _transitions[ transition ].call(self, params, complete );

                    }
                }
            });
        });
    },

    /**
        Gets the next index

        @param {Number} base Optional starting point

        @returns {Number} the next index, or the first if you are at the first (looping)
    */

    getNext : function( base ) {
        base = typeof base == 'number' ? base : this.getIndex();
        return base == this.getDataLength() - 1 ? 0 : base + 1;
    },

    /**
        Gets the previous index

        @param {Number} base Optional starting point

        @returns {Number} the previous index, or the last if you are at the first (looping)
    */

    getPrev : function( base ) {
        base = typeof base == 'number' ? base : this.getIndex();
        return base === 0 ? this.getDataLength() - 1 : base - 1;
    },

    /**
        Shows the next image in line

        @returns {Galleria}
    */

    next : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getNext(), false );
        }
        return this;
    },

    /**
        Shows the previous image in line

        @returns {Galleria}
    */

    prev : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getPrev(), true );
        }
        return this;
    },

    /**
        Retrieve a DOM element by element ID

        @param {String} elemId The delement ID to fetch

        @returns {HTML Element} The elements DOM node or null if not found.
    */

    get : function( elemId ) {
        return elemId in this._dom ? this._dom[ elemId ] : null;
    },

    /**
        Retrieve a data object

        @param {Number} index The data index to retrieve.
        If no index specified it will take the currently active image

        @returns {Object} The data object
    */

    getData : function( index ) {
        return index in this._data ?
            this._data[ index ] : this._data[ this._active ];
    },

    /**
        Retrieve the number of data items

        @returns {Number} The data length
    */
    getDataLength : function() {
        return this._data.length;
    },

    /**
        Retrieve the currently active index

        @returns {Number} The active index
    */

    getIndex : function() {
        return typeof this._active === 'number' ? this._active : 0;
    },

    /**
        Retrieve the stage height

        @returns {Number} The stage height
    */

    getStageHeight : function() {
        return this._stageHeight;
    },

    /**
        Retrieve the stage width

        @returns {Number} The stage width
    */

    getStageWidth : function() {
        return this._stageWidth;
    },

    /**
        Retrieve the option

        @param {String} key The option key to retrieve. If no key specified it will return all options in an object.

        @returns option or options
    */

    getOptions : function( key ) {
        return typeof key == 'undefined' ? this._options : this._options[ key ];
    },

    /**
        Set options to the instance.
        You can set options using a key & value argument or a single object argument (see examples)

        @param {String} key The option key
        @param {String} value the the options value

        @example setOptions( 'autoplay', true )
        @example setOptions({ autoplay: true });

        @returns {Galleria}
    */

    setOptions : function( key, value ) {
        if ( typeof key == 'object' ) {
            $.extend( this._options, key );
        } else {
            this._options[ key ] = value;
        }
        return this;
    },

    /**
        Starts playing the slideshow

        @param {Number} delay Sets the slideshow interval in milliseconds.
        If you set it once, you can just call play() and get the same interval the next time.

        @returns {Galleria}
    */

    play : function( delay ) {

        this.trigger( Galleria.PLAY );

        this._playing = true;
        this._playtime = delay || this._playtime;

        this._playCheck();

        return this;
    },

    /**
        Stops the slideshow if currently playing

        @returns {Galleria}
    */

    pause : function() {
        this.trigger( Galleria.PAUSE );
        this._playing = false;
        return this;
    },

    _playCheck : function() {
        var self = this,
            played = 0,
            interval = 20,
            now = Utils.timestamp();

        if ( this._playing ) {

            Utils.clearTimer('play');
            var fn = function() {

                played = Utils.timestamp() - now;
                if ( played >= self._playtime && self._playing ) {
                    Utils.clearTimer('play');
                    self.next();
                    return;
                }
                if ( self._playing ) {

                    // trigger the PROGRESS event
                    self.trigger({
                        type:         Galleria.PROGRESS,
                        percent:      Math.ceil( played / self._playtime * 100 ),
                        seconds:      Math.floor( played / 1000 ),
                        milliseconds: played
                    });

                    Utils.addTimer( 'play', fn, interval );
                }
            };
            Utils.addTimer( 'play', fn, interval );
        }
    },

    setIndex: function( val ) {
        this._active = val;
        return this;
    },

    /**
        Manually modify the counter

        @param {Number} index Optional data index to fectch,
        if no index found it assumes the currently active index

        @returns {Galleria}
    */

    setCounter: function( index ) {

        if ( typeof index == 'number' ) {
            index++;
        } else if ( typeof index == 'undefined' ) {
            index = this.getIndex()+1;
        }

        this.get( 'current' ).innerHTML = index;

        if ( IE == 8 ) { // weird IE8 bug

            var opacity = this.$( 'counter' ).css( 'opacity' );
            this.$( 'counter' ).css( 'opacity', opacity );

        }

        return this;
    },

    /**
        Manually set captions

        @param {Number} index Optional data index to fectch and apply as caption,
        if no index found it assumes the currently active index

        @returns {Galleria}
    */

    setInfo : function( index ) {

        var self = this,
            data = this.getData( index );

        $.each( ['title','description','author'], function( i, type ) {

            var elem = self.$( 'info-' + type );

            if ( !!data[type] ) {
                elem[ data[ type ].length ? 'show' : 'hide' ]().html( data[ type ] );
            } else {
               elem.empty().hide();
            }
        });

        return this;
    },

    /**
        Checks if the data contains any captions

        @param {Number} index Optional data index to fectch,
        if no index found it assumes the currently active index.

        @returns {Boolean}
    */

    hasInfo : function( index ) {

        var d = this.getData( index );
        var check = 'title description'.split(' ');
        for ( var i = 0; check[i]; i++ ) {
            if ( !!this.getData( index )[ check[i] ] ) {
                return true;
            }
        }
        return false;

    },

    jQuery : function( str ) {

        var self = this,
            ret = [];

        $.each( str.split(','), function( i, elemId ) {
            elemId = $.trim( elemId );

            if ( self.get( elemId ) ) {
                ret.push( elemId );
            }
        });

        var jQ = $( self.get( ret.shift() ) );

        $.each( ret, function( i, elemId ) {
            jQ = jQ.add( self.get( elemId ) );
        });

        return jQ;

    },

    /**
        Converts element IDs into a jQuery collection
        You can call for multiple IDs separated with commas.

        @param {String} str One or more element IDs (comma-separated)

        @returns {jQuery}

        @example this.$('info,container').hide();
    */

    $ : function() {
        return this.jQuery.apply( this, Utils.array( arguments ) );
    }

};

// End of Galleria prototype

$.extend( Galleria, {

    // Event placeholders
    DATA:             'g_data',
    READY:            'g_ready',
    THUMBNAIL:        'g_thumbnail',
    LOADSTART:        'g_loadstart',
    LOADFINISH:       'g_loadfinish',
    IMAGE:            'g_image',
    THEMELOAD:        'g_themeload',
    PLAY:             'g_play',
    PAUSE:            'g_pause',
    PROGRESS:         'g_progress',
    FULLSCREEN_ENTER: 'g_fullscreen_enter',
    FULLSCREEN_EXIT:  'g_fullscreen_exit',
    IDLE_ENTER:       'g_idle_enter',
    IDLE_EXIT:        'g_idle_exit',
    RESCALE:          'g_rescale',
    LIGHTBOX_OPEN:    'g_lightbox_open',
    LIGHTBOX_CLOSE:   'g_lightbox_close',
    LIGHTBOX_IMAGE:   'g_lightbox_image',

    // Browser helpers
    IE9:     IE == 9,
    IE8:     IE == 8,
    IE7:     IE == 7,
    IE6:     IE == 6,
    IE:      !!IE,
    WEBKIT:  /webkit/.test( NAV ),
    SAFARI:  /safari/.test( NAV ),
    CHROME:  /chrome/.test( NAV ),
    QUIRK:   ( IE && doc.compatMode && doc.compatMode == "BackCompat" ),
    MAC:     /mac/.test( navigator.platform.toLowerCase() ),
    OPERA:   !!window.opera,
    IPHONE:  /iphone/.test( NAV ),
    IPAD:    /ipad/.test( NAV ),
    ANDROID: /android/.test( NAV ),

    // Todo detect touch devices in a better way, possibly using event detection
    TOUCH:   !!( /iphone/.test( NAV ) || /ipad/.test( NAV ) || /android/.test( NAV ) )

});

// Galleria static methods

/**
    Adds a theme that you can use for your Gallery

    @param {Object} theme Object that should contain all your theme settings.
    <ul>
        <li>name – name of the theme</li>
        <li>author - name of the author</li>
        <li>version - version number</li>
        <li>css - css file name (not path)</li>
        <li>defaults - default options to apply, including theme-specific options</li>
        <li>init - the init function</li>
    </ul>

    @returns {Object} theme
*/

Galleria.addTheme = function( theme ) {

    // make sure we have a name
    if ( !!theme['name'] === false ) {
        Galleria.raise('No theme name specified');
    }

    if ( typeof theme.defaults != 'object' ) {
        theme.defaults = {};
    }

    if ( typeof theme.css == 'string' ) {

        var css;

        // look for the absolute path
        $('script').each(function( i, script ) {

            // look for the theme script
            var reg = new RegExp( 'galleria\\.' + theme.name.toLowerCase() + '\\.' );
            if( reg.test( script.src )) {

                // we have a match
                css = script.src.replace(/[^\/]*$/, '') + theme.css;

                Utils.addTimer( "css", function() {
                    Utils.loadCSS( css, 'galleria-theme', function() {
                        Galleria.theme = theme;
                        $doc.trigger( Galleria.THEMELOAD );
                    });
                }, 1);

            }
        });

        if ( !css ) {
            Galleria.raise('No theme CSS loaded');
        }
    }
    return theme;
};

/**
    loadTheme loads a theme js file and attaches a load event to Galleria

    @param {String} src The relative path to the theme source file

    @param {Object} option Optional options you want to apply
*/

Galleria.loadTheme = function( src, options ) {

    var loaded = false,
        length = _galleries.length;

    // first clear the current theme, if exists
    Galleria.theme = undef;

    // load the theme
    Utils.loadScript( src, function() {
        loaded = true;
    } );

    // set a 1 sec timeout, then display a hard error if no theme is loaded
    Utils.wait({
        until: function() {
            return loaded;
        },
        error: function() {
            Galleria.raise( "Theme at " + src + " could not load, check theme path.", true );
        },
        success: function() {

            // check for existing galleries and reload them with the new theme
            if ( length ) {

                // temporary save the new galleries
                var refreshed = [];

                // refresh all instances
                // when adding a new theme to an existing gallery, all options will be resetted but the data will be kept
                // you can apply new options as a second argument
                $.each( Galleria.get(), function(i, instance) {

                    // mix the old data and options into the new instance
                    var op = $.extend( instance._original.options, {
                        data_source: instance._data
                    }, options);

                    // remove the old container
                    instance.$('container').remove();

                    // create a new instance
                    var g = new Galleria();

                    // move the id
                    g._id = instance._id;

                    // initialize the new instance
                    g.init( instance._original.target, op );

                    // push the new instance
                    refreshed.push( g );
                });

                // now overwrite the old holder with the new instances
                _galleries = refreshed;
            }
        },
        timeout: 1000
    });
};

/**
    Retrieves a Galleria instance.

    @param {Number} index Optional index to retrieve.
    If no index is supplied, the method will return all instances in an array.

    @returns {Null or Array}
*/

Galleria.get = function( index ) {
    if ( !!_galleries[ index ] ) {
        return _galleries[ index ];
    } else if ( typeof index !== 'number' ) {
        return _galleries;
    } else {
        Galleria.raise('Gallery index ' + index + ' not found');
    }
};

/**
    Creates a transition to be used in your gallery

    @param {String} name The name of the transition that you will use as an option

    @param {Function} fn The function to be executed in the transition.
    The function contains two arguments, params and complete.
    Use the params Object to integrate the transition, and then call complete when you are done.

*/

Galleria.addTransition = function( name, fn ) {
    _transitions[name] = fn;
};

Galleria.utils = Utils;

/**
    A helper metod for cross-browser logging.
    It uses the console log if available otherwise it falls back to the opera
    debugger and finally <code>alert()</code>

    @example Galleria.log("hello", document.body, [1,2,3]);
*/

Galleria.log = function() {
    try {
        window.console.log.apply( window.console, Utils.array(arguments) );
    } catch( e ) {
        try {
            opera.postError.apply( opera, arguments );
        } catch( er ) {
              alert( Utils.array(arguments).split(', ') );
        }
    }
};

/**
    Method for raising errors

    @param {String} msg The message to throw

    @param {Boolean} fatal Set this to true to override debug settings and display a fatal error
*/

Galleria.raise = function( msg, fatal ) {
    if ( DEBUG || force ) {
        var type = fatal ? 'Fatal error' : 'Error';
        throw new Error( type + ': ' + msg );
    }
};

/**
    Adds preload, cache, scale and crop functionality

    @constructor

    @requires jQuery

    @param {Number} id Optional id to keep track of instances
*/

Galleria.Picture = function( id ) {

    // save the id
    this.id = id || null;

    // the image should be null until loaded
    this.image = null;

    // Create a new container
    this.container = Utils.create('galleria-image');

    // add container styles
    $( this.container ).css({
        overflow: 'hidden',
        position: 'relative' // for IE Standards mode
    });

    // saves the original meassurements
    this.original = {
        width: 0,
        height: 0
    };

    // flag when the image is ready
    this.ready = false;

    // flag when the image is loaded
    this.loaded = false;

};

Galleria.Picture.prototype = {

    // the inherited cache object
    cache: {},

    // creates a new image and adds it to cache when loaded
    add: function( src ) {

        var self = this;

        // create the image
        var image = new Image();

        // force a block display
        $( image ).css( 'display', 'block');

        if ( self.cache[ src ] ) {
            // no need to onload if the image is cached
            image.src = src;
            self.loaded = true;
            self.original = {
                height: image.height,
                width: image.width
            };
            return image;
        }

        // begin preload and insert in cache when done
        image.onload = function() {
            self.original = {
                height: this.height,
                width: this.width
            };
            self.cache[ src ] = src; // will override old cache
            self.loaded = true;
        };

        image.src = src;
        return image;

    },

    // show the image on stage
    show: function() {
        Utils.show( this.image );
    },

    // hide the image
    hide: function() {
        Utils.moveOut( this.image );
    },

    clear: function() {
        this.image = null;
    },

    /**
        Checks if an image is in cache

        @param {String} src The image source path, ex '/path/to/img.jpg'

        @returns {Boolean}
    */

    isCached: function( src ) {
        return !!this.cache[src];
    },

    /**
        Loads an image and call the callback when ready.
        Will also add the image to cache.

        @param {String} src The image source path, ex '/path/to/img.jpg'
        @param {Function} callback The function to be executed when the image is loaded & scaled

        @returns {jQuery} The image container object
    */

    load: function(src, callback) {

        // save the instance
        var self = this;

        $( this.container ).empty(true);

        // add the image to cache and hide it
        this.image = this.add( src );
        Utils.hide( this.image );

        // append the image into the container
        $( this.container ).append( this.image );

        // check for loaded image using a timeout
        Utils.wait({
            until: function() {
                // TODO this should be properly tested in Opera
                return self.loaded && self.image.complete && self.image.width;
            },
            success: function() {
                // call success
                window.setTimeout(function() { callback.call( self, self ); }, 1 );
            },
            error: function() {
                window.setTimeout(function() { callback.call( self, self ); }, 1 );
                Galleria.raise('image not loaded in 10 seconds: '+ src);
            },
            timeout: 10000
        });

        // return the container
        return this.container;
    },

    /**
        Scales and crops the image

        @param {Object} options The method takes an object with a number of options:

        <ul>
            <li>width - width of the container</li>
            <li>height - height of the container</li>
            <li>min - minimum scale ratio</li>
            <li>max - maximum scale ratio</li>
            <li>margin - distance in pixels from the image border to the container</li>
            <li>complete - a callback that fires when scaling is complete</li>
            <li>position - positions the image, works like the css background-image property.</li>
            <li>crop - defines how to crop. Can be true, false, 'width' or 'height'</li>
        </ul>

        @returns {jQuery} The image container object
    */

    scale: function( options ) {

        // extend some defaults
        options = $.extend({
            width: 0,
            height: 0,
            min: undef,
            max: undef,
            margin: 0,
            complete: function() {},
            position: 'center',
            crop: false
        }, options);

        // return the element if no image found
        if (!this.image) {
            return this.container;
        }

        // store locale variables of width & height
        var width,
            height,
            self = this,
            $container = $( self.container );

        // wait for the width/height
        Utils.wait({
            until: function() {

                width  = options.width
                    || $container.width()
                    || Utils.parseValue( $container.css('width') );

                height = options.height
                    || $container.height()
                    || Utils.parseValue( $container.css('height') );

                return width && height;
            },
            success: function() {
                // calculate some cropping
                var newWidth = ( width - options.margin * 2 ) / self.original.width,
                    newHeight = ( height - options.margin * 2 ) / self.original.height,
                    cropMap = {
                        'true'  : Math.max( newWidth, newHeight ),
                        'width' : newWidth,
                        'height': newHeight,
                        'false' : Math.min( newWidth, newHeight )
                    },
                    ratio = cropMap[ options.crop.toString() ];

                // allow max_scale_ratio
                if ( options.max ) {
                    ratio = Math.min( options.max, ratio );
                }

                // allow min_scale_ratio
                if ( options.min ) {
                    ratio = Math.max( options.min, ratio );
                }

                $( self.container ).width( width ).height( height );

                // round up the width / height
                $.each( ['width','height'], function( i, m ) {
                    $( self.image )[ m ]( self[ m ] = Math.ceil( self.original[ m ] * ratio ) );
                });

                // calculate image_position
                var pos = {},
                    mix = {},
                    getPosition = function(value, meassure, margin) {
                        var result = 0;
                        if (/\%/.test(value)) {
                            var flt = parseInt(value) / 100;
                            result = Math.ceil( $( self.image )[ meassure ]() * -1 * flt + margin * flt );
                        } else {
                            result = Utils.parseValue( value );
                        }
                        return result;
                    },
                    positionMap = {
                        'top': { top: 0 },
                        'left': { left: 0 },
                        'right': { left: '100%' },
                        'bottom': { top: '100%' }
                    };

                $.each( options.position.toLowerCase().split(' '), function( i, value ) {
                    if ( value == 'center' ) {
                        value = '50%';
                    }
                    pos[i ? 'top' : 'left'] = value;
                });

                $.each( pos, function( i, value ) {
                    if ( positionMap.hasOwnProperty( value ) ) {
                        $.extend( mix, positionMap[ value ] );
                    }
                });

                pos = pos.top ? $.extend( pos, mix ) : mix;

                pos = $.extend({
                    top: '50%',
                    left: '50%'
                }, pos);

                // apply position
                $( self.image ).css({
                    position : 'relative',
                    top :  getPosition(pos.top, 'height', height),
                    left : getPosition(pos.left, 'width', width)
                });

                // show the image
                self.show();

                // flag ready and call the callback
                self.ready = true;
                options.complete.call( self, self );
            },
            error: function() {
                Galleria.raise('Could not scale image: '+self.image.src);
            },
            timeout: 1000
        });
        return this;
    }
};

// our own easings
$.extend( $.easing, {
    galleria: function (_, t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    galleriaIn: function (_, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  galleriaOut: function (_, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  }
});

// the plugin initializer
$.fn.galleria = function( options ) {

    return this.each(function() {

        var gallery = new Galleria();
        gallery.init( this, options );

    });
};

// expose Galleria
window.Galleria = Galleria;

// phew

})( jQuery );