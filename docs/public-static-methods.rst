=====================
Public Static methods
=====================

These static methods are exposed everywhere using Galleria.fn()


Galleria.log( msg [,msg,...] )
------------------------------

    | returns null
    
A helper metod for cross-browser logging. It uses the console log if available otherwise it falls back to the opera debugger and finally ``alert()``

Galleria.raise( msg )
------------------------------

    | returns null
    
This method will raise an error message if Galleria.debug is true. Useful if you have sensitive code that needs to throw an error if not completed when developing.


Galleria.get( [index] )
---------------------

    | returns Galleria
    
Use this to fetch a galleria instance from anywhere on your page. If you only have one galleria gallery, ``Galleria.get(0)`` will return the first (and only) gallery. If you call ``Galleria.get()`` without specifying an index, it will return an array with all galleries initiated.

Example:
........

::

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

This methods loads a theme into galleria. It will insert the necessary scripts and styles into the document and provide a event that will hold the galleria caller until the theme is fully loaded. The ``url`` must be a relative or absolute path to the theme .js file.

Example:
........

::
    
    // start loading the classic theme
    Galleria.loadTheme('galleria/themes/classic/galleria.classic.js'):
    
    // initiate the gallery
    $('#images').galleria();
    
    // when the theme is fully loaded, galleria will run.


Galleria.addTransition( name, function )
----------------------------------------

    | returns null

This method provides an interface for developing your own transition. See the transitions documentation for more information about that.