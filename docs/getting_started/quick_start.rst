.. highlight:: html

.. _quick-start:

***********
Quick start
***********

Installation
============

- Get the latest versions of Galleria and jQuery

- Place the galleria folder and additional themes in your project

- Include jQuery and Galleria on your web page and check the path to your theme


Add data
========

There are several ways of adding image data to your gallery, but the simplest
way is probably to add some HTML. Just put the images inside any container on
the site. You can also add titles and descriptions using data attributed on the IMG tag::

    <div id="galleria">
        <img src="/img/pic1.jpg" data-title="My title" data-description="My description">
        <img src="/img/pic2.jpg" data-title="Another title" data-description="My <em>HTML</em> description">
    </div>

If you want separate thumbnails (recommended), just add them as a link::

    <div id="galleria">
        <a href="/img/large1.jpg"><img src="/img/thumb1.jpg" data-title="My title" data-description="My description"></a>
        <a href="/img/large2.jpg"><img src="/img/thumb2.jpg" data-title="Another title" data-description="My <em>HTML</em> description"></a>
    </div>

You may also add a separate larger image for fullscreen using the data-big attribute::

    <div id="galleria">
        <a href="/img/large1.jpg"><img src="/img/thumb1.jpg" data-big="/img/big1.jpg" data-title="My title" data-description="My description"></a>
        <a href="/img/large2.jpg"><img src="/img/thumb2.jpg" data-big="/img/big2.jpg" data-title="Another title" data-description="My <em>HTML</em> description"></a>
    </div>

Adding video from YouTube, Vimeo or Dailymotion is easy - just link an image to the video page. If you want Galleria to fetch a thumbnail, add an element with the class 'video' instead of a thumbnail::

    <div id="galleria">
        <a href="http://www.youtube.com/watch?v=GCZrz8siv4Q"><img src="/img/thumb1.jpg"></a>
        <a href="http://vimeo.com/12309423"><span class="video">Watch this on Vimeo!</span></a>
    </div>

You can also define the data as a JSON array::

    <script>
    var data = [
        {
            image: 'img1.jpg',
            thumb: 'thumb1.jpg',
            big: 'big1.jpg',
            title: 'my first image',
            description: 'Lorem ipsum caption',
            link: 'http://domain.com'
        },
        {
            video: 'http://www.youtube.com/watch?v=GCZrz8siv4Q',
            title: 'my second image',
            description: 'Another caption'
        }
    ];
    </script>

Then just pass this array as the :doc:`/options/dataSource` option. For a more in-depth explanation on how Galleria handles image data, read :doc:`/references/data`.


Activate Galleria
=================

When the data is added, you need to load a theme and activate Galleria.
Use the Galleria.loadTheme and then the galleria() function on the selected jQuery object::

    <script>
        Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#galleria');
    </script>


Adding options
===============

Use the Galleria.configure function to apply options. You can define an object to apply
multiple options, or two arguments (key/value) to apply a single option.
Please visit :doc:`/options/index` for a complete list.

Example options::

    Galleria.configure({
        imageCrop: true,
        transition: 'fade'
    });

Configuring a single options::

    Galleria.configure('imageCrop', true);


Optimize Galleria
=================

We strongly recommend you to read through :doc:`/references/optimize` to optimize your gallery.


Using the API
=============

Further customizations can be done using the :doc:`/api/methods` and :doc:`/api/events`.
You’ll have access to them using the Galleria.ready function::

    Galleria.ready(function(options) {

        // 'this' is the gallery instance
        // 'options' is the gallery options

        this.bind('image', function(e) {
            Galleria.log('Now viewing ' + e.imageTarget.src);
        });
    });

Another option if you just want to listen to events is using the Galleria.on() function:

    Galleria.on('image', function(e) {
        Galleria.log('Now viewing ' + e.imageTarget.src);
    });

You can also access the methods inside the jQuery.data object of the element you attached the gallery to, f.ex::

    $('#galleria').data('galleria').enterFullscreen();

Read :doc:`/references/extending` for more information about using the API.

*Good luck!*
