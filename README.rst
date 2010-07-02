========
Galleria
========
A JavaScript image gallery for the fastidious.

For more and working demos visit: http://galleria.aino.se/

Support
=======
Please don't post any support related issues on Github.

If you need help we have a small support community over at: http://getsatisfaction.com/galleria.


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

    <div id="gallery">
        <img src="/img/pic1.jpg" alt="My description" title="My title">
        <img src="/img/pic2.jpg" alt="Another text" title="Another title">
    </div>

If you want separate thumbnails, just add them as a link::

    <div id="gallery">
        <a href="/img/large1.jpg"><img src="/img/thumb1.jpg" alt="My description" title="My title"></a>
        <a href="/img/large2.jpg"><img src="/img/thumb2.jpg" alt="Another text" title="Another title"></a>
    </div>
    
You can also define the images as a JSON array. See the "getting started" doc for more info.
    
Galleria also provides plugins to fetch image data from other sources like Flickr & SlideShowPro.

Activate Galleria
-----------------
When DOM is ready, you can run Galleria::

    <script>
        $('#gallery').galleria();
    </script>

The galleria function takes two arguments, *theme* and *options*. If no theme is specified, the last theme loaded is used. The options argument is an object with Galleria options that you can use. See the options documentation for a complete list.

If you run into problems, try passing ``debug: true`` as an option or set ``Galleria.debug = true`` to trace errors. Good luck!