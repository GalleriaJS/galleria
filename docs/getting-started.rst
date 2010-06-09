.. _getting_started:

===============
Getting started
===============

Requirements
============

* Get the latest and greatest version of Galleria and jQuery
* Place the galleria src folder in your project.

Usage
=====
Include jQuery and Galleria on your web page.

Use the Galleria.loadTheme() to load a Galleria theme::

    <script>
        Galleria.loadTheme('/js/galleria/themes/classic/galleria.classic.js');
    </script>

Add images
----------
There are several ways of adding image data to your gallery, but the simplets way is probably to add some HTML.

Just put the images inside any container on the site::

    <div id="gallery>
        <img src="/img/pic1.jpg" alt="My description" title="My title">
        <img src="/img/pic2.jpg" alt="Another text" title="Another title">
    </div>

If you want separate thumbnails, just add them as a link::

    <div id="gallery>
        <a href="/img/large1.jpg"><img src="/img/thumb1.jpg" alt="My description" title="My title"></a>
        <a href="/img/large2.jpg"><img src="/img/thumb2.jpg" alt="Another text" title="Another title"></a>
    </div>
    
You can also define the images as a JSON array:

    var data = [
        {
            image: 'img1.jpg'
            thumb: 'thumb1.jpg'
            title: 'my first image',
            description: 'Lorem ipsum caption'
            link: 'http://domain.com'
        },
        {
            image: 'img2.jpg'
            thumb: 'thumb2.jpg'
            title: 'my second image',
            description: 'Another caption'
            link: '/path/to/destination.html'
        }
    ];
    
    $('#container').galleria({
        data_source: data
    });
    
Galleria also provides plugins to fetch image data from other sources like Flickr & SlideShowPro.

Activate Galleria
-----------------
When DOM is ready, you can run Galleria::

    <script>
        $('#gallery').galleria();
    </script>

The galleria function takes two arguments, *theme* and *options*. If no theme is specified, the last theme loaded is used. The options argument is an object with Galleria options that you can use. See the options documentation for a complete list.

If you run into problems, try passing ``debug: true`` as an option or set ``Galleria.debug = true`` to trace errors.
        
More examples
-------------
With extra options::

    <script>
        // use theme 'classic' and crop images:
        $('#gallery').galleria('classic', {
            image_crop: true
        });
        // use the last loaded theme and a fading transition:
        $('#gallery').galleria({
            transition: 'fade'
        });
    </script>

Customize
--------- 
The gallery is ready to use. If you wish to add alternative sources of image data or fetch HTML captions, read the Customize gallery data section.