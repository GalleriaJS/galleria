.. _flickr:

======
Flickr
======

Galleria has a built-in flickr data fetcher that can be used to fetch images from flickr and display them in your Galleria gallery.

Example usage
=============

The following code searches flickr for the string 'butterfly', fetches 40 images in the 'Medium' format and sorts them after "interestingness". When the data is ready, you can pass it into the Galleria constructor like this::

    var api_key = 'abc123' // you must have a flickr API key
    Galleria.flickr.setOptions({
        max: 40,
        use_original: false
    });
    Galleria.flickr.search(api_key, {
        text: 'butterfly',
        sort: 'interestingness-desc'
    }, function(data) {
        $('#galleria').galleria({
            source: data
        });
    });

You can also chain the functions::

    Galleria.flickr.setOptions({
        max: 20
    }).search(api_key, {
        text: 'sweden',
    }, function(data) {
        $('#galleria').galleria({
            source: data
        });
    });

Public methods
==============

.setOptions( options )
----------------------

returns Galleria.flickr

Modifies the default options for Galleria.flickr. options is an Object with your custom options that will override the defaults.

.search(key, params, callback)
----------------------

returns Galleria.flickr

A helper function for searching Flickr and converting the data to a Galleria-friendly data object. You can use the data_config option to modify the data further.

The params object can contain any parameters available from the Flickr search API.

key (String) is your Flickr API key.
params (Object) is the search options object passed to flickr.
callback(data) (Function) gets called when the data is ready. The first argument is the Galleria-friendly image data object.


Options
=======

max
---
type: Number
default: 30

Sets the amount of images that will be fetched (max 100)

use_original
---
type: Boolean
default: false

If set to true, it forces Galleria to try to fetch the highest image resolution available from flickr. This will slow download time a lot, unless you know what you are fetching (f.ex images from your own account). Setting this to false will tell Galleria to fetch the 'medium' sized image from Flickr (680 x 480px). Please note that the .search() will fetch a smaller image for thumbnails per default.

Read more about flickr sizes at the flickr.photos.getSizes() documentation.

data_config( data )
-------------------
type: Function
default: undefined

Use this function to modify the data conversion manually from flickr. data is the single photo object from Flickr (see the flickr documentaion for example responses)::

    Galleria.flickr.search(api_key, {
        text: 'sweden',
        data_config: function(data) {
            return {
                description: data.id
            }
        }
    }, function(data) {
        // now the image description is the image ID for each image:
        Galleria.log(data);
    });