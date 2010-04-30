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

carousel
--------

    | type: **Boolean**
    | default: **true**

If **true**, this will activate the carousel when needed. **false** will force it to not appear t all.

----------------------

carousel_follow
---------------

::
    type: **Boolean**
    default: **true**

Defines if the the carousel should follow the active image.
