.. highlight:: javascript

******
Folio
******

You can change thumbnail width using css, just add something like this anywhere in your CSS::

    body .galleria-thumbnails .galleria-image { width:100px }

Defaults
--------

::

    {
        transition: 'pulse',
        thumbCrop: 'width',
        imageCrop: false,
        carousel: false,
        show: false,
        easing: 'galleriaOut',
        fullscreenDoubleTap: false,
    }

Theme-specific options
----------------------

::

    {
        // Shows navigation as cursor for webkit
        _webkitCursor: true,

        // Animates the thumnails
        _animate: true
    }