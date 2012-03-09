=====
dummy
=====

    | type: **String**
    | default: **undefined**

This option allows you to define an image that should be shown if Galleria can’t find the original image.
Think of it as a 404 for Galleria.

Example::

    Galleria.configure({
        dummy: '/images/noimage.jpg'
    });