========
Galleria
========
A JavaScript image gallery for the fastidious.

**Update 28/4 - 2010** - We're currently working on releasing Galleria 1.1, along with some comprehensive documentation. Stay tuned!

Features
========

Creates thumbnails on the fly
-----------------------------
Galleria can create, scale and crop images on the fly, making your gallery layout flexible towards any existing design.

Degrades gracefully
-------------------
Galleria can use almost any exiting markup to fetch gallery data. If the client does not meet the necessary requirements, the gallery will degrade to it's initial state.

Themed galleries
----------------
Galleria uses a convenient Theme API that makes gallery styling and customization a breeze.

Flickr fetcher included
-----------------------------
Use a custom feed from your Flickr account or any other external feed to display images on your web site.

Built for performance
-----------------------------
Galleria is built to perform at it's best regardless of browser environment using clever interpolation methods and jQuery's appraised animations.


Basic Usage
=====
Include jQuery and Galleria on your web page.

Use the Galleria.loadTheme() to load a Galleria theme::

    <script>
        Galleria.loadTheme('/js/galleria/themes/classic/galleria.classic.js');
    </script>
    
You can also load it using the ``src`` attribute::

    <script src="/js/galleria/themes/classic/galleria.classic.js"></script>

Add images
----------
There are several ways of adding image data to your gallery, but the simplets way is probably to add some HTML.

Just put the images inside any container on the site::

    <div id="gallery>
        <img src="/img/pic1.jpg" alt="My description" title="My title">
        <img src="/img/pic2.jpg" alt="Another text" title="Another title">
    </div>

Activate Galleria
-----------------
When DOM is ready, you can run Galleria::

    <script>
        $('#gallery').galleria();
    </script>

The galleria function takes two arguments, *theme* and *options*. If no theme is specified, the last theme loaded is used. The options argument is an object with Galleria options that you can use. See the options documentation for a complete list.

If you run into problems, try passing ``debug: true`` as an option or set ``Galleria.debug = true`` to trace errors. Good luck!