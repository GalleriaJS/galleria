.. highlight:: html

.. _quick-start:

***********
Quick start
***********

Installation
============

- Get the latest and greatest version of Galleria and jQuery

- Place the galleria folder in your project.


Usage
=====
Include jQuery and Galleria on your web page.

Use the static method ``Galleria.loadTheme()`` to load a Galleria theme::

    <script>
        Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    </script>

You can also load the theme manually in your ``<head>`` tag::

    <script src="galleria/themes/classic/galleria.classic.min.js"></script>

If you are looking for more info on how to install and load themes, check out :doc:`../themes/using_themes`.

Add images
==========

There are several ways of adding image data to your gallery, but the simplets
way is probably to add some HTML. Just put the images inside any container on
the site::

    <div id="gallery">
        <img src="/img/pic1.jpg" alt="My description" title="My title">
        <img src="/img/pic2.jpg" alt="Another text" title="Another title">
    </div>

If you want separate thumbnails (recommended), just add them as a link::

    <div id="gallery">
        <a href="/img/large1.jpg"><img src="/img/thumb1.jpg" alt="My description" title="My title"></a>
        <a href="/img/large2.jpg"><img src="/img/thumb2.jpg" alt="Another text" title="Another title"></a>
    </div>

You can also define the images as a JSON array::

    <script>
    var data = [
        {
            image: 'img1.jpg',
            thumb: 'thumb1.jpg',
            title: 'my first image',
            description: 'Lorem ipsum caption',
            link: 'http://domain.com'
        },
        {
            image: 'img2.jpg',
            thumb: 'thumb2.jpg',
            title: 'my second image',
            description: 'Another caption',
            link: '/path/to/destination.html'
        }
    ];

    $('#container').galleria({
        data_source: data
    });
    </script>

Galleria also provides plugins to fetch image data from other sources like
Flickr.


Activate Galleria
=================

When DOM is ready, you can run Galleria. The best way to do this is to put the
following code before closing the body tag::

    <script>
        $('#gallery').galleria({
            width:500,
            height:500
        });
    </script>

The galleria function takes one arguments, *options*. The options argument is
an object with Galleria options that you can use, please view the options
documentation for a complete list.

Note that Galleria requires a height to function. If you don’t pass width/height as options,
Galleria will try to detect dimensions automatically. However, if it fails to detect dimensions
Galleria will throw a fatal error.

If you run into problems, try passing ``debug: true`` as an option or set
``Galleria.debug = true`` to trace errors.


More examples
=============

With extra options::

    <script>
        // crop images:
        $('#gallery').galleria({
            image_crop: true
        });
        // use a fading transition:
        $('#gallery').galleria({
            transition: 'fade'
        });
    </script>


Customize
=========

If you would like to add more advanced customizations, read :doc:`/references/extending`. *Good luck!*

