*********
Utilities
*********

Static methods
==============

Static methods are exposed using ``Galleria.fn()``.

.. highlight:: javascript

Galleria.run( selector, options )
--------------------------

    | returns Galleria

This function initializes the gallery. The first argument is the jQuery selector of
element(s) you want to load the gallery to. The second argument (optional) is an object
of configuration options::

    Galleria.run('#galleria');
    Galleria.run('#galleria', {
        imageCrop: true,
        transition: 'fade'
    });


Galleria.configure( options )
--------------------------

    | returns Galleria

This function configures options to the gallery. The options you specify here will be
applied to all instances on the page. If you want to apply options for a specific gallery,
use the ``.setOptions()`` API call, or apply the options when calling ``Galleria.run()``.

You can add multiple options like this::

    Galleria.configure({
        thumbCrop: true,
        lightbox: true
    });

Or single options using key/value::

    Galleria.configure('imageCrop', false);

The options will be applied to the gallery no matter when it’s called. If the gallery
is not yet ready, they will be applied when it is. If the gallery is already running,
the options will be applied at run-time.


Galleria.ready( function )
--------------------------

    | returns Galleria

Use this function to bind bind custom functionality to each gallery instance
when the gallery is loaded. Example::

    Galleria.ready(function() {
        Galleria.log('Gallery ready', this); // the Galleria instance
    });


Galleria.log( msg [,msg,...] )
------------------------------

    | returns Galleria

A helper metod for cross-browser logging. It uses the console log if available
otherwise it falls back to the opera debugger and finally ``alert()``


Galleria.raise( msg )
---------------------

    | returns Galleria

This method will raise an error message if Galleria.debug is true. Useful if
you have sensitive code that needs to throw an error if not completed when
developing.


Galleria.get( [index] )
-----------------------

    | returns instance or array of instances

Use this to fetch a galleria instance from anywhere on your page. If you only
have one galleria gallery, ``Galleria.get(0)`` will return the first (and only)
gallery. If you call ``Galleria.get()`` without specifying an index, it will
return an array with all galleries initiated. Example::

    Galleria.run('#galleria'); // initialize the galleria

    $('#play').click(function() {
        Galleria.get(0).play(); // will start slideshow when the element #play is clicked
    });


.. _loadTheme:

Galleria.loadTheme( url[, options] )
------------------------------------

    | returns Galleria

This methods loads a theme into galleria. It will insert the necessary scripts
and styles into the document and provide a event that will hold the galleria
caller until the theme is fully loaded. The ``url`` must be a relative or
absolute path to the theme .js file. Example::


    // start loading the classic theme
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.js'):

    // initiate the gallery
    Galleria.run('#galleria');

    // when the theme is fully loaded, galleria will run.

The second argument, options, can be used when loading a new theme into an existing gallery. Galleria will then reset the options and then apply any new options you add as a second argument.


Galleria.addTransition( name, function )
----------------------------------------

    | returns null

This method provides an interface for developing your own transition. See the
transitions documentation for more information about that.


