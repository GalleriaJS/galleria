(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define([], factory)
  else if (typeof exports === 'object')
    module.exports = factory()
  else if ( window && window.document )
    root.Galleria = factory()
  else throw 'Environment not found'
}(this, function() {

  var win = this
  var doc = this.document

  // create divs
  var createElement = function( className, nodeName ) {
    nodeName = nodeName || 'div'
    var elem = doc.createElement( nodeName )
    elem.className = className
    return elem
  }

  // add inline css
  var css = function(elem, styles) {
    for( var prop in styles )
      elem.style[prop] = styles[prop]
  }

  // get computed style
  var computedStyle = function (elem, prop, getComputedStyle) {
    getComputedStyle = win.getComputedStyle
    return (
      getComputedStyle ?
        getComputedStyle(elem, null) : elem.currentStyle
    )[
      prop.replace(/-(\w)/gi, function (word, letter) {
        return letter.toUpperCase()
      })
    ]
  }

  var log = {
    warning: function(msg) {

    }
  }

  var Galleria = function(target, options) {

    if ( !(this instanceof Galleria) )
      return new Galleria(target, options)

    this.target = target || document.body
    this.options = options || {}
    this.elems = []

    if( !this.options.data || !this.options.data.length ) {
      log.warning('No data found')
      return
    }

    options.data.forEach(function(data) {
      var elem = createElement('image')
      this.elems.push(elem)
      target.appendChild(elem)
    })

  }

  return Galleria
    
}))
