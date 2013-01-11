.. highlight:: html

***************
Beginners Guide
***************

This tutorial takes you through the very basics of setting up Galleria. If you're an experienced developer check out the :ref:`quick start <quick-start>` tutorial instead.

:ref:`Skip to full code example <complete_code>`

A basic HTML template
=====================

If you don't have an HTML template yet, here's a good one to start with::

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

Add the following inside the ``<head>`` element in your HTML to include the latest minified version of jQuery::

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>

You can also `download <http://docs.jquery.com/Downloading_jQuery>`_ your own copy of jQuery and host it yourself if you wish, but this is not required.

To make sure jQuery works properly add the following code inside the ``<body>`` tag::

    <script>
        $("body").text("jQuery works");
    </script>

The HTML file should look something like::

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
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

Now that we have an HTML template and jQuery in place, it's time to install Galleria itself!

1. Download the latest version from the Galleria website.
2. Extract the galleria.zip file and place the "galleria" directory where you have your HTML files.
3. Add the following code beneath the jQuery script tag we added earlier::

    <script src="galleria/galleria-1.2.9.min.js"></script>

To make sure Galleria works properly add the following code inside the ``<body>`` tag::

    <script>
        if (Galleria) { $("body").text('Galleria works') }
    </script>


The HTML file should look something like::

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
            <script src="galleria/galleria-1.2.9.min.js"></script>
        </head>
        <body>
            <script>
                if (Galleria) { $("body").text('Galleria works') }
            </script>
        </body>
    </html>

If you don’t see any text after reloading the page, the path to the Galleria file is probably wrong.

If it does work, you can remove the ``<script>`` tag inside the body and move along.


Setting dimensions
==================

We need to set some dimensions for the gallery. This can be done in many ways, but the simplest is to add some basic CSS rules.
Add the following markup inside the ``<head>`` tag to apply dimensions and a default black background::

    <style>
        #galleria{ width: 700px; height: 400px; background: #000 }
    </style>

Galleria will then extract these measures and apply to the gallery.


Adding images
=============

Now we need to add a few images for Galleria to display. There are several ways of doing so,
but the simplest one is probably to just add images as HTML.

Add the following markup inside the ``<body>`` tag::

    <div id="galleria">
        <img src="photo1.jpg">
        <img src="photo2.jpg">
        <img src="photo3.jpg">
    </div>


Load a theme
============

Galleria requires a theme to function. In this guide, we will use the included classic theme,
but you can download and try other themes later on.

A theme is included using a javascript function called ``Galleria.loadTheme``. Insert the following code **after the images** in the source code::

    <script>
        Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');


Activate the gallery
====================

All we need to do now is to activate Galleria.
Add the following script after the loadTheme function we just inserted::

        Galleria.run('#galleria');
    </script>

As you can see, we just applied galleria to the '#gallery' container where the images are. That’s it!

.. _complete_code:

The complete code example:
--------------------------

::

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
            <script src="galleria/galleria-1.2.9.min.js"></script>
        </head>
        <body>
            <div id="galleria">
                <img src="photo1.jpg">
                <img src="photo2.jpg">
                <img src="photo3.jpg">
            </div>
            <script>
                Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
                Galleria.run('#galleria');
            </script>
        </body>
    </html>

Reload the page and you should see the very basic version of Galleria up and running.
