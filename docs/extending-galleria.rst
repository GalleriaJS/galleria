==================
Extending Galleria
==================

Once you fiddled around with the Galleria options and styles, you might come to a point when you want to do some more advanced customizations. Galleria makes this possible with a bunch of public methods and events that makes customization easy.

There are several ways you can access the methods:

- use the ``extend`` option
- fetch the Galleria instance
- create and/or modify an existing theme 
    
The this keyword
================

In the Galleria extend option and theme init, the **this** keyword represents the Galleria instance per default. In jQuery, the ``this`` keyword often represents a HTML element and this might be confusing at first when mixing them together. You can always assign the ``this`` keyword to a local variable like so::

    var gallery = this;

and then use ``gallery`` as the Galleria instance if you feel confused. In the examples, we always use the ``this`` keyword.

The .proxy method
=================
In javascript closure the ``this`` keyword represents different things depending on the context. Often using jQuery, the ``this`` keyword will represent a HTML element or something else in the callback function. In order to bring the scope to any callback, Galleria comes with a proxy method that makes sure that the ``this`` keyword will stay as a reference to the galleria instance.

Example:
........

::

    $(this.get('stage')).click(function(e) {
        Galleria.log(this) // this is now the stage element
        this.openLightbox(); // will not work anymore
    });
    
Using the proxy method, we can maintain the ``this`` keyword inside the callback::

    $(this.get('stage')).click(this.proxy(function(e) {
        Galleria.log(this) // this is now the galleria instance
        Galleria.log(e.currentTarget) // in jQuery, e.currentTarget is the element that bound the event (same as this)
        this.openLightbox(); // works!
        $(e.currentTarget).addClass('newclass'); // newclass added to stage using jQuery
    });


Using the extend option
=======================

The extend option is a function that gets called when the galleria is loaded, after the theme init. Use this option to extend an existing theme with custom functionality.

Example:
........

::

    $('#images').galleria({
        extend: function(options) {
            Galleria.log(this) // the gallery instance
            Galleria.log(options) // the gallery options
            
            // listen to when an image is shown
            this.bind(Galleria.IMAGE, function(e) {
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

Another option for extending galleria is to fetch the instance from anywhere on your page. You can do that using the static ``Galleria.get( [index] )`` function. If you only have one galleria gallery, ``Galleria.get(0)`` will return the first (and only) gallery. If you call ``.get`` without specifying an index, it will return an array with all galleries initiated.

Example:
........

::

    $('#images').galleria(); // initialize the galleria
    
    var gallery = Galleria.get(0); // gallery is now the first galleria instance
    $('#play').click(function() {
        gallery.play(); // will start slideshow when the element #play is clicked
    });
    
Create your own theme
=====================

If you'd like to create your own re-useable theme, Galleria provides a codex for that too. Using the static function ``Galleria.addTheme( [theme object] )``, you can add custom theme functionality and css to create your own custom theme. A good way to start is to have a look at some of the free themes in the Galleria package and see how it's done.

A simple theme can be created like this:
........................................

- 1. create a directory in your galleria theme directory called 'my_theme'
- 2. create a new css file called galleria.my_theme.css. Save in the folder you just created.
- 3. create a new js file called galleria.my_theme.js ad save in the same directory. Add the following example code:

::

    Galleria.addTheme({
        name: 'my theme',
        author: 'John Doe, http://example.com',
        version: 1,
        css: 'galleria.my_theme.css',
        defaults: {
            // add your own default options here
            transition: 'fade',
            imagecrop: true,
            
            // custom theme-specific options should begin with underscore:
            _my_color: 'yellow'
        },
        init: function(options) {
        
            /*
            The init function get's called when galleria is ready.
            You have access to all public methods and events in here
            this = gallery instance
            options = gallery options (including custom options)
            */
        
            // set the container's background to the theme-specific _my_color option:
            this.$('container').css('background-color', options._my_color);
            
            // bind a loader animation:
            this.bind(Galleria.LOADSTART, function(e) {
                if (!e.cached) {
                    this.$('loader').show();
                }
            });
            this.bind(Galleria.LOADFINISH, function(e) {
                this.$('loader').hide();
            });
        }
    });

- 4. Go back to the galleria.my_theme.css file and add some styles
- 5. Add images and modify the code until you are satisified with the result. Feel free to use any free Galleria theme as a starting point.

After the theme is created you can use the theme when calling Galleria::
    
    Galleria.loadTheme(/path/to/themes/galleria.my_theme.js);
    $('#images').galleria();

The theme object explained:
---------------------------

- **name** (String) is the name of the theme, f.ex 'classic'
- **author** (String) is the name of the author
- **version** (Number) is the current theme version
- **css** (String) is the CSS file used. The CSS file must be in the same folder as the theme js file
- **defaults** (Object) sets the default and/or custom options for the theme.
- **init** (Function) contains all theme-specific logic. The function takes one argument, options, and the this keyword is the gallery instance. The function gets called after the data is fetched and the gallery is fully prepared to run.

The ``init`` function in your theme has access to a number of helpers, functions and events that you can use to customize your theme logic.