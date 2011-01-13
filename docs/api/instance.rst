





Events
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


Manipulation
============

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


.setCounter( [index] )
----------------------

    | returns **Galleria**

Sets the counter to the index or the active image if no index is specified.


.setInfo( [index] )
-------------------

    | returns **Galleria**

Sets the captions to display data taken from the index or the active image if
no index is specified. Example::

    this.bind(Galleria.THUMBNAIL, function(e) {
        $(e.thumbTarget).hover(this.proxy(function() {
            this.setInfo(e.thumbOrder); // sets the caption to display data from the hovered image
            this.setCounter(e.thumbOrder); // sets the counter to display the index of the hovered image
        }, this.proxy(function() {
            this.setInfo(); // reset the caption to display the currently active data
            this.setCounter(); // reset the caption to display the currently active data
        }));
    });



Miscellaneous
=============

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
        left: this.showLightbox // will override the previously defined prev()
    });


.detachKeyboard()
-----------------

    | returns **Galleria**

Removes all keyboard events attached using ``.attachKeyboard()``. Useful when
building lightboxes or overlays.
