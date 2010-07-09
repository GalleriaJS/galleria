.. _options:

=======
Options
=======

Galleria options are defined using a flat object during initialization.::

    $('#galleria').galleria({
        preload: 3,
        transition: 'fade',
        image_crop: true
    });

**Note:** You can define your own options and set defaults for each theme using the Theme builder API.

Table of contents (in alphabetical order)
=================

- autoplay
- carousel
- carousel_follow
- carousel_speed
- carousel_steps
- data_config
- data_image_selector
- data_type
- data_source
- debug
- extend
- image_crop
- image_margin
- keep_source
- max_scale_ratio
- min_scale_ratio
- on_image
- popup_links
- preload
- queue
- thumb_crop
- thumb_margin
- thumb_quality
- thumbnails
- transition
- transition_speed


List of options
===============

autoplay
--------

    | type: **Boolean** or **Number**
    | default: **false**

If ``true``, this will start playing the slideshow with 3 seconds interval (default).
If you set this to any number, f.ex 4000, it will start playing with that interval (in milliseconds)

*****

carousel
--------

    | type: **Boolean**
    | default: **true**

If ``true``, this will activate the carousel when needed. ``false`` will force it to not appear t all.

*****

carousel_follow
---------------

    | type: **Boolean**
    | default: **true**

Defines if the the carousel should follow the active image.

*****

carousel_speed
---------------

    | type: **Number**
    | default: **200**

The slide speed of the carousel in milliseconds.

*****

carousel_steps
---------------

    | type: **Number** or **String**
    | default: **'auto'**

The number of "steps" the carousel will slide when navigating between available thumbnails. 
``'auto'`` will move the carousel as many steps as there are visible thumbnails.

*****

data_config
---------------

    | type: **Function**
    | default: **undefined**

This function configures how the data should be extracted from the source. It should return an object that will blend in with the default extractions.

Default extractions from the image_target element:
..................................................

- **image:** the ``src`` attribute OR parent ``<a>`` tag's ``href`` attribute (if exists and links to an image)
- **thumb:** the ``src`` attribute
- **title:** the ``title`` attribute
- **description:** the ``alt`` attribute
- **link:** the ``longdsesc`` attribute

Example on how to alter the extraction logic:
..............................................

::

    <div id="galleria">
        <img src="myimg.jpg" rel="John Doe">
        <span class="desc">My picture</span>
    </div>
    <script>
    $('#galleria').galleria({
        data_config: function(img) {
            // img is now the image element
            // the function should return an object with the new data
            return {
                description: $(img).next('.desc'), // sets description to "My picture"
                author: $(img).attr('rel') // sets author to "John Doe"
            };
        }
    });
    </script>

*****

data_image_selector
---------------

    | type: **String**
    | default: **'img'**

The selector Galleria should look for in the HTML source. Defaults to <code>'img'</code> and there is rarely any reason to change this.

*****

data_source
------------

    | type: **String** or **Array**
    | default: *jQuery target*

This is where Galleria finds the data depending on data_type. It defaults to the target selector, which is the same element that was used in the jQuery plugin.

Example:
........

::

    // Galleria will look for images in '#galleria':
    $('#galleria').galleria();

    // Galleria will look for images in '#images' 
    // but use '#galleria' as gallery container:
    $('#galleria').galleria({data_source: '#images'});

*****

data_type
---------------

    | type: **String**
    | default: **'auto'**


The dataType Galleria will use to extract data. Available options are 'json', 'html' or 'auto' (default). There is rarely any reason to change this from auto, but you might encounter a situation where you'd like to force a certain data type.

- **'auto'** means that it will try to detect dataType automatially.
- **'json'** will force Galleria to treat the source parameter as a JSON data String or Array
- **'html'** will force Galleria to treat the source parameter as a selector in the DOM where the image data is found.

Example:
.........

::

    // Galleria will use some custom image data:
    var data = [{
        image: 'myimg.jpg'
    }, {
        image: 'myimg2.jpg'
    }];
    $('#galleria').galleria({data_source: data});

*****

debug
------------

    | type: **Boolean**
    | default: *false*

Setting this to ``true`` will throw errors when something is not right. You can also set this globally using ``Galleria.debug = true``.

*****

extend
------

    | type: **Function**
    | default: **undefined**

This function is used to extend the init function of the theme. Use this to quickly add minor customizations to the theme. The first argument is the options object, and the scope is always the Galleria gallery, just like the theme's init() function.

Example on how to add a play link by extending the theme:
..........................................................

::

    <script>
        $('#galleria').galleria('classic', {
            extend: function(options) {
                $('<a>').text('play').click(this.proxy(function() {
                    this.play(5000);
                })).appendTo('body');
            }
        });
    </script>
 
*****

height
------------

    | type: **Number** or **String**
    | default: **'auto'**

This will set a height to the gallery.
If you set this to 'auto' and no CSS height is found, Galleria will automatically add a 16/9 ratio as a fallback.

*****
   
image_crop
----------

    | type: **Boolean**
    | default: **false**

Defines how the images will be cropped.

- **true** means that all images will be scaled to fill the stage, centered and cropped.
- **false** will scale down so the entire image fits.

*****

image_margin
----------

    | type: **Number**
    | default: **0**

Sets a margin between the image and stage.

*****

image_position
----------

    | type: **String**
    | default: **'center**

Positions the main image. Works like the CSS background-position property, f.ex 'top right' or '20% 100%'. You can use keywords, percents or pixels. The first value is the horizontal position and the second is the vertical. Read more at http://www.w3.org/TR/REC-CSS1/#background-position

*****

keep_source
----------

    | type: **Boolean**
    | default: **false**

This sets if the source HTML should be left intact. Setting this to ``true`` will also create clickable images of each image inside the source.
Useful for building custom thumbnails and still have galleria control the gallery.

*****

max_scale_ratio
----------

    | type: **Number**
    | default: **undefined**

Sets the maximum scale ratio for images. F.ex, if you don't want Galleria to upscale any images, set this to 1. undefined will allow any scaling of the images.

*****

min_scale_ratio
----------

    | type: **Number**
    | default: **undefined**

Sets the minimum scale ratio for images.

*****

on_image(image, thumbnail)
----------

    | type: **Function**
    | default: **undefined**

Helper event function that triggers when an image is loaded and about to enter the stage.
This function simplifies the process of adding extra functionality when showing an image without using the extend method och manipulating the theme.

**image** is the main image and **thumbnail** is the active thumbnail.

*****

popup_links
----------

    | type: **Boolean**
    | default: **false**

Setting this to **true** will open any image links in a new window.

*****

preload
--------

    | type: **String** or **Number**
    | default: **2**

Defines how many images Galleria should preload in advance. Please note that this only applies when you are using separate thumbnail files. Galleria always cache all preloaded images.

- **2** preloads the next 2 images in line
- **'all'** forces Galleria to start preloading all images. This may slow down client.
- **0** will not preload any images

*****

queue
-----

    | type: **Boolean**
    | default: **true**

Galleria queues all activation clicks (next/prev & thumbnails). You can see this effect when f.ex clicking "next" many times. If you don't want Galleria to queue, set this to **false**.

*****

show
-----

    | type: **Number**
    | default: **0**

This defines what image index to show at first. If you use the history plugin, a permalink will override this number.

*****

thumb_crop
----------

    | type: **Boolean**
    | default: **true**

Same as **image_crop** but for thumbnails.

*****

thumb_margin
------------

    | type: **Number**
    | default: **0**

Same as **image_margin** but for thumbnails.

*****

thumb_quality
-------------
    | type: **Boolean** or **String**
    | default: **true**

Defines if and how IE should use bicubic image rendering for thumbnails.

- **'auto'** uses high quality if image scaling is moderate.
- **false** will not use high quality (better performance).
- **true** will force high quality renedring (can slow down performance)

*****

thumbnails
----------

    | type: **Boolean** or **String**
    | default: **true**

Sets the creation of thumbnails. If false, Galleria will not create thumbnails. 
If you set this to 'empty', Galleria will create empty spans with the className ``img`` instead of thumbnails.

*****

transition
----------

    | type: **Function** or **String**
    | default: **'fade'**

The transition that is used when displaying the images. There are some built-in transitions in Galleria, but you can also create your own using our Transitions API

Built-in transitions
....................

- **'fade'** fade betweens images
- **'flash'** fades into background color between images
- **'slide'** slides the images using the Galleria easing depending on image position
- **'fadeslide'** fade between images and slide slightly at the same time

*****

transition_speed
----------------

    | type: **Number**
    | default: **400**

The milliseconds used when applying the transition.

