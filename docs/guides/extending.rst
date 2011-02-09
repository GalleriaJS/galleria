.. highlight:: javascript

******************
Extending Galleria
******************

Once you fiddled around with the Galleria options and styles, you might come to
a point when you want to do some more advanced customizations. Galleria makes
this possible with a bunch of public methods and events that makes
customization easy.

There are several ways you can access the methods:

- use the ``extend`` option

- fetch the Galleria instance

- create and/or modify an existing theme


Using the extend option
=======================

The extend option is a function that gets called when the galleria is loaded,
after the theme init. Use this option to extend an existing theme with custom
functionality. Example::

    $('#images').galleria({
    
        extend: function(options) {
        
            Galleria.log(this) // the gallery instance
            Galleria.log(options) // the gallery options

            // listen to when an image is shown
            this.bind('image', function(e) {
            
                Galleria.log(e) // the event object may contain custom objects, in this case the main image
                Galleria.log(e.imageTarget) // the current image

                // lets make galleria open a lightbox when clicking the main image:
                $(e.imageTarget).click(this.proxy(function() {
                   this.openLightbox();
                }));
            });
        }
    });


Fetching the Galleria instance
==============================

Another option for extending galleria is to fetch the instance from anywhere on
your page. You can do that using the static ``Galleria.get( [index] )``
function. If you only have one galleria gallery, ``Galleria.get(0)`` will
return the first (and only) gallery. If you call ``.get`` without specifying an
index, it will return an array with all galleries initiated. Example::

    $('#images').galleria(); // initialize the galleria
    
    var gallery = Galleria.get(0); // gallery is now the first galleria instance
    
    $('#play').click(function() {
        gallery.play(); // will start slideshow when the element #play is clicked
    });


The ``this`` keyword
====================
In the Galleria extend option and theme init, the ``this`` keyword represents
the Galleria instance per default. In jQuery, the ``this`` keyword often
represents a HTML element and this might be confusing at first when mixing them
together. You can always assign the ``this`` keyword to a local variable like
so::

    var gallery = this;

and then use ``gallery`` as the Galleria instance if you feel confused. In the
examples, we always use the ``this`` keyword.


The ``.proxy`` method
=====================
In javascript closure the ``this`` keyword represents different things
depending on the context. Often using jQuery, the ``this`` keyword will
represent a HTML element or something else in the callback function. In order
to bring the scope to any callback, Galleria comes with a proxy method that
makes sure that the ``this`` keyword will stay as a reference to the galleria
instance. Example::

    $(this.get('stage')).click(function(e) {
    
        Galleria.log(this) // this is now the stage element
        this.openLightbox(); // will not work anymore
        
    });


Using the proxy method, we can maintain the ``this`` keyword inside the
callback::

    $(this.get('stage')).click(this.proxy(function(e) {
    
        Galleria.log(this) // this is now the galleria instance
        Galleria.log(e.currentTarget) // in jQuery, e.currentTarget is the element that bound the event (same as this)
        
        this.openLightbox(); // works!
        
        $(e.currentTarget).addClass('newclass'); // newclass added to stage using jQuery
    });

