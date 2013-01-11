.. highlight:: javascript

************
Using themes
************

Downloading and organizing
==========================

Using a Galleria theme is very easy, and can be done in several ways. We recommend you to put all your themes in one directory called **themes**, close to your galleria source. When downloading / purchasing new themes, just add them to your existing themes directory for easy access. Here is an example of how your structure could look like::

    /index.html
    /galleria
        /galleria.1.2-min.js
        /themes
            /classic
                /galleria.classic.js
                /galleria.classic.css
            /twelve
                /galleria.twelve.js
                /galleria.twelve.css

*Please note that there are no restrictions placed on where and how you organize your files, this is just an example to simplify the documentation.*


Loading a theme
===============

There are two ways of loading a theme in your document:

1. Using ``Galleria.loadTheme``
-------------------------------

This is probably the easiest way to load a theme. The theme path should be relative to the url you are loading the theme from, so assuming the previously defined structure, we would use the following JavaScript command to load the classic theme from the **index.html** file::

    Galleria.loadTheme('galleria/themes/classic/galleria.classic.js');

This command loads all theme specific files and holds the gallery initialization until all files are loaded and ready. So now we just have to fire upp Galleria::

    Galleria.run('#galleria');


2. Loading a theme manually using ``<script>``
----------------------------------------------

.. highlight:: html

Another option for loading the theme is to manually add a script tag that points to the theme, f.ex::

    <script src="galleria/themes/galleria.classic.js"></script>

You can put this script anywhere in your document, before initializing Galleria. To speed things up and gain more control, you can also load the CSS file associated with the theme::

    <link rel="stylesheet" href="galleria/themes/galleria.classic.css">

However, this is not necessary as the script will automatically load the CSS for you.


Switching themes
================

You can switch themes at runtime. First you need to call `unloadTheme` to completely unload the previous theme,
then load the new theme and run Galleria again::

    <script>
        Galleria.loadTheme('themes/classic/galleria.classic.min.js');
        Galleria.run('#galleria');

        $('<a>').click(function(e) {

            e.preventDefault();

            // unload the current theme
            Galleria.unloadTheme();

            // load a new theme
            Galleria.loadTheme('thems/fullscreen/galleria.fullscreen.min.js');

            // run Galleria again with the new theme
            Galleria.run('#galleria');

        }).text('Switch to fullscreen').appendTo('body');
    </script>
