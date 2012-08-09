.. highlight:: javascript

****
Azur
****

The Azur theme was created in August 2012 in Cote D'Azur (French riviera).

Defaults
--------

::

    {
        transition: 'fade',
        transitionSpeed: 500,
        imageCrop: false,
        thumbCrop: 'height',
        idleMode: 'hover',
        idleSpeed: 500,
        fullscreenTransition: false
    }

Theme-specific options
----------------------

::

    {
        // Set this to false if you want to have captions visible all the time
        _toggleCaption: true,

        // Toggles tooltip
        _showTooltip: true,

        // Sets this to false if you don’t want to show the captions initially
        _showCaption: true,

        // Localized strings, modify these if you want tooltips in your language
        _locale: {
            show_captions: 'Show captions',
            hide_captions: 'Hide captions',
            play: 'Play slideshow',
            pause: 'Pause slideshow',
            enter_fullscreen: 'Enter fullscreen',
            exit_fullscreen: 'Exit fullscreen',
            next: 'Next image',
            prev: 'Previous image',
            showing_image: 'Showing image %s of %s'
        }
    }