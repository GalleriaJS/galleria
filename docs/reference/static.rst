**************************
Static methods & variables
**************************

Static methods
==============
Static methods are exposed using ``Galleria.fn()``.


Galleria.log( msg [,msg,...] )
------------------------------

    | returns null

A helper metod for cross-browser logging. It uses the console log if available
otherwise it falls back to the opera debugger and finally ``alert()``


Galleria.raise( msg )
---------------------

    | returns null

This method will raise an error message if Galleria.debug is true. Useful if
you have sensitive code that needs to throw an error if not completed when
developing.


.. _galleria_get:

Galleria.get( [index] )
-----------------------

    | returns Galleria

Use this to fetch a galleria instance from anywhere on your page. If you only
have one galleria gallery, ``Galleria.get(0)`` will return the first (and only)
gallery. If you call ``Galleria.get()`` without specifying an index, it will
return an array with all galleries initiated. Example::

    $('#images').galleria(); // initialize the galleria

    var gallery = Galleria.get(0); // gallery is now the first galleria instance
    $('#play').click(function() {
        gallery.play(); // will start slideshow when the element #play is clicked
    });

    $('#images2').galleria() // initialize another gallery

    var galleries = Galleria.get(); // galleries is now an array of all galleria instances
    $('#fullscreen').click(function() {
        galleries[1].enterFullscreen(); // will enter fullscreen mode for the second gallery
    });



Galleria.loadTheme( url )
-------------------------

    | returns null

This methods loads a theme into galleria. It will insert the necessary scripts
and styles into the document and provide a event that will hold the galleria
caller until the theme is fully loaded. The ``url`` must be a relative or
absolute path to the theme .js file. Example::


    // start loading the classic theme
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.js'):

    // initiate the gallery
    $('#images').galleria();

    // when the theme is fully loaded, galleria will run.


Galleria.addTransition( name, function )
----------------------------------------

    | returns null

This method provides an interface for developing your own transition. See the
transitions documentation for more information about that.


Static variables
================
Static variables are mainly used to detect browsers. Example usage::

    <script>
    if (Galleria.OPERA) {
        Galleria.log('you are using opera!');
    }
    </script>


Galleria.IE
-----------
Detects IE6+ using object detection.


Galleria.IE6
------------
Detects IE6 using object detection.


Galleria.IE7
------------
Detects IE7 using object detection.


Galleria.IE8
------------
Detects IE8 using object detection.


Galleria.WEBKIT
---------------
Detects webkit using browser sniffing.


Galleria.SAFARI
---------------
Detects safari using browser sniffing.


Galleria.CHROME
---------------
Detects chrome using browser sniffing.


Galleria.OPERA
--------------
Detects opera using object detection.


Galleria.MAC
------------
Detects macintosh platform using navigator.platform sniffing.


Galleria.QUIRK
--------------
Detects quirkcs mode using object detection.


Galleria.IPHONE
---------------
Detects iphone using browser sniffing.


Galleria.IPAD
-------------
Detects ipad using browser sniffing.


Galleria.ANDROID
----------------
Detects android using browser sniffing.


Galleria.TOUCH
--------------
Detects touch devices using browser sniffing.

