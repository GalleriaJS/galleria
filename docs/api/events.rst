******
Events
******

You can bind functions to the Galleria events to build custom themes. All
callbacks contains an event object as a function argument. The event object is
similar to jQuery's event model, except that it adds event.scope that refers to
the current gallery scope of each event. Some events will add even further
properties to the event object, specified here.

.. highlight:: javascript

Use ``.bind()`` to listen to the Galleria events. In the callback, the this
keyword inside the callback always refers to the same gallery scope. Example::

    this.bind("thumbnail", function(e) {
        Galleria.log(this); // the gallery scope
        Galleria.log(e) // the event object
    });

    this.bind("loadstart", function(e) {
        if ( !e.cached ) {
            Galleria.log(e.target + ' is not cached. Begin preload...');
        }
    });

=======================
List of Galleria events
=======================


thumbnail
=========
Triggers when a thumbnail is loaded and displayed in Galleria.

Event properties:
-----------------

- **thumbTarget** (HTML element) The thumbnail IMG element

- **index** (int) the index of the thumbnail, starting at 0


loadstart
=========
Triggers every time Galleria begins loading an image.

Event properties:
-----------------

- **cached** (boolean) is true if the image is cached (no loading required).

- **imageTarget** (HTML element) The ``IMG`` element of the image about to load.

- **thumbTarget** (HTML element) The ``IMG`` element of the thumbnail that
  belongs to the imageTarget.

- **index** (Number) The galleria index of the image about to load.


loadfinish
==========
Triggers every time Galleria has finished loading an image.

Event properties:
-----------------

- **cached** (boolean) is true if the image is cached (no loading required).

- **imageTarget** (HTML element) The ``IMG`` element of the now loaded image
  before transition.

- **thumbTarget** (HTML element) The ``IMG`` element of the thumbnail that
  belongs to the imageTarget.

- **index** (Number) The galleria index of the image loaded.


image
=====
Triggers when the gallery image is displayed after loading and transition.

Event properties:
-----------------

- **imageTarget** (HTML element) The ``IMG`` element of the now active
  displayed image after transition.

- **thumbTarget** (HTML element) The ``IMG`` element of the active thumbnail.

- **index** (Number) The galleria index of the image loaded.


play
====
Triggers when the galleria slideshow starts playing.


pause
=====
Triggers when the galleria slideshow stops playing.


progress
========
Triggers every x milliseconds during slideshow. You can listen to this if you
want to create a progress bar for slideshows.

Event properties:
-----------------

- **percent** (Number) prints the percent (0-100) of the slideshow progress.

- **seconds** (Number) prints the seconds elapsed since the last image during
  slideshow.

- **milliseconds** (Number) prints the milliseconds elapsed since the last
  image during slideshow.


fullscreen_enter
================
Triggers when the gallery goes into fullscreen mode.


fullscreen_exit
===============
Triggers when the gallery exits the fullscreen mode.


idle_enter
==========
Triggers when the gallery goes into idle mode.


idle_exit
=========
Triggers when the gallery exists idle mode.


rescale
=======
Triggers every time the rescale() method is used and completed for rescaling
the gallery.


lightbox_open
=============
Triggers every time the lightbox is opened.


lightbox_close
==============
Triggers every time the lightbox is closed.


lightbox_image
==============
Triggers when the lightbox image is displayed after loading and transition.

Event properties:
-----------------

- **imageTarget** (HTML element) The ``IMG`` element of the now active
  displayed image after transition.

