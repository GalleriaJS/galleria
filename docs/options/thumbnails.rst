.. highlight:: html

==========
thumbnails
==========

    | type: **Boolean** or **String**
    | default: **true**

Sets the creation of thumbnails. If false, Galleria will not create thumbnails and no carousel.

- If you set this to **'empty'**, Galleria will create empty spans with the className ``img`` instead of thumbnails.
- If you set this to **'numbers'**, Galleria will create empty spans with numbers instead of thumbnails.
- If you set this to **'lazy'**, Galleria will create empty images with the class 'lazy'. You can then call ``loadLazyThumbs()`` to load the thumbnails at run time.

Example on how to create numbered elements instead of thumbnails
................................................................
::

    <script>
    Galleria.configure({
        thumbnails: "numbers"
    });
    </script>
