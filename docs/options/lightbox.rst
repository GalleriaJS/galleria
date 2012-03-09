========
lightbox
========

    | type: **Boolean**
    | default: **false**

This option acts as a helper for attaching a lightbox when the user clicks on an image. If you have a link defined for the image, the link will take precedence.

Example on how to attach a lightbox to each image:
..................................................

.. highlight:: javascript

::

    Galleria.configure({
        lightbox: true
    });