.. highlight:: javascript

******************
Extending Galleria
******************

Once you fiddled around with the Galleria options and styles, you might come to
a point when you want to do some more advanced customizations. Galleria makes
this possible with a bunch of public methods and events that makes
customization easy.

There are several ways you can access the methods:

- use the Galleria.ready function

- fetch the Galleria instance

- use the ``extend`` option

- create and/or modify an existing theme


Using Galleria.ready
====================

The easiest way to add global customizations to all your galleries on the page is to use the Galleria.ready function.
The way it works is that you bind methods to Galleria and when each gallery is ready, it runs those methods in the same order they where added.

Example on how to print out the current image index::

    // bind the method to Galleria.ready
    Galleria.ready(function(options) {

        // this = the gallery instance
        // options = the gallery options

        this.bind('image', function(e) {
            Galleria.log(e.index) // the image index
        });
    });

    // now call galleria on all containers with the className 'galleria'
    // the method above will be called on all galleries when initialized
    Galleria.run('.galleria');


Fetching the Galleria instance
==============================

Another option for extending galleria is to fetch the instance from anywhere on
your page. Note that in order for this method to function properly, the gallery must be initialized completely.
So this mostly makes sense in a click event or some other trigger that runs later in the timeline.

Use **Galleria.ready** if you are uncertain whether the gallery is initialized or not.

The simplest way is to use the jQuery.data() method on the jQuery object since Galleria saves it’s instance inside it::

    Galleria.run('#galleria'); // initialize the galleria

    // do something when someone clicks an element with the ID 'mylink'
    $('#play').click(function() {

        $('#galleria').data('galleria').play(); // will start slideshow attached to #image when the element #play is clicked

    });

You can also use the static ``Galleria.get( [index] )``
function. If you only have one galleria gallery, ``Galleria.get(0)`` will
return the first (and only) gallery. If you call ``.get`` without specifying an
index, it will return an array with all galleries initiated.

Example::

    Galleria.run('#galleria'); // initialize the galleria

    // do something when someone clicks an element with the ID 'mylink'
    $('#play').click(function() {

        var gallery = Galleria.get(0); // gallery is now the first galleria instance
        gallery.play(); // will start slideshow when the element #play is clicked

    });


Using the extend option
=======================

Yet another way of accessing the instance, the extend option is a function that gets called when the galleria is loaded,
after the theme init. Use this option to extend an existing theme with custom
functionality. Example::

    Galleria.run('#galleria', {

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


The ``this`` keyword
====================
In the Galleria.ready callback and the extend option and theme init, the ``this`` keyword represents
the Galleria instance per default. In jQuery, the ``this`` keyword often
represents a HTML element and this might be confusing at first when mixing them
together. You can always assign the ``this`` keyword to a local variable like
so::

    var gallery = this;

and then use ``gallery`` as the Galleria instance if you feel confused. In the
examples, we always use the ``this`` keyword.

