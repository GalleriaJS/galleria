.. highlight:: javascript

****************
Using image data
****************

Galleria uses a data model that contains all image data that will be used for the Gallery.
There are several ways of defining this data and this document attempts to explain how the data can be passed into Galleria using different techniques.

The data structure is best defined using a JSON array, since JavaScript plays well with JSON and Galleria uses it internally.
But the beginner will most likely start with plain HTML that Galleria reads and converts to a data structure.

Please note that 1.2.5 introduced a new entity called "layer". This can contain any HTML that will follow the image, also during transitions.
At the time of writing (1.2.5), you can only define a layer using the dataConfig option or JSON.

Read more about the layer and view examples here: http://galleriajs.tumblr.com/post/8091630096/introducing-in-1-2-5-html-layer


Definition
==========

The image data object that Galleria uses is defined like this:

* **thumb** – the thumbnail image (optional)
* **image** – the main image (required)
* **big** – the big image for fullscreen mode (optional)
* **title** – the image title (optional)
* **description** – the image description (optional)
* **link** – the image link url (optional)
* **layer** – A layer of HTML that will be displayed on top of the image (optional)
* **original** a reference to the original IMG element (optional)

You can provide this data to Galleria in a number of ways. The easiest way to start is probably by using plain HTML, but you’ll get more control using JSON.


1. Using HTML
=============

The most common way for a quick start is to let Galleria parse the HTML and extract data itself.

By default, Galleria parses your HTML in a specific way. The minimum HTML required for Galleria to function is this::

    <img src="image.jpg">

You can place the ``<img>`` tags anywhere inside the container from where you call galleria. This will give Galleria the following stripped data structure::

    {
        thumb: 'image.jpg',
        image: 'image.jpg',
        big: 'image.jpg',
        original: [IMG element]
    }

Note that Galleria will use the image.jpg file to create thumbnails and the big image if you do not provide separate files for these views.

Captions & meta data
--------------------

If you want to extract meta data from the HTML source such as title & description, you can provide this as ``<img>`` attributes::

    <img src="image.jpg" title="My image title" alt="My description" longdesc="http://my.destination.com">

Now you’ll get the following data::

    {
        thumb: 'image.jpg',
        image: 'image.jpg',
        big: 'image.jpg',
        title: 'My title',
        description: 'My description',
        link: 'http://my.destination.com',
        original: [IMG element]
    }

Separate thumbnails
-------------------

If you want to provide separate thumbnails (highly recommended), just link the main image using ``<a>`` tags::

    <a href="image.jpg"><img src="thumb.jpg"></a>

Now you’ll get the following data::

    {
        thumb: 'thumb.jpg',
        image: 'image.jpg',
        big: 'image.jpg',
        original: [IMG element]
    }

Separate fullscreen image
-------------------------

You can also specify a separate larger image for fullscreen & lightbox, using the rel attribute of the anchor tag:

    <a href="image.jpg" rel="big.jpg"><img src="thumb.jpg"></a>

Thi will give you::

    {
        thumb: 'thumb.jpg',
        image: 'image.jpg',
        big: 'big.jpg',
        original: [IMG element]
    }


2. Using HTML with dataConfig
=============================

You can also use the dataConfig option combined with HTML to obtain richer data from other sources to provide HTML captions or other custom data types.

An example on how to use the dataConfig option to extract HTML captions from ``<p>`` tags::

    <div id="galleria">
        <img src="myimage.jpg">
        <p>My caption is <strong>gr8</strong></p>
        <img src="myimage2.jpg">
        <p>My other caption is also <em>gr8</em></p>
    </div>
    <script>
    $('#galleria').galleria({
        dataConfig: function(img) {
            return {
                description: $(img).next('p').html()
            }
        }
    });

The dataConfig option function should return an object with any data key/value you wish to provide. If the key existed elsewhere, this will override it.
In the example above, we extracted the HTML from the next paragraph after the image element and told Galleria that this is the description data.

3. Using JSON
=============

Another handy way to serve data is to provide a JSON array to Galleria. This method is preferred by many developers, since you gain more control over what is served to the client, and when.
By serving HTML to the client and then let Galleria parse that HTML into Galleria data might be a performance downer if you don’t provide separate thumbnails, since the client has to download all images at once.

Providing JSON data to Galleria is really easy::

    <div id="galleria"></div>
    <script>
    var data = [
        {
            thumb: 'thumb.jpg',
            image: 'image.jpg',
            big: 'big.jpg',
            title: 'My title',
            description: 'My description',
            link: 'http://my.destination.com',
            layer: '<div><h2>This image is gr8</h2><p>And this text will be on top of the image</p>'
        },
        {
            thumb: 'thumb2.jpg',
            image: 'image2.jpg',
            big: 'big2.jpg',
            title: 'My second title',
            description: 'My second description',
            link: '/product.html',
            layer: '<div><h2>This image is also gr8</h2><p>Good luck with Galleria!</p>'
        }
    ];
    $('#galleria').galleria({
        dataSource: data
    });

Using JSON also makes sense if you want to modify the data using ``push()`` and ``splice()``.
Remember that you can also use ``load()`` to load an entire different data set into a Galleria instance at runtime.
This makes it easy to create links to separate galleries, f.ex photography categories.
