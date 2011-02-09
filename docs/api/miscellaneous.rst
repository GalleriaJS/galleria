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
        left: this.showLightbox // will override the previously defined prev()
    });


.detachKeyboard()
-----------------

    | returns **Galleria**

Removes all keyboard events attached using ``.attachKeyboard()``. Useful when
building lightboxes or overlays.
