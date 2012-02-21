***********
API Methods
***********

.. highlight:: javascript

Using the API
=============

The Galleria methods are exposed in the instance. You have access to all methods listed here in the :doc:`../options/extend` option or inside the ``Galleria.ready`` function.
Read more about how to use the Galleria instance in :doc:`../references/extending`


Slideshow
=========


.play( interval )
-----------------

    | returns **Galleria**

Starts the automatic slideshow and sets the interval length in milliseconds. If
no interval is given, default (5000 = 5 seconds) is used.


.pause()
--------

    | returns **Galleria**

Stops the slideshow and resets the interval.

.playToggle()
-------------

    | returns **Galleria**

Stops the slideshow if currently playing, otherwise it start the slideshow.


.next()
-------

    | returns **Galleria**

Displays the next image in line, or the first if you are at the last image.


.prev()
-------

    | returns **Galleria**

Displays the previous image in line, or the last if you are at the first image.


.show( index )
--------------

    | returns **Galleria**

Shows the image specified as index. You can call this method anytime and the
image will be placed in a transition queue.


Display
=======

.. _enterFullscreen:

.enterFullscreen( [callback] )
------------------------------

    | returns **Galleria**

This will set the gallery in fullscreen mode. It will temporary manipulate some
document styles and blow up the gallery to cover the browser screen. Note that
it will only fill the browser window, not the client screen (javascript can't
do that).

The callback is called when the fullscreen mode has initialized (it takes
around 40 ms before everything is rescaled)


.exitFullscreen( [callback] )
-----------------------------

    | returns **Galleria**

This will exit fullscreen mode and revert the gallery to it's normal size and
also revert the document styles. The callback is called when the fullscreen
mode is turned off (it takes around 40 ms before everything is rescaled)

.toggleFullscreen( [callback] )
-------------------------------

    | returns **Galleria**

Toggles fullscreen mode.


.openLightbox( [index] )
------------------------

    | returns **Galleria**

This will pop out a lightbox window of the image. You can specify an index if
you want to display a different image than the currently active. The lightbox
window is fairly simple and pre-styled (no CSS or images needed). You can
define some values like the overlay opacity as a galleria option.


.closeLightbox()
---------------

    | returns **Galleria**

This will close the lightbox window.


.addIdleState(elem, styles)
---------------------------

    | returns **Galleria**

This will add an "idle" state of any element. The idle state activates when no
user interaction has been made for x amount of milliseconds. You can modify the
idle timeout using the :doc:`../options/idleTime` option (default is 3000 milliseconds). Styles
is an object of CSS styles you wish to animate the element to when entering
idle state. Example::

    // will fade out the thumbnails when entering idle mode
    this.addIdleState(this.get('thumbnails'), {
        opacity: 0
    });


.removeIdleState(elem)
----------------------

    | returns **Galleria**

Removes an elements idle state set using the ``addIdleState`` method.


.addPan( [image] )
------------------

    | returns **Galleria**

Manually applies a panning effect that revealse cropped areas on mousemove. If
no image specified, it will assume the currently displayed image. You can set
this to automatically add pan on each image using the ``image_pan`` option.


.removePan()
------------

    | returns **Galleria**

Removes all panning effects set by ``addPan()``.


.refreshImage()
---------------

    | returns **Galleria**

Refreshes the image scale & position. Useful if you f.ex. change imageCrop options at run time and need to reposition the image accordingly.


Manipulation
============

.splice( index, howMany[, element1[, ...[, elementN]]] )
--------------------------------------------------------

    | returns **Galleria**

Adds and/or removes images from the gallery. This method works just like the JavaScript ``Array.splice`` method as explained here:

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice

Examples::

    this.splice( 0, 2 ); // removes two images after the first
    this.splice( -2, 2 ); // removes the last two images


.push( element1, ..., elementN )
--------------------------------------------------------

    | returns **Galleria**

Adds and/or removes images from the gallery. This method works just like the JavaScript ``Array.push`` method as explained here:

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push

Examples::

    this.push({ image: 'image1.jpg' }); // adds an image to the gallery


.addElement( elemID )
---------------------

    | returns **Galleria**

Creates a new element into the Galleria DOM and becomes instantly available
using ``.$()`` or ``.get()``


.appendChild( parentID, childID )
---------------------------------

    | returns **Galleria**

Appends an element to another in the Galleria DOM structure using element IDs.
Example::

    // creates a new element with the id 'mystuff':
    this.addElement('mystuff');

    // appends the element to the container
    this.appendChild('container','mystuff');


.prependChild( parentID, childID )
----------------------------------

    | returns **Galleria**

