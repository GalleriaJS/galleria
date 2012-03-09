.. highlight:: javascript

*************
Picasa Plugin
*************

The Galleria Picasa Plugin is a small but useful plugin to allow your gallery to communicate with the Picasa API using some really simple commands. Galleria optimizes the Picasa data behind the scenes to make the Gallery rendering as good as possible. You can also control some aspects of the data conversion, like image sizes, sorting, captions etc.

How to install the plugin
=========================

Just include it in the head as a script tag, f.ex::

    <script src="plugins/galleria.picasa.min.js"></script>

Examples
========

**Example on how to search picasa for "galleria" and display the first 30 results**

::

    Galleria.run('#galleria', {
        picasa: 'search:galleria'
    });

**Example on how to fetch a picasa useralbum into Galleria and sort using date ascending**

::

    Galleria.run('#galleria', {
        picasa: 'useralbum:galleriajs/Demo', // 'galleriajs' is the username and 'Demo' is the album ID
        picasaOptions: {
            sort: 'date-posted-asc'
        }
    });

When using the picasa plugin as a Galleria option like this, you simply apply a string like "method:argument" to fetch images. The plugin also allows for more advanced usage for tighter integrations.

**Example on how to create a picasa instance and call a method manually**

::

    var picasa = new Galleria.Picasa();
    picasa.search('sweden', function(data) {
        Galleria.run('#galleria', {
            dataSource: data
        });
    });

**Example on how to inject Picasa data into an existing gallery and apply options**

::

    var picasa = new Galleria.Picasa();
    picasa.setOptions({
        max: 20,
        thumbSize: 'medium'
    }).search('milan', function(data) {
        Galleria.get(0).load( data ); // reloads the first galleria instance with the new data
    });


Methods
=======

.search( phrase[, callback] )
-----------------------------

Search Picasa for public photos using a search string.


.user( username[, callback] )
-----------------------------

Fetch a user’s public photos using the username like displayed in the URL (not user ID).


.useralbum( username, albumID, [, callback] )
---------------------------------------------

Get photos from a user album


.setOptions( options )
----------------------

Set picasa options. The options object blends into the defaults.


Options
=======

max
---

    | type: **Number**
    | default: 30

Maximum number of photos to return (maximum value 100)


imageSize
---------

    | type: **String**
    | default: 'medium'

The size to fetch for the main image. The bigger size, the slower downloads and interaction. Use this to match image sizes with your gallery layout.

You can apply any number here, and the plugin will fetch the closest match.
And since Picasa has many different sizes cached, it will most often be a very close match.

You can also define sizes using the same syntax as the Flickr Plugin:

* **small** – square 75x75
* **thumb** – 100 on longest side
* **medium** – 640 on longest side (if available, or it will take the closest match)
* **big** – 1024 on longest side
* **original** – original image, either a jpg, gif or png, depending on source format.


thumbSize
---------

    | type: **String**
    | default: 'thumb'

The size to fetch for the thumbnail image. The bigger size, the slower downloads and interaction. Use this to match thumbnail sizes with your gallery layout. See imageSize for full list of available sizes.


