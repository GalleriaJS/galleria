======
Flickr Plugin
======

Galleria comes with a flickr plugin that can be used to fetch images from flickr and display them in your Galleria gallery.

Example usage
=============

**note:** You must include the flickr plugin script at ``src/plugins/galleria.flickr.js`` to use this plugin.

The following code searches flickr for the string 'butterfly', fetches 40 images in the 'Medium' format and sorts them after "interestingness" (default). When the data is ready, you can pass it into the Galleria constructor like this::

    var api_key = 'abc123' // you must have a flickr API key
    var flickr = new Galleria.Flickr(api_key); // initialize the plugin

    flickr.search('butterfly', function(data) {
        $('#galleria').galleria({
            data_source: data
        });
    });
    
You can set options using ``.setOptions()`` or as a second argument to the call::

    flickr.setOptions({
        max: 60,
        size: 'medium',
        sort: 'date-posted-desc'
    });
    
    flickr.getSet('72057594078378762', function(data) {
        $('#galleria').galleria({
            source: data
        });
    });

Public methods
==============

.setOptions( options )
----------------------

    | returns **Galleria.Flickr**

Modifies the default options for ``Galleria.Flickr``. **options** is an Object with your custom options that will override the defaults.

.search(search_string, options, callback)
----------------------

    | returns **Galleria.Flickr**

A helper function for searching Flickr and converting the data to a Galleria-friendly data object.

- **search_string** (String) the term you want to search for.
- **options** (Object) is the search options object passed to flickr (optional).
- **callback(data)** (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.

.getTags(tags, [options,] callback)
----------------------

    | returns **Galleria.Flickr**

A helper function for searching Flickr for tags and converting the data to a Galleria-friendly data object.

- **tags** (String) a comma-separated string with tags to search for, ex: 'purple,white'.
- **options** (Object) is the search options object passed to flickr (optional).
- **callback(data)** (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.

.getUser(username, [options,] callback)
----------------------

    | returns **Galleria.Flickr**

Get all pictures from a user's photostream. The username is the same name as in your flickr URL, f.ex if my URL is flickr.com/photos/johndoe/, the user name is 'johndoe'.

- **user** (String) The username as displayed in your Flickr URL, ex: 'johndoe'.
- **options** (Object) is the search options object passed to flickr (optional).
- **callback(data)** (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.

.getSet(set_id, [options,] callback)
----------------------

    | returns **Galleria.Flickr**

Get all pictures from a specific photoset.

- **set_id** (String) The ID of the photoset (you can grab it from the URL)
- **options** (Object) is the search options object passed to flickr (optional).
- **callback(data)** (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.

.getGallery(gallery_id, [options,] callback)
----------------------

    | returns **Galleria.Flickr**

Get all pictures from a specific gallery.

- **gallery_id** (String) The ID of the gallery (you can grab it from the URL)
- **options** (Object) is the search options object passed to flickr (optional).
- **callback(data)** (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.


Options
=======

max
---

    | type: **Number**
    | default: **30**

Sets the amount of images that will be fetched (max 100)

size
------------

    | type: **String**
    | default: **'medium'**

This options defines what size the plugin will fetch from flickr. Possible values are 'small', 'medium','big' and 'original'. Note that the 'big' size (1024px wide) is only available if the original size exceeds 1280px wide. If not, 'big' will return the biggest size available. 'original' will always return the biggest image available, but this can slow down performance significantly.

sort
------------

    | type: **String**
    | default: **'interestingness-desc'**

How to sort the images. Available options are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.

description
------------

    | type: **Boolean**
    | default: **false**

Set this to true if you would like the plugin to fetch descriptions for each image and add it to the gallery.