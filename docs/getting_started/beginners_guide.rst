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

Galleria is built on top of the jQuery JavaScript framework and you **must** include this in order for Galleria to work. A number of large enterprises like Google provide hosted copies of jQuery. 

Add the following inside the ``<head>`` element in your HTML to include the 1.4.4 version of jQuery.

.. code-block:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>

You can also `download <http://docs.jquery.com/Downloading_jQuery>`_ your own copy of jQuery and host it yourself if you wish, but this is not required.

To make sure jQuery works properly add the following code inside the ``<body>`` tag

.. code-block:: html

    <script>
        $("body").text("jQuery works");
    </script>

If you don't see any text after reloading the page: the path to the jQuery file is probably wrong. 

If it does work, you can remove the above snippet and move along.


Installing Galleria
===================

Now that we have a HTML template and jQuery in place, it's time to install Galleria itself! 

1. Download the latest version from the Galleria website.
2. Extract the galleria.zip file and place the "src" directory where you have your HTML files.
3. Add the following code beneath the jQuery script tag we added earlier

.. code-block:: html

    <script src="src/galleria-min.js"></script>
    
To make sure Gallery works properly add the following code inside the ``<body>`` tag

.. code-block:: html

    <script>
        if (Galleria) { $("body").text('Galleria works') }
    </script>

If you don’t see any text after reloading the page: the path to the Galleria file is probably wrong.

If it does work, you can remove the above snippet and move along.


Adding images
=============

Now we need to add a few images for Galleria to display. Add the following markup inside the ``body`` tag

.. code-block:: html

    <div id="gallery">
        <img src="photo1.jpg">
        <img src="photo2.jpg">
        <img src="photo3.jpg">
    </div>


Loading Galleria
================

All we need to do now is load galleria itself. Add the following script right before the closing ``body`` tag

.. code-block:: html

    <script>
        Galleria.loadTheme('src/themes/classic/galleria.classic.js');
        $("#gallery").galleria({
            width: 500,
            height: 500,
        });
    </script>

Reload the page. Ta-da! You should see the very basic version of Galleria up and running


The Complete Code
=================

Here's the complete code for what we've covered so far:

.. code-block:: html

    <!doctype html>
    <html>
        <head>
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
            <script src="src/galleria.js"></script>
        </head>
        <body>
            <div id="gallery">
                <img src="photo1.jpg">
                <img src="photo2.jpg">
                <img src="photo3.jpg">
            </div>
            <script>
                Galleria.loadTheme('src/themes/classic/galleria.classic.js');
                $("#gallery").galleria({
                    width: 500,
                    height: 500,
                });
            </script>
        </body>
    </html>



