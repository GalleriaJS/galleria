.. highlight:: javascript

******
Twelve
******

The Twelve theme was the first Premium theme created for Galleria.

Defaults
--------

::

    {
        transition: "pulse",
        transitionSpeed: 500,
        imageCrop: true,
        thumbCrop: true,
        carousel: false
    }

Theme-specific options
----------------------

::

    {
        // Toggles the fullscreen button
        _showFullscreen: true,
        
        // Toggles the lightbox button
        _showPopout: true,
        
        // Toggles the progress bar when playing a slideshow
        _showProgress: true,
        
        // Toggles tooltip
        _showTooltip: true,
        
        // Localized strings, modify these if you want tooltips in your language
        _locale: {
            show_thumbnails: "Show thumbnails",
            hide_thumbnails: "Hide thumbnails",
            play: "Play slideshow",
            pause: "Pause slideshow",
            enter_fullscreen: "Enter fullscreen",
            exit_fullscreen: "Exit fullscreen",
            popout_image: "Popout image",
            showing_image: "Showing image %s of %s"
        }
    }