.. _theme API:

======
Theme API
======

Galleria comes with a theme builder API that you can use to create custom themes easily.

The theme is created by adding a theme object to the Galleria namespace and define a init function that contains all theme specific logic.
    
A sample theme
==============

A simple theme can be created using ``Galleria.theme.create()`` like this::

    Galleria.theme.create({
        name: 'my theme',
        author: 'John Doe, http://example.com',
        version: 1,
        css: 'galleria.my_theme.css',
        defaults: {
            transition: 'fade',
            imagecrop: true,
            my_color: 'yellow'
        },
        init: function(options) {
            this.$('container').css('background-color', options.my_color);
            this.bind(Galleria.LOADSTART, function(e) {
                if (!e.cached) {
                    this.$('loader').show();
                }
            });
            this.bind(Galleria.LOADFINISH, function(e) {
                this.$('loader').hide();
            });
            this.show(0);
        }
    });

After the theme is created you can use the theme when calling Galleria. The ``Galleria.theme.create`` function takes one argument – the theme object.

The theme object explained:
---------------------------

- **name** (String) is the name of the theme, f.ex 'classic'
- **author** (String) is the name of the author
- **version** (Number) is the current theme version
- **css** (String) is the CSS file used. The CSS file must be in the same folder as the theme js file
- **defaults** (Object) sets the default and/or custom options for the theme.
- **init** (Function) contains all theme-specific logic. The function takes one argument, options, and the this keyword is the gallery instance. The function gets called after the data is fetched and the gallery is fully prepared to run.

The ``init`` function in your theme has access to a number of helpers, functions and events that you can use to customize your theme logic.

*****

Events
======

You can bind functions to the Galleria events to build custom themes. All callbacks contains an event object as a function argument. The event object is similar to jQuery's event model, except that it adds event.scope that refers to the current gallery scope of each event. Some events will add even further properties to the event object, specified here.

Use ``.bind()`` to listen to the Galleria events. In the callback, the this keyword inside the callback always refers to the same gallery scope. Example::

    this.bind(Galleria.THUMBNAIL, function(e) {
        Galleria.log(this); // the gallery scope
        Galleria.log(e) // the event object
    });

    this.bind(Galleria.LOADSTART, function(e) {
        if ( !e.cached ) {
            Galleria.log(e.target + ' is not cached. Begin preload...');
        }
    });

Galleria.THUMBNAIL
------------------

Triggers when a thumbnail is loaded and displayed in Galleria. Adds the following properties to the event object:

- **thumbTarget** (HTML element) The thumbnail IMG element
- **thumbOrder** (int) the index of the thumbnail, starting at 0

Galleria.LOADSTART
------------------

Triggers every time Galleria begins loading an image. Adds the following properties to the event object:

- **cached** (boolean) is true if the image is cached (no loading required).
- **imageTarget** (HTML element) The ``IMG`` element of the currently displayed image before transition.
- **thumbTarget** (HTML element) The ``IMG`` element of the active thumbnail.

Galleria.LOADFINISH

Triggers every time Galleria has finnished loading an image. Adds the following properties to the event object:

- **cached** (boolean) is true if the image is cached (no loading required).
- **imageTarget** (HTML element) The ``IMG`` element of the now active displayed image after transition.
- **thumbTarget** (HTML element) The ``IMG`` element of the active thumbnail.

*****

Public methods
==============

.bind( type, callback )
-----------------------

    | returns **Galleria**

Binds a callback function to a Galleria event. The callback function contains the event object as the only argument.

Example:
........

::

    this.bind(Galleria.THUMBNAIL, function(e) {
        Galleria.log(e.thumbTarget); // the Image element of the loaded thumbnail
    });

.trigger( type )
-----------------

    | returns **Galleria**

Manually triggers a Galleria event.

.setCSS( cssText )
------------------

    | returns **Galleria**

Creates a global ``<style>`` element, inserts any css text into it and appends it to the ``<head>`` tag. Useful to build themed styles without using an external CSS file.

Example:
........

::

    var cssText = '.galleria-image{width:40px;height:40px}';
    this.setCSS(cssText);

.proxy( fn [, scope ] )
-----------------------

    | returns **Function**

A proxy function that brings the Galleria scope to any callback. Using this proxy, the ``this`` keyword stays as a reference to the current Galleria scope during jQuery callbacks (or any other function).

