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

List of options
===============

*****

carousel
--------

    | type: **Boolean**
    | default: **true**

If **true**, this will activate the carousel when needed. **false** will force it to not appear t all.

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
**'auto'** will move the carousel as many steps as there are visible thumbnails.

*****

data_config
---------------

    | type: **Function**
    | default: **undefined**

This function configures how the data should be extracted from the source. It should return an object that will blend in with the default extractions.

Default extractions from the image_target element:
..................................................

* **image:** the **src** attribute OR parent **<a>** tag's **href** attribute (if exists and links to an image)
* **thumb:** the **src** attribute
* **title:** the **title** attribute
* **description:** the **alt** attribute
* **link:** the **longdsesc** attribute

Example on how to alter the extraction logic:
..............................................

:: html
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