Prepends an element to another in the Galleria DOM structure using element IDs.
Example::

    // creates a new element with the id 'mystuff':
    this.addElement('mystuff');

    // appends the element to the stage
    this.prependChild('stage','mystuff');


.setOptions( key, value )
-------------------------

    | returns **Galleria**

Manipulates the gallery options at run time.

Example::

    this.setOptions( 'transition', 'slide' );

You can also manipulate several options by applying an object. This example demonstrates how to alter the image positions and then
use refreshImage to apply the new options to the active image::

    this.setOptions({
        imagePosition: 'top left',
        imageCrop: true
    }).refreshImage();


.setCounter( [index] )
----------------------

    | returns **Galleria**

Sets the counter to the index or the active image if no index is specified.


.setInfo( [index] )
-------------------

    | returns **Galleria**

Sets the captions to display data taken from the index or the active image if
no index is specified. Example::

    this.bind('thumbnail', function(e) {

        $(e.thumbTarget).hover(this.proxy(function() {

            this.setInfo(e.thumbOrder); // sets the caption to display data from the hovered image
            this.setCounter(e.index); // sets the counter to display the index of the hovered image

        }, this.proxy(function() {

            this.setInfo(); // reset the caption to display the currently active data
            this.setCounter(); // reset the caption to display the currently active data

        }));
    });


Retrieval
=========

.$( elemIDs )
-------------

    | returns **jQuery**

Fetches elements from the Galleria DOM structure and returns a jQuery object
with all elements, very useful for theme development. You can specify a single
element ID or multiple elements in a comma-separated list. Example::

    this.$('stage,thumbnails').click(function(e) {
        Galleria.log('stage or thumbnails clicked');
    });


.get( elemID )
--------------

    | returns **HTML Element**

Fetches a single element from the Galleria DOM structure and returns it. Example::

    console.log( this.get('stage') ); // the HTML element
    console.log( this.$('stage') ); // the same element wrapped in jQuery


.getNext( [base] )
------------------

    | returns **Number**

Helper method for getting the next image index in line. Returns the first if
last has exceeded. ``base`` is the index you want to start from, if not
specified it grabs the active image index.


.getPrev( [base] )
------------------

    | returns **Number**

Helper method for getting the previous image index in line. Returns the last
index if base is zero. ``base`` is the index you want to start from, if not
specified it grabs the active image index.


.getActiveImage()
-----------------

    | returns **IMG Element**

Method for grabbing the currently displayed image.


.getData( [index] )
-------------------

    | returns **Object**

Returns the data object for the image. You can specify index or it will assume
the currently active image.

.getIndex()
-----------

    | returns **Number**

Returns the current index.


.mousePosition( event )
-----------------------

    | returns **Object**

Helper method for getting the right ``x`` and ``y`` values from a mouse event,
relative to the galleria position. ``event`` is a jQuery mouseevent object.


.hasInfo( [index] )
-------------------

    | returns **Boolean**

Helper method for finding out if a gallery image has info (captions). You can
specify index or it will assume the currently active image. Example::

    $(document).bind('mousemove', this.proxy(function(e) {
        var pos = this.mousePosition(e);
        Galleria.log(pos.x, pos.y);
    }));


Miscellaneous
=============

.bind( type, callback )
-----------------------

    | returns **Galleria**

Binds a callback function to a Galleria event. The callback function contains
the event object as the only argument. Example::

    this.bind(Galleria.IMAGE, function(e) {
        Galleria.log(this) // the galleria instance
        Galleria.log(e.imageTarget); // the displayed Image element
    });

    this.bind(Galleria.FULLSCREEN_ENTER, function(e) {
        Galleria.log('Fullscreen mode!');
    });


.unbind( type )
---------------

    | returns **Galleria**

Removes all functions attached to a Galleria event.


.trigger( type )
-----------------

    | returns **Galleria**

Manually triggers a Galleria event.

.attachKeyboard( map )
----------------------

    | returns **Galleria**

This helper method attaches keyboard events to Galleria. The map object
contains a map of functions to execute when a certain keyCode is pressed.

You can use a number of helper keywords to identify common keys. The keywords
are **up**, **down**, **left**, **right**, **return**, **escape** and
**backspace**.

If you call this method again with the same key, you will simply override the
last function. Example attaching some keyboard action to galleria::

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
    });

    this.attachKeyboard({
        left: this.openLightbox // will override the previously defined prev()
    });


.detachKeyboard()
-----------------

    | returns **Galleria**

Removes all keyboard events attached using ``.attachKeyboard()``. Useful when
building lightboxes or overlays.
