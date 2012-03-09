==========
keepSource
==========

    | type: **Boolean**
    | default: **false**

By default, Galleria clears the source container when rendering the gallery.
Sometimes you need to apply the gallery some place else, like a lightbox, but still want to keep the thumbnails in the source.

This option sets if the source HTML should be left intact.
Setting this to ``true`` will also add click events inside the source code, to make your thumbnails clickable.

Useful for building custom thumbnails and still have galleria control the gallery.

Example of placing the Galleria gallery outside the source and keep the thumbnails:
...................................................................................

.. highlight:: html

::

    <div id="galleria"></div>
    <div id="source">
        <a href="myimg1.jpg"><img src="mythumb1.jpg"></a>
        <a href="myimg2.jpg"><img src="mythumb2.jpg"></a>
    </div>
    <script>
    Galleria.run('#galleria', {
        dataSource: "#source", // fetch images from "#source"
        keepSource: true // this prevents galleria from clearing the data source container
    });
    </script>