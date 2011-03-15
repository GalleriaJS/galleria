*********
Changelog
*********

1.2.3
-----
* Increased image load timeout to 30sec
* Added 'big' as data key. This makes it possible to provide a bigger image for fullscreen mode.
* Added 'Using image data' reference to explain in detail how Galleria handles image data
* Added isPlaying(), isFullscreen() and refreshImage() to the API docs
* Fixed so that exiting fullscreen mode will also revert the keymap that was applied before entering
* Fixed attachKeyboard so that you can attach a custom keyCode (thanks rspeicher)
* Fixed chrome bug when fading the tooltip
* Fixed double show bug when using load()
* Fixed initialTransition option bug
* Fixed so that the counter updates properly when modifying the data object at run time
* Improved lightbox controls
* Fixed fade bug in lightbox mode
* Added a lightbox option as a helper for attaching a click event that triggers the lightbox for each image
* Added playToggle() method in the docs

1.2.2
-----
* Fixed showInfo, showCounter and showImagenav options
* Fixed IE bug when loading a theme from jQuery’s domReady callback
* Fixed IE7 bug when calculating height, it now takes the maximum height from different values
* Fixed IE bug when showing/hiding counters with transparent pngs inside

1.2.1
-----

* Fixed Chrome image loading bug in Chrome 9 / OSX by forcing chrome to reload the image using a timestamp get if no width/height is detected.
* Removed the Galleria.THEMELOAD event that caused the debugger to throw an error in debug mode when using multiple instances.

1.2
---

* 1.2 stable release 2011-02-18