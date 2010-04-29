.. _themes:

======
Themes
======

Galleria comes with a theme builder API that you can use to create custom themes easily.

The theme is created by adding a theme object to the Galleria namespace and define a init function that contains all theme specific logic.
    
A sample theme
==============

A simple theme can be created like this::

    Galleria.theme.create({
        name: 'my theme',
        version: 1,
        author: 'John Doe, http://example.com',
        defaults: {
            transition: 'fade',
            imagecrop: true,
            my_color: 'yellow'
        },
        init: function(options) {
            var css = '.galleria-container{height:500px}' +
                      '.galleria-stage{height:450px}' + 
                      '.galleria-thumbnails .galleria-image{width:50px;height:50px;float:left;cursor:pointer;}';
    
            this.setCSS(css);
            this.$('container').css('background-color', options.my_color);
            this.showFirst();
            this.bind(Galleria.READY, function() {
                Galleria.log('Galleria is ready');
            });
        }
    });

After the theme is created you can use the theme when calling Galleria.

You can override any default options for each instance::

    $('#galleria').galleria('my theme', {
        my_color: 'red'
    });

The init function in your theme has access to a number of helpers, functions and events that you can use to customize your theme logic.

Events
======

You can bind functions to the Galleria events to build custom themes. All callbacks contains an event object as a function argument. The event object is similar to jQuery's event model, except that it adds event.scope that refers to the current gallery scope of each event. 
Some events will add even further properties to the event object, specified here.

Use .bind() to listen to the Galleria events. In the callback, the this keyword inside the callback always refers to the same gallery scope::

    this.bind(Galleria.THUMBNAIL, function(e) {
    Galleria.log(this); // the gallery scope
    Galleria.log(e) // the event object
    });
    
    this.bind(Galleria.LOADSTART, function(e) {
    if ( !e.cached ) {
        Galleria.log(e.target + ' is not cached. Begin preload...');
    }
    });

Galleria.DATA
^^^^^^^^^^^^^
Triggers when Galleria has collected all data from the source and the data object is ready to use.

Galleria.READY
^^^^^^^^^^^^^^^
Triggers when Galleria has completed it's constructor and inserted the necessary DOM elements.

Galleria.THUMBNAIL
^^^^^^^^^^^^^^^^^^
Triggers when a thumbnail is loaded and displayed in Galleria. Adds the following properties to the event object:

* **thumbTarget:** (HTML element) The thumbnail IMG element
* **thumbOrder:** (int) the index of the thumbnail, starting at 0

Galleria.LOADSTART
^^^^^^^^^^^^^^^^^^
Triggers every time Galleria begins loading an image. Adds the following properties to the event object:

* **cached:** (boolean) is true if the image is cached (no loading required).
* **imageTarget:** (HTML element) The IMG element of the currently displayed image *before* transition.
* **thumbTarget:** (HTML element) The IMG element of the active thumbnail.

Galleria.LOADFINISH
^^^^^^^^^^^^^^^^^^^^

Triggers every time Galleria has finished loading an image. Adds the following properties to the event object:

* **cached:** (boolean) is true if the image is cached (no loading required).
* **imageTarget:** (HTML element) The IMG element of the now active displayed image after transition.
* **thumbTarget:** (HTML element) The IMG element of the active thumbnail.


Public methods
==============

You can use all of these methods inside the theme init using this.fn()

.setCSS( cssText )
^^^^^^^^^^^^^^^^^^

returns Galleria

Creates a global <style> element, inserts any css text into it and appends it to the <head> tag. Useful to build themed styles without using an external CSS file::

    var cssText = '.galleria-image{width:40px;height:40px}';
    this.setCSS(cssText);

.proxy( fn [, scope ] )
^^^^^^^^^^^^^^^^^^^^^^^

returns Function

A proxy function that brings the Galleria scope to any callback. Using this proxy, the 'this' keyword stays as a reference to the current Galleria scope during jQuery callbacks (or any other function).

The second argument specifies another scope (optional)::

    this.$('container').click(this.proxy(function(e) {
        Galleria.log(e) // the jQuery event object
        Galleria.log(this) // the Galleria scope (not the target)
    }));

.showFirst( [ fn ] )
^^^^^^^^^^^^^^^^^^^^
returns Galleria

Helper method for setting Galleria to show the first image whenever it's available.

fn is an optional callback function that will trigger when the first image is loaded and displayed.

.next()
^^^^^^^
returns Galleria
^
Helper method for showing the next image in line. If you are at the last image, it will show the first image instead.

.prev()
^^^^^^^

returns Galleria

Helper method for showing the previous image in line. If you are at the first image, it will show the last image instead.

.get( elemId )
^^^^^^^^^^^^^^
returns HTML Element

Grabs the element from the Galleria DOM structure::

    var stage = this.get('stage');

.getData( [ index ] )
^^^^^^^^^^^^^^^^^^^^^

returns Object

Grabs the data object for a specific index. If no index specified it returns the currently active data object.

.$( elemIDs )
^^^^^^^^^^^^^^

returns jQuery
Fetches elements from the <a href="#">Galleria DOM structure</a> and returns a jQuery object with all elements, very useful for theme development. You can specify a single element ID or multiple elements in a comma-separated list::

    this.$('images,thumbnails').click(function(e) {
        Galleria.log('images or thumbnails clicked');
    });

.addElement( elemID )
^^^^^^^^^^^^^^^^^^^^^

returns Galleria

Creates a new element into the Galleria DOM and becomes instantly available using .$() or .get()

.appendChild( parentID, childID )
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
returns Galleria

Appends an element to another in the Galleria DOM structure using element IDs::

    // creates a new element with the id 'mystuff':
    this.addElement('mystuff');
    
    // appends the element to the container
    this.appendChild('container','mystuff');

.toggleQuality( imageElement )
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
returns Galleria

Toggles the image interpolation mode for IE7+. If mode is bicubic, it sets it to nearest neighbor and vice versa. Bicubic offers a higher quality when scaling images, but slower interactions::

    this.bind(Galleria.LOADFINISH, function(e) {
        $(e.imageTarget).click(this.proxy(function(ev) {
            this.toggleQuality( ev.target );
        }));
    });

Static methods
==============

Galleria.log( msg )
^^^^^^^^^^^^^^^^^^^
returns null

A wrapper for logging in a cross-browser manner. Will trigger the console if available, otherwise it finds other options (postError or alert).</p>

Static variables
================

Galleria.IE7
^^^^^^^^^^^^
type boolean

Returns true if IE7 is detected using object detection.

Galleria.IE6
^^^^^^^^^^^^
type boolean
 
Returns true if IE6 is detected using object detection.

Galleria.WEBKIT
^^^^^^^^^^^^^^
type boolean

Returns true if the webkit engine (safari &amp; chrome) is detected using browser sniff.

Galleria.QUIRK
^^^^^^^^^^^^^^
type boolean

Returns true if IE / Quirks Mode is detected using object detection.


