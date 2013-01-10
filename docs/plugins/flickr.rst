.. highlight:: javascript

*************
Flickr Plugin
*************

The Galleria Flickr Plugin is a small but useful plugin to allow your gallery to communicate with the Flickr API using some really simple commands. Galleria optimizes the Flickr data behind the scenes to make the Gallery rendering as good as possible. You can also control some aspects of the data conversion, like image sizes, sorting, captions etc.

How to install the plugin
=========================

Just include it in the head as a script tag, f.ex::

    <script src="plugins/flickr/galleria.flickr.min.js"></script>

Examples
========

**Example on how to search flickr for "galleria" and display the first 30 results**

::
    
    Galleria.run('#galleria', {
        flickr: 'search:galleria'
    });

**Example on how to fetch a flickr photoset into Galleria and sort using date ascending**

::

    Galleria.run('#galleria', {
        flickr: 'set:308783',
        flickrOptions: {
            sort: 'date-posted-asc'
        }
    });

When using the flickr plugin as a Galleria option like this, you simply apply a string like "method:argument" to fetch images. The plugin also allows for more advanced usage for tighter integrations.

**Example on how to create a flickr instance and call a method manually**

::

    var flickr = new Galleria.Flickr();
    flickr.search('sweden', function(data) {
        Galleria.run('#galleria', {
            dataSource: data
        });
    });

**Example on how to inject Flickr data into an existing gallery and apply options**

::

    var flickr = new Galleria.Flickr();
    flickr.setOptions({
        max: 20,
        thumbSize: 'medium'
    }).search('milan', function(data) {
        Galleria.get(0).load( data ); // reloads the first galleria instance with the new data
    });


Methods
=======

.search( phrase[, callback] )
-----------------------------

Search Flickr for public photos using a search string.


.tags( phrase[, callback] )
---------------------------

Search Flickr for public photos using tags.


.user( username[, callback] )
-----------------------------

Fetch a user’s public photos using the username like displayed in the URL (not user ID).


.set( photoset_id[, callback] )
-------------------------------

Get photos from a photoset by ID.
Note that the 'sort' option is not available in this API call, see more here: http://www.flickr.com/services/api/flickr.photosets.getPhotos.html


.gallery( gallery_id[, callback] )
----------------------------------

Get photos from a gallery by ID


.groupsearch( group[, callback] )
---------------------------------

Search groups and fetch photos from the first group found
Useful if you know the exact name of a group and want to show the groups photos.


.group( group_id[, callback] )
-------------------------------

Get photos from a group by ID


.setOptions( options )
----------------------

Set flickr options. The options object blends into the defaults.


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

Available image sizes:

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


sort
----

    | type: **String**
    | default: 'interestingness-desc'

Sets in what order the photos will be shown. Available options:

* date-posted-asc
* date-posted-desc
* date-taken-asc
* date-taken-desc
* interestingness-desc
* interestingness-asc
* relevance


description
-----------

    | type: **Boolean**
    | default: false

The plugin fetches the title per default. If you also wish to fetch the description, set this option to true.


