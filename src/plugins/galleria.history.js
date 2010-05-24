/*!
 * Galleria History Plugin v 1.0
 * http://galleria.aino.se
 *
 * Original Copyright (c) 2009-2010 Rostislav Hristov
 * Modified by Aino (c) 2010
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */
(function($) {
    
    var G = window.Galleria; 
    if (typeof G == 'undefined') {
        return;
    }

    G.History = (function () {

        var _trigger = function(name) {
                $(G.History).trigger(
                    $.extend($.Event(name), 
                        (function() {
                            var parameters = {},
                                parameterNames = G.History.parameterNames();
                            for (var i = 0, l = parameterNames.length; i < l; i++) {
                                parameters[parameterNames[i]] = G.History.parameter(parameterNames[i]);
                            }
                            return {
                                value: G.History.value(),
                                path: G.History.path(),
                                pathNames: G.History.pathNames(),
                                parameterNames: parameterNames,
                                parameters: parameters,
                                queryString: G.History.queryString()
                            };
                        }).call(G.History)
                    )
                );
            },
            _bind = function(value, data, fn) {
                fn = fn || function(){};
                $(G.History).bind(value, data, fn);
                return G.History;
            },
            _hash = function() {
                var index = _l.href.indexOf('#');
                return index != -1 ? _ec(_dc(_crawl(_l.href.substr(index + 1), FALSE))) : '';
            },
            _window = function() {
                try {
                    return top.document !== undefined ? top : window;
                } catch (e) { 
                    return window;
                }
            },
            _js = function() {
                return 'javascript';
            },
            _strict = function(value, force) {
                if (_opts.strict) {
                    value = force ? (value.substr(0, 1) != '/' ? '/' + value : value) : (value == '' ? '/' : value);
                }
                return value;
            },
            _local = function(value, direction) {
                return (_msie && _l.protocol == 'file:') ? 
                    (direction ? _value.replace(/\?/, '%3F') : _value.replace(/%253F/, '?')) : value;
            },
            _crawl = function(value, direction) {
                if (_opts.crawlable && direction) {
                    return (value != '' ? '!' : '') + value;
                }
                return value.replace(/^\!/, '');
            },
            _cssint = function(el, value) {
                return parseInt(el.css(value), 10);
            },
            _search = function(el) {
                var url, s;
                for (var i = 0, l = el.childNodes.length; i < l; i++) {
                    if (el.childNodes[i].src) {
                        url = String(el.childNodes[i].src);
                    }
                    s = _search(el.childNodes[i]);
                    if (s) {
                        url = s;
                    }
                }
                return url;
            },
            _listen = function() {
                if (!_silent) {
                    var hash = _hash(),
                        diff = _value != hash;
                    if (_safari && _version < 523) {
                        if (_length != _h.length) {
                            _length = _h.length;
                            if (typeof _stack[_length - 1] != UNDEFINED) {
                                _value = _stack[_length - 1];
                            }
                            _update(FALSE);
                        }
                    } else if (_msie && _version < 7 && diff) {
                        _l.reload();
                    } else if (diff) {
                        _value = hash;
                        _update(FALSE);
                    }
                }
            },
            _update = function(internal) {
                _trigger(CHANGE);
                _trigger(internal ? INTERNAL_CHANGE : EXTERNAL_CHANGE);
                _st(_track, 10);
            },
            _track = function() {
                var value = (_l.pathname + (/\/$/.test(_l.pathname) ? '' : '/') + 
                    (G.History ? G.History.value() : '')).replace(/\/\//, '/').replace(/^\/$/, ''),
                    fn = _t[_opts.tracker];
                if (typeof fn == FUNCTION) {
                    fn(value);
                } else if (typeof urchinTracker == FUNCTION) {
                    urchinTracker(value);
                } else if (typeof pageTracker != UNDEFINED && typeof pageTracker._trackPageview == FUNCTION) {
                    pageTracker._trackPageview(value);
                } else if (typeof _gaq != UNDEFINED && typeof _gaq.push == FUNCTION) {
                    _gaq.push(['_trackPageview', value]);
                }
            },
            _html = function() {
                var doc = _frame.contentWindow.document;
                doc.open();
                doc.write('<html><head><title>' + _d.title + '</title><script>var ' + ID + ' = "' + _hash() + '";</' + 'script></head></html>');
                doc.close();
            },
            _load = function() {
                if (!_loaded) {
                    _loaded = TRUE;
                    var body = $('body').ajaxComplete(function() {
                        _unescape.call(this);
                    }).trigger('ajaxComplete');
                    if (_opts.wrap) {
                        var wrap = $('body > *')
                            .wrapAll('<div style="padding:' + 
                                (_cssint(body, 'marginTop') + _cssint(body, 'paddingTop')) + 'px ' + 
                                (_cssint(body, 'marginRight') + _cssint(body, 'paddingRight')) + 'px ' + 
                                (_cssint(body, 'marginBottom') + _cssint(body, 'paddingBottom')) + 'px ' + 
                                (_cssint(body, 'marginLeft') + _cssint(body, 'paddingLeft')) + 'px;" />')
                            .parent()
                            .wrap('<div id="' + ID + '" style="height:100%; overflow:auto;' + 
                                (_safari ? (window.statusbar.visible && !/chrome/i.test(_agent) ? '' : ' resize:both;') : '') + '" />');
                        $('html, body')
                            .css({
                                height: '100%',
                                margin: 0,
                                padding: 0,
                                overflow: 'hidden'
                            });
                        if (_safari) {
                            $('<style type="text/css" />')
                                .appendTo('head')
                                .text('#' + ID + '::-webkit-resizer { background-color: #fff; }');
                        }
                    }
                    if (_msie && _version < 8) {
                        var frameset = _d.getElementsByTagName('frameset')[0];
                        _frame = _d.createElement((frameset ? '' : 'i') + 'frame');
                        if (frameset) {
                            frameset.insertAdjacentElement('beforeEnd', _frame);
                            frameset[frameset.cols ? 'cols' : 'rows'] += ',0';
                            _frame.src = _js() + ':' + FALSE;
                            _frame.noResize = TRUE;
                            _frame.frameBorder = _frame.frameSpacing = 0;
                        } else {
                            _frame.src = _js() + ':' + FALSE;
                            _frame.style.display = 'none';
                            _d.body.insertAdjacentElement('afterBegin', _frame);
                        }
                        _st(function() {
                            $(_frame).bind('load', function() {
                                var win = _frame.contentWindow;
                                var src = win.location.href;
                                _value = (typeof win[ID] != UNDEFINED ? win[ID] : '');
                                if (_value != _hash()) {
                                    _update(FALSE);
                                    _l.hash = _local(_crawl(_value, TRUE), TRUE);
                                }
                            });
                            if (typeof _frame.contentWindow[ID] == UNDEFINED) {
                                _html();
                            }
                        }, 50);
                    } else if (_safari) {
                        if (_version < 418) {
                            $(_d.body).append('<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>');
                            _form = _d.getElementById(ID);
                        }
                        if (typeof _l[ID] == UNDEFINED) {
                            _l[ID] = {};
                        }
                        if (typeof _l[ID][_l.pathname] != UNDEFINED) {
                            _stack = _l[ID][_l.pathname].split(',');
                        }
                    }

                    _st(function() {
                        _trigger('init');
                        _update(FALSE);
                    }, 1);
                    
                    if ((_msie && _version > 7) || (!_msie && ('on' + HASH_CHANGE) in _t)) {
                        if (_t.addEventListener) {
                            _t.addEventListener(HASH_CHANGE, _listen, false);
                        } else if (_t.attachEvent) {
                            _t.attachEvent('on' + HASH_CHANGE, _listen);
                        }
                    } else {
                        _si(_listen, 50);
                    }
                    
                    //$('a').filter('[rel*=address:]').address();
                }
            },
            _unload = function() {
                if (_t.removeEventListener) {
                    _t.removeEventListener(HASH_CHANGE, _listen, false);
                } else if (_t.detachEvent) {
                    _t.detachEvent('on' + HASH_CHANGE, _listen);
                }
            },
            _unescape = function() {
                var base = _l.pathname.replace(/\/$/, ''),
                    fragment = '_escaped_fragment_';
                if ($('body').html().indexOf(fragment) != -1) {
                    $('a[href]:not([href^=http])', this).each(function() {
                        var href = $(this).attr('href').replace(new RegExp(base + '/?$'), '');
                        if (href == '' || href.indexOf(fragment) != -1) {
                            $(this).attr('href', '#' + decodeURIComponent(href.replace(new RegExp('/(.*)\\?' + fragment + '=(.*)$'), '!$2')));
                        }
                    });
                }
            },
            ID = 'jQueryAddress',
            FUNCTION = 'function',
            UNDEFINED = 'undefined',
            HASH_CHANGE = 'hashchange',
            INIT = 'init',
            CHANGE = 'change',
            INTERNAL_CHANGE = 'internalChange',
            EXTERNAL_CHANGE = 'externalChange',
            TRUE = true,
            FALSE = false,
            _opts = {
                autoUpdate: TRUE, 
                crawlable: FALSE,
                history: TRUE, 
                strict: TRUE,
                wrap: FALSE
            },
            _browser = $.browser, 
            _version = parseFloat($.browser.version),
            _mozilla = _browser.mozilla,
            _msie = _browser.msie,
            _opera = _browser.opera,
            _safari = _browser.safari,
            _supported = FALSE,
            _t = _window(),
            _d = _t.document,
            _h = _t.history, 
            _l = _t.location,
            _si = setInterval,
            _st = setTimeout, 
            _dc = decodeURI,
            _ec = encodeURI,
            _agent = navigator.userAgent,            
            _frame,
            _form,
            _url = _search(document),
            _qi = _url ? _url.indexOf('?') : -1,
            _title = _d.title, 
            _length = _h.length, 
            _silent = FALSE,
            _loaded = FALSE,
            _justset = TRUE,
            _juststart = TRUE,
            _updating = FALSE,
            _stack = [], 
            _listeners = {}, 
            _value = _hash();
            
        if (_msie) {
            _version = parseFloat(_agent.substr(_agent.indexOf('MSIE') + 4));
            if (_d.documentMode && _d.documentMode != _version) {
                _version = _d.documentMode != 8 ? 7 : 8;
            }
            $(document).bind('propertychange', function() {
                if (_d.title != _title && _d.title.indexOf('#' + _hash()) != -1) {
                    _d.title = _title;
                }
            });
        }
        
        _supported = 
            (_mozilla && _version >= 1) || 
            (_msie && _version >= 6) ||
            (_opera && _version >= 9.5) ||
            (_safari && _version >= 312);
            
        if (_supported) {
        
            for (var i = 1; i < _length; i++) {
                _stack.push('');
            }
            
            _stack.push(_value);
        
            if (_msie && _l.hash != _value) {
                _l.hash = '#' + _local(_crawl(_value, TRUE), TRUE);
            }
            
            if (_opera) {
                history.navigationMode = 'compatible'; 
            }
            
            if (_url && _qi != -1) {
                var param, params = _url.substr(_qi + 1).split('&');
                for (i = 0; i < params.length; i++) {
                    param = params[i].split('=');
                    if (/^(autoUpdate|crawlable|history|strict|wrap)$/.test(param[0])) {
                        _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1], 10) !== 0));
                    }
                    if (/^tracker$/.test(param[0])) {
                        _opts[param[0]] = param[1];
                    }
                }
            }

            if (document.readyState == 'complete') {
                _load();
            }
            $(_load);
            $(window).bind('unload', _unload);
            
        } else if ((!_supported && _hash() != '') || 
            (_safari && _version < 418 && _hash() != '' && _l.search != '')) {
            _d.open();
            _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + 
                encodeURI(_l.href.substr(0, _l.href.indexOf('#'))) + '" /></head></html>');
            _d.close();
        } else {
            _track();
        }

        return {
            bind: function(type, data, fn) {
                return _bind(type, data, fn);
            },
            init: function(fn) {
                return _bind(INIT, fn);
            },
            change: function(fn) {
                return _bind(CHANGE, fn);
            },
            internalChange: function(fn) {
                return _bind(INTERNAL_CHANGE, fn);
            },
            externalChange: function(fn) {
                return _bind(EXTERNAL_CHANGE, fn);
            },
            baseURL: function() {
                var url = _l.href;
                if (url.indexOf('#') != -1) {
                    url = url.substr(0, url.indexOf('#'));
                }
                if (/\/$/.test(url)) {
                    url = url.substr(0, url.length - 1);
                }
                return url;
            },
            autoUpdate: function(value) {
                if (value !== undefined) {
                    _opts.autoUpdate = value;
                    return this;
                }
                return _opts.autoUpdate;
            },
            crawlable: function(value) {
                if (value !== undefined) {
                    _opts.crawlable = value;
                    return this;
                }
                return _opts.crawlable;
            },
            history: function(value) {
                if (value !== undefined) {
                    _opts.history = value;
                    return this;
                }
                return _opts.history;
            },
            strict: function(value) {
                if (value !== undefined) {
                    _opts.strict = value;
                    return this;
                }
                return _opts.strict;
            },
            tracker: function(value) {
                if (value !== undefined) {
                    _opts.tracker = value;
                    return this;
                }
                return _opts.tracker;
            },
            wrap: function(value) {
                if (value !== undefined) {
                    _opts.wrap = value;
                    return this;
                }
                return _opts.wrap;
            },
            update: function() {
                _updating = TRUE;
                this.value(_value);
                _updating = FALSE;
                return this;
            },
            title: function(value) {
                if (value !== undefined) {
                    value = _dc(value);
                    _st(function() {
                        _title = _d.title = value;
                        if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                            _frame.contentWindow.document.title = value;
                            _juststart = FALSE;
                        }
                        if (!_justset && _mozilla) {
                            _l.replace(_l.href.indexOf('#') != -1 ? _l.href : _l.href + '#');
                        }
                        _justset = FALSE;
                    }, 50);
                    return this;
                }
                return _d.title;
            },
            value: function(value) {
                if (value !== undefined) {
                    value = _ec(_dc(_strict(value, TRUE)));
                    if (value == '/') {
                        value = '';
                    }
                    if (_value == value && !_updating) {
                        return;
                    }
                    _justset = TRUE;
                    _value = value;
                    if (_opts.autoUpdate || _updating) {
                        _silent = TRUE;
                        _update(TRUE);
                        _stack[_h.length] = _value;
                        if (_safari) {
                            if (_opts.history) {
                                _l[ID][_l.pathname] = _stack.toString();
                                _length = _h.length + 1;
                                if (_version < 418) {
                                    if (_l.search == '') {
                                        _form.action = '#' + _crawl(_value, TRUE);
                                        _form.submit();
                                    }
                                } else if (_version < 523 || _value == '') {
                                    var evt = _d.createEvent('MouseEvents');
                                    evt.initEvent('click', TRUE, TRUE);
                                    var anchor = _d.createElement('a');
                                    anchor.href = '#' + _crawl(_value, TRUE);
                                    anchor.dispatchEvent(evt);                
                                } else {
                                    _l.hash = '#' + _crawl(_value, TRUE);
                                }
                            } else {
                                _l.replace('#' + _crawl(_value, TRUE));
                            }
                        } else if (_value != _hash()) {
                            if (_opts.history) {
                                _l.hash = '#' + _local(_crawl(_value, TRUE), TRUE);
                            } else {
                                _l.replace('#' + _crawl(_value, TRUE));
                            }
                        }
                        if ((_msie && _version < 8) && _opts.history) {
                            _st(_html, 50);
                        }
                        if (_safari) {
                            _st(function(){ _silent = FALSE; }, 1);
                        } else {
                            _silent = FALSE;
                        }
                    }
                    return this;
                }
                if (!_supported) {
                    return null;
                }
                return _dc(_strict(_local(_value, FALSE), FALSE));
            },
            path: function(value) {
                if (value !== undefined) {
                    var qs = this.queryString(),
                        hash = this.hash();
                    this.value(value + (qs ? '?' + qs : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                return this.value().split('#')[0].split('?')[0];
            },
            queryString: function(value) {
                if (value !== undefined) {
                    var hash = this.hash();
                    this.value(this.path() + (value ? '?' + value : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                var arr = this.value().split('?');
                return arr.slice(1, arr.length).join('?').split('#')[0];
            },
            parameter: function(name, value, append) {
                var i, params;
                if (value !== undefined) {
                    var names = this.parameterNames();
                    params = [];
                    for (i = 0; i < names.length; i++) {
                        var n = names[i],
                            v = this.parameter(n);
                        if (typeof v == 'string') {
                            v = [v];
                        }
                        if (n == name) {
                            v = (value === null || value === '') ? [] : 
                                (append ? v.concat([value]) : [value]);
                        }
                        for (var j = 0; j < v.length; j++) {
                            params.push(n + '=' + v[j]);
                        }
                    }
                    if ($.inArray(name, names) == -1 && value !== null && value !== '') {
                        params.push(name + '=' + value);
                    }
                    this.queryString(params.join('&'));
                    return this;
                }
                value = this.queryString();
                if (value) {
                    params = value.split('&');
                    var r = [];
                    for (i = 0; i < params.length; i++) {
                        var p = params[i].split('=');
                        if (p[0] == name) {
                            r.push(p[1]);
                        }
                    }
                    if (r.length !== 0) {
                        return r.length != 1 ? r : r[0];
                    }
                }
            },
            pathNames: function() {
                var path = this.path(),
                    names = path.replace(/\/{2,9}/g, '/').split('/');
                if (path.substr(0, 1) == '/' || path.length === 0) {
                    names.splice(0, 1);
                }
                if (path.substr(path.length - 1, 1) == '/') {
                    names.splice(names.length - 1, 1);
                }
                return names;
            },
            parameterNames: function() {
                var qs = this.queryString(),
                    names = [];
                if (qs && qs.indexOf('=') != -1) {
                    var params = qs.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var name = params[i].split('=')[0];
                        if ($.inArray(name, names) == -1) {
                            names.push(name);
                        }
                    }
                }
                return names;
            },
            hash: function(value) {
                if (value !== undefined) {
                    this.value(this.value().split('#')[0] + (value ? '#' + value : ''));
                    return this;
                }
                var arr = this.value().split('#');
                return arr.slice(1, arr.length).join('#');
            }            
        };
        
    })();
    
}(jQuery));