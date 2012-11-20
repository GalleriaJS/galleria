.. highlight:: javascript

*******************
Optimizing Galleria
*******************

One of the goals with Galleria is to simplify the process of creating beautiful image galleries on the web. We did that; setting up a gallery is really easy and most of the times it ”just works” with almost any images. However, there are some things you can do to make the Gallery run even smoother, especially when deploying.

1. Use reasonably sized images
------------------------------

The biggest performance lag comes from using really large images and letting Galleria scale them down for you. This might work OK in your local environment, but it can have great effects for users with less optimized setups. Always scale down your images to a reasonable size and use jpg for compression. A good standard to start with is 600px x 600px using 70 as quality.

If you think the images gets too distorted in fullscreen mode, you can define separate images for fullscreen. Just pass them as 'big' in the data object (using JSON or the dataConfig() option).


2. Use separate thumbnails
--------------------------

Galleria can create thumbnails for you. This is great for setting up a Gallery and trying out different themes without having to manually scale images. But when deploying, you will always get the best result if you scale your images to a size that is close to the display size, either manually or using server-side scripting. This is especially true for thumbnails. If you let Galleria create thumbnails, it will load all full-sized images at once. If you use separate thumbnails, it will load them first and then just load the big image when needed. This can improve the overall user experience.

You can define separate thumbnails by linking a thumbnail to the big image in the HTML source or using a plain JSON object as gallery data. See the Quick Guide for more info and examples.


3. Don’t add too many images at once
------------------------------------

There are no limits to how many images you can add, but after 30 it can clog the pipes on load, especially in IE.
Use a reasonable amount of images at first. If you need a lot of images (100+), use JSON and lazyload the thumbnails.
You can also try the ``.push()`` API method to add more images on the fly.


4. Include your theme in the head
---------------------------------

We generally recommend you to use the ``Galleria.loadTheme`` method to load themes because it’s really convenient and makes it easier to switch themes. However, you might get a snappier result if you include the theme javascript in the head tag, especially if it’s minified together with the rest of your scripts.
You can also add the theme CSS file as a ``<link>`` tag to make it load faster.

Example on how to load the theme in the head instad of using loadTheme::

    <link rel="stylesheet" href="galleria/themes/classic/galleria.classic.css">
    <script src="galleria/themes/classic/galleria.classic.min.js"></script>


5. Use JSON as data
-------------------

This can be a speed-booster, especially for large galleries. Just make sure you serve a reasonable fallback for users without JavaScript turned on.
Read more in the Quick Guide and Galleria Data reference for examples.


6. Lazy load thumbnails
-----------------------

If you are using a lot of images, JSON data and version 1.2.8+ you can optimize your loading order by utilizing a so called "lazy load" techniques for thumbnails.
You do this by simply passing ``thumbnails: 'lazy'`` as an option.
When you do this, thumbnails will not be loaded at once, intead you can control when the thumbnails should be loaded by calling `lazyLoad()` or `lazyLoadChunks()`.
Please see the API for more info about lazy loading thumbnails.
