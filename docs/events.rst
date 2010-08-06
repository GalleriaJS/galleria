======
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
    
    
List of public events
=====================

Galleria.THUMBNAIL
------------------

Triggers when a thumbnail is loaded and displayed in Galleria. Adds the following properties to the event object:

- **thumbTarget** (HTML element) The thumbnail IMG element
- **thumbOrder** (int) the index of the thumbnail, starting at 0

Galleria.LOADSTART
------------------

Triggers every time Galleria begins loading an image. Adds the following properties to the event object:

- **cached** (boolean) is true if the image is cached (no loading required).
- **imageTarget** (HTML element) The ``IMG`` element of the image about to load.
- **thumbTarget** (HTML element) The ``IMG`` element of the thumbnail that belongs to the imageTarget.
- **index** (Number) The galleria index of the image about to load.

Galleria.LOADFINISH
-------------------

Triggers every time Galleria has finnished loading an image. Adds the following properties to the event object:

- **cached** (boolean) is true if the image is cached (no loading required).
- **imageTarget** (HTML element) The ``IMG`` element of the now loaded image before transition.
- **thumbTarget** (HTML element) The ``IMG`` element of the thumbnail that belongs to the imageTarget.
- **index** (Number) The galleria index of the image loaded.

Galleria.IMAGE
-------------------

Triggers when the gallery image is displayed after loading and transition. Adds the following properties to the event object:

- **imageTarget** (HTML element) The ``IMG`` element of the now active displayed image after transition.
- **thumbTarget** (HTML element) The ``IMG`` element of the active thumbnail.
- **index** (Number) The galleria index of the image loaded.

Galleria.PLAY
-------------------

Triggers when the galleria slideshow starts playing.

Galleria.PAUSE
-------------------

Triggers when the galleria slideshow stops playing.

Galleria.PROGRESS
-------------------

Triggers every x milliseconds during slideshow. You can listen to this if you want to create a progress bar for slideshows. Adds the following properties to the event object:

- **percent** (Number) prints the percent (0-100) of the slideshow progress.
- **seconds** (Number) prints the seconds elapsed since the last image during slideshow.
- **milliseconds** (Number) prints the milliseconds elapsed since the last image during slideshow.

Galleria.FULLSCREEN_ENTER
-------------------

Triggers when the gallery goes into fullscreen mode.

Galleria.FULLSCREEN_EXIT
-------------------

Triggers when the gallery exits the fullscreen mode.

Galleria.IDLE_ENTER
-------------------

Triggers when the gallery goes into idle mode.

Galleria.IDLE_EXIT
-------------------

Triggers when the gallery exists idle mode.

Galleria.RESCALE
-------------------

Triggers every time the rescale() method is used and completed for rescaling the gallery.

Galleria.LIGHTBOX_OPEN
-------------------

Triggers every time the lightbox is opened.

Galleria.LIGHTBOX_CLOSE
-------------------

Triggers every time the lightbox is closed.

Galleria.LIGHTBOX_IMAGE
-------------------

Triggers when the lightbox image is displayed after loading and transition. Adds the following properties to the event object:

- **imageTarget** (HTML element) The ``IMG`` element of the now active displayed image after transition.