The second argument specifies another scope (optional).

Example:
........

    this.$('container').click(this.proxy(function(e) {
        Galleria.log(e) // the jQuery event object
        Galleria.log(this) // the Galleria scope (not the target)
    }));

.next()
-------

    | returns **Galleria**

Helper method for showing the next image in line. If you are at the last image, it will show the first image instead.

.prev()
-------

    | returns **Galleria**

Helper method for showing the previous image in line. If you are at the first image, it will show the last image instead.

.play( [interval] )
-------------------

    | returns **Galleria**

Starts the slideshow. interval can be a custom amount of milliseconds to pause between images. If no interval is specified, the default value is 3000 (3 seconds).

Note that if the slideshow is playing, Galleria will force-preload the next image in line regardless of preload settings.

Example:
........

::

    // creates a play link and appends it to the container
    $('<a>').text('play').bind('click', this.proxy(function() {
        this.play(2000);
    })).appendTo(this.get('container'));

.pause()
--------

    | returns **Galleria**

Pauses the slideshow if playing. After pausing, you can resume the slideshow by calling ``.play()`` again (no need to re-state interval)`

.attachKeyboard(map)
returns Galleria

This helper method attaches keyboaard events to Galleria. The map object contains a map of functions to execute when a certain keyCode is pressed

You can use a number of helper keywords to identify common keys. The keywords are up, down, left, right, return, escape and backspace.
Example: attaching some keyboard action to galleria:

this.attachKeyboard({
    left: this.prev, // applies the native prev() function
    right: this.next,
    up: function() {
        // custom up action
        Galleria.log('up pressed');
    },
    13: function() {
        // start playing when return (keyCode 13) is pressed:
        this.play(3000);
    }
})

.detachKeyboard(map)
returns Galleria

Removes the keyboard events attached using .attachKeyboard(). Useful when building lightboxes or overlays.
.show( index, [rewind] )
returns Galleria

Shows an image. The index specifies what image to show, and rewind is a boolean that will be sent to the transition. If rewind is true, some transitions such as sliders will animate "backwards". You can call this.show(0)
.get( elemId )
returns HTML Element

Grabs the element from the Galleria DOM structure.
Example:

var stage = this.get('stage');
// stage is now the div.galleria-stage element

.getData( [ index ] )
returns Object

Grabs the data object for a specific index. If no index specified it returns the currently active data object.
.$( elemIDs )
returns jQuery

Fetches elements from the Galleria DOM structure and returns a jQuery object with all elements, very useful for theme development. You can specify a single element ID or multiple elements in a comma-separated list.

this.$('images,thumbnails').click(function(e) {
    Galleria.log('images or thumbnails clicked');
});

.addElement( elemID )
returns Galleria

Creates a new element into the Galleria DOM and becomes instantly available using .$() or .get()
.appendChild( parentID, childID )
returns Galleria

Appends an element to another in the Galleria DOM structure using element IDs.
Example

// creates a new element with the id 'mystuff':
this.addElement('mystuff');

// appends the element to the container
this.appendChild('container','mystuff');

.toggleQuality( imageElement )
returns Galleria

Toggles the image interpolation mode for IE7+. If mode is bicubic, it sets it to nearest neighbour and vice versa. Bicubic offers a higher quality when scaling images, but slower interactions.

this.bind(Galleria.LOADFINISH, function(e) {
    $(e.imageTarget).click(this.proxy(function(ev) {
        this.toggleQuality( ev.target );
    }));
});

Static methods
Galleria.log( msg )
returns null

A wrapper for logging in a cross-browser manner. Will trigger the console if available, otherwise it finds other options (postError or alert).
Static variables
Galleria.IE7
type boolean

Returns true if IE7 is detected using object detection.
Galleria.IE6
type boolean

Returns true if IE6 is detected using object detection.
Galleria.WEBKIT
type boolean

Returns true if the webkit engine (safari & chrome) is detected using browser sniffing.
Galleria.CHROME
type boolean

Returns true if Chrome is detected using browser sniffing.
Galleria.SAFARI
type boolean

Returns true if Safari is detected using browser sniffing.
Galleria.MAC
type boolean

Returns true if Apple OS is detected using browser sniffing.
Galleria.QUIRK
type boolean

Returns true if IE / Quirks Mode is detected using object detection.
