==========
thumbnails
==========

    | type: **Boolean** or **String**
    | default: **true**

Sets the creation of thumbnails. If false, Galleria will not create thumbnails and no carousel.

If you set this to **'empty'**, Galleria will create empty spans with the className ``img`` instead of thumbnails.
If you set this to **'numbers'**, Galleria will create empty spans with numbers instead of thumbnails.

Example on how to create numbered elements instead of thumbnails
................................................................

::

    <script>
    $('#galleria').galleria({
        thumbnails: "numbers"
    });
    </script>