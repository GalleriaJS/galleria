****************
Using image data
****************

The image data object that Galleria uses is defined like this:

* **thumb** – the thumbnail image (optional)
* **image** – the main image (required)
* **big** – the big image for fullscreen mode (optional)
* **title** – the image title (optional)
* **description** – the image description (optional)
* **link** – the image link url (optional) 
* **original** a reference to the original IMG element (optional)

You can provide this data to Galleria in a number of ways. The easiest way to start is probably by using plain HTML, but you’ll get more control using JSON. In this reference, we guide you through the different ways of providing data to Galleria.


1. Using HTML
-------------

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

Note that Galleria will use the image.jpg file to create thumbnails and the big image if you do not provide separate files for these views. If you want to extract more data from the HTML source such as title & description, you can provide this as ``<img>`` attributes::

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

If you want to provide separate thumbnails, just link the main image using ``<a>`` tags::

    <a href="image.jpg"><img src="thumb.jpg"></a>

Now you’ll get the following data::

    {
        thumb: 'thumb.jpg',
        image: 'image.jpg',
        big: 'image.jpg',
        original: [IMG element]
    }


2. Using HTML with dataConfig
-----------------------------

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

The dataConfig option function should return an object with any data key/value you wish to provide. If the key existed elsewhere, this will override it. In the example above, we extracted the HTML from the next paragraph after the image element and told Galleria that this is the description data.

3. Using JSON
-------------

Another handy way to serve data is to provide a JSON array to Galleria. This method is preferred by many developers, since you gain more control over what is served to the client, and when. By serving HTML to the client and then let Galleria parse that HTML into Galleria data might be a performance downer if you don’t provide separate thumbnails, since the client has to download all images at once.

Another good reason to use JSON is that you can provide a separate big image for fullscreen mode. Providing JSON data to Galleria is really easy::
    
    <div id="galleria"></div>
    <script>
    var data = [
        {
            thumb: 'thumb.jpg',
            image: 'image.jpg',
            big: 'big.jpg',
            title: 'My title',
            description: 'My description',
            link: 'http://my.destination.com'
        },
        {
            thumb: 'thumb2.jpg',
            image: 'image2.jpg',
            big: 'big2.jpg',
            title: 'My second title',
            description: 'My second description',
            link: '/product.html'
        }
    ];
    $('#galleria').galleria({
        dataSource: data
    });

Using JSON also makes sense if you want to modify the data using ``push()`` and ``splice()``. Remember that you can also use ``load()`` to load an entire different data set into a Galleria instance at runtime. This makes it easy to create links to separate galleries, f.ex photography categories.


Fetching data
-------------

You can fetch the data from the extend method or the theme init using the ``getData()`` method. Read more in the API sections for details.
