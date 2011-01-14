***************
Beginners Guide
***************

This tutorial takes you through the very basics of setting up Galleria. If you're an experienced developer check out the :ref:`quick start <quick-start>` tutorial instead.

A basic HTML template
=====================

If you haven't got a HTML template yet, here's a good one to start with:

.. code-block:: html

    <!doctype html>
    <html>
        <head>
        </head>
        <body>
        </body>
    </html>

I'll be saving this file as demo.html but you can give it any name you like.

Installing jQuery
=================

Galleria is built on top of the jQuery JavaScript framework and you **must** include this in order for Galleria to work. 
A number of large enterprises like Google provide hosted copies of jQuery. 

Add the following inside the ``<head>`` element in your HTML to include the 1.4.4 version of jQuery.

.. code-block:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>

You can also `download <http://docs.jquery.com/Downloading_jQuery>`_ your own copy of jQuery and host it yourself if you wish, but this is not required.

To make sure jQuery works properly add the following code inside the ``<body>`` tag

.. code-block:: html

    <script>
        $("body").text("jQuery works");
    </script>

The HTML file should look something like:

.. code-block:: html

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
        </head>
        <body>
            <script>
                $("body").text("jQuery works");
            </script>
        </body>
    </html>


If you don't see any text after reloading the page: the path to the jQuery file is probably wrong. 

If it does work, you can remove the ``<script>`` tag inside the body and move along.


Installing Galleria
===================

Now that we have a HTML template and jQuery in place, it's time to install Galleria itself! 

1. Download the latest version from the Galleria website.
2. Extract the galleria.zip file and place the "galleria" directory where you have your HTML files.
3. Add the following code beneath the jQuery script tag we added earlier

.. code-block:: html

    <script src="galleria/src/galleria-1.2.min.js"></script>
    
To make sure Gallery works properly add the following code inside the ``<body>`` tag

.. code-block:: html

    <script>
        if (Galleria) { $("body").text('Galleria works') }
    </script>


The HTML file should look something like:

.. code-block:: html

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
            <script src="galleria/src/galleria-1.2.min.js"></script>
        </head>
        <body>
            <script>
                if (Galleria) { $("body").text('Galleria works') }
            </script>
        </body>
    </html>

If you don’t see any text after reloading the page: the path to the Galleria file is probably wrong.

If it does work, you can remove ``<script>`` tag inside the body and move along.


Adding images
=============

Now we need to add a few images for Galleria to display. There are several ways of doing so, 
but the simplest one is probably to just add images as HTML.

Add the following markup inside the ``<body>`` tag

.. code-block:: html

    <div id="gallery">
        <img src="photo1.jpg">
        <img src="photo2.jpg">
        <img src="photo3.jpg">
    </div>


Load a theme
============

Galleria requires a theme to function. In this guide, we will use the included classic theme, 
but you can download and try other themes later on.

A theme is included using a javascript function called ``Galleria.loadTheme``. Insert the following code **after the images** in the source code:

.. code-block:: html

    <script>
        Galleria.loadTheme('galleria/src/themes/classic/galleria.classic.js');


Set dimensions and fire up the gallery
======================================

All we need to do now is set dimensions and apply Galleria. 
Add the following script after the loadTheme function we just inserted:

.. code-block:: html

        $("#gallery").galleria({
            width: 500,
            height: 500
        });
    </script>
    
As you can see, we just applied galleria to the '#gallery' container where the images are, and set dimensions to 500x500 pixels. 
You can change the width & height to any dimensions you see fit for your design.
    
Your full HTML file should now look something like:

.. code-block:: html

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
            <script src="galleria/src/galleria-1.2.min.js"></script>
        </head>
        <body>
            <div id="gallery">
                <img src="photo1.jpg">
                <img src="photo2.jpg">
                <img src="photo3.jpg">
            </div>
            <script>
                Galleria.loadTheme('galleria/src/themes/classic/galleria.classic.js');
                $("#gallery").galleria({
                    width: 500,
                    height: 500
                });
            </script>
        </body>
    </html>

Reload the page. Ta-da! You should see the very basic version of Galleria up and running.
