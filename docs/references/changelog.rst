*********
Changelog
*********

1.2.9
-----
* Clicknext/lightbox is now only triggered on left-click
* Better internal queue handling
* Improved the .destroy() method so it destroys all events and data as well
* Added an automatic .destroy() trigger if a gallery was initialized on an element that already contained a gallery (no more silent fail)
* Removed automatic gallery updates when using .loadTheme()
* Added a static Galleria.unloadTheme() that unloads the existing theme and prepares for a new one
* Fixed an IE8 bug with initial inherited opacity for images
* Added fullscreen functionality from within an iframe gallery, assuming that the iframe and parent window protocol, host and ports match
* Added a maxVideoSize option that limits the iframe/video size

1.2.8
-----
* Fixed a dummy image bug
* Responsive is now default true, and it will also keep the original aspect ratio per default. You can still set your own ratio if you configure a height less than two.
* Fixed Galleria.log
* Fixed a bug with multiple galleries and true fullscreen
* Fixed a Galleria.on bug
* Fixed tooltip bug in some IE versions
* .push() now silently adds new thumbnails without reloading the thumbnail bar
* Fixed a enterFullscreen bug in FF if fullscreen was entered during transition
* Added a thumbDisplayOrder option (defaults true) that will make the thumbnails appear in order (but still load async)
* Added a 'lazy' option for thumbnails, making them lazy so you can control the loading later
* Added two more API calls - 'lazyLoad()' and 'lazyLoadChunks()' that controls how the lazy thumbnails should be loaded
* Galleria now uses a test element to know when the CSS is loaded for better Android compatibility. If you are getting errors after upgrading you should also download the latest theme files.
* Fixed some performance issues in Folio, it should now work more stable across all browsers
* Added a dataSort option that you can use to sort the images before showing them

1.2.7
-----
* Fixed an issue with double events when using clicknext and layer.
* Moved the clicknext target from the stage to the image element
* Fixed an IE bug that made the overlay invinsible when calling lightbox multiple times.
* Fixed an IE9 bug that made the lightbox navigation work incorrectly
* Fixed a timer that caused iOS5 to not trigger the fullscreen_close event in some setups
* Added support for HTML5 data attributes for passing data to Galleria. We will continue to have legacy support, but this is now the recommended way to pass data.
* The event object passed at image, thumbnail, loadstart and loadfinish events now also contains the current gallery data, passed as 'galleriaData'
* Added video support for Vimeo, Youtube and Dailymotion video URLs. Se the image data reference for implementation instructions.
* Removed the description attribute for Picasa, since google only uses one caption. Instead, we now extract the caption as title (instead of the file name).
* Added youtube, vimeo and dailymotion options for setting custom player parameters for each provider
* Added iframe support, now you can place any website URL as iframe, as long as the site allows it.
* Added two more crops: 'portrait' and 'landscape'. 'landscape' is the most useful - it crops landscape pictures but not portrait. 'portrait' crops the other way around.
* Removed the debug message for "image not loaded in 30 seconds", as it was causing much more confusion than good
* Added a "wait" option, this defines how long Galleria should wait when trying to extract measurements before throwing an error. Set this to **true** for infinity.
* Added a destroy() method in the API
* Added a new reference called "Galleria error messages" where we list all common errors, what causes them and how to solve them.
* Fixed minor lightbox/clicknext bug for touch devices
* Fixed a cross-domain issue when adding themes from other domains in firefox
* Fixed some timer bugs for multiple galleries
* Added a 'resize' method in the API and a new option called 'responsive'. Setting this to true will allow the entire gallery to scale according to dynamic CSS properties.
* Made it possible to use a relative height, specified by a low number for height declaration that will be the ratio
* Added Galleria.configure as a static option for adding options
* Added Galleria.run as the official initialization method
* Added Galleria.on as a static binder for events
* Added a fallback that uses domReady if the element is not found on the first init
* Added support for native fullscreen in Firefox 10+, Chrome and Safari 5+. You can disable it by setting trueFullscreen to false

1.2.6
-----
* Fixed a fullscreen bug on the first image when using a bigger photo
* Fixed so that the image will return to it’s original source when exiting fullscreen
* Added a warning if the page is in quirks mode (IE only)
* Fixed a rendering error that caused a blank image if the user moved images really fast using the slide transition
* Added fullscreenTransition and touchTransition options
* Lightbox now also preloads the next two big images for faster navigation while in lightbox mode
* Layer now inherits lightbox, link or clicknext events set on image or stage
* Fixed a load issue in webkit causing a width/height error for cached images in debug mode
* Increased CSS load timeout
* Fixed a positioning bug in IE when the images where positioned far to the left when entering fullscreen mode using a different transition

1.2.5
-----
* Removed the need for having .jpg .gif .png as file ending for Galleria to recognize the file as an image
* Improved error handling when loading images
* Removed translate3d and use regular css3 transitions for desktop webkit to prevent resize bugs
* Removed css3 animations in Opera since the implementation is still buggy
* Added 'layer' in data model – a HTML layer above the image that follows the image transitions and position.
* Improved events for handling loading of themes
* Fixed many alpha bugs in IE when using Utils.hide and Utils.show
* Added dummy option so you can show a fallback image if the active image could not be fetched
* Added a setPlaytime method that lets you change the slideshow interval anytime
* Fixed logging bug in IE
* Added the instance into $.data so you can use $(target).data('galleria').anyApiMethod()
* Added version and a static .requires(version) method
* Reworked the image load methods to work more efficient and cross-browser friendly
* Fixed so that the carousel follows any initial index set by the show option
* Fixed a rendering bug in some environments where the image was right-aligned
* Added the History plugin
* Added a fullscreenCrop option for separate cropping in fullscreen mode
* Added the Picasa plugin
* Added an imageTimeout option for setting a custom timeout for Galleria when fetching images

1.2.4
-----
* Improved overall error messages
* Galleria now prints debug messages to the Galleria container for easier debugging
* Debug is now true by default - set debug to false when deploying
* Changed lightbox image to use the bigger image if available
* Fixed a link bug that caused the link destination to be mixed up between images
* Added a rel attribute in the HTML that can be used to provide a big image for fullscreen view
* Removed a thumbnail height check before validating the measurements
* Added keyboard nav for the lightbox
* Added canvas rescaling support for better thumbnail generation on the client. Still experimental; set useCanvas to true if you want to try it.
* Fixed a rounding error in IE9 that caused the thumbnails to stretch
* Added CSS3 animations (including hardware optimized for iOS) with jQuery fallbacks for all transitions and other animations
* Added a swipe option (default true) to activate swipe gesture for navigating on touch devices
* Improved the touchstart event for a better mobile experience in general
* Improved the Galleria.TOUCH boolean to detect if the document supports an actual touch event
* Improved the classic theme, other themes will also be improved
* Fixed a webkit bug where the scrollbar sometimes disappeared after returning from fullscreen
* Added a Galleria.ready function to simplify customizations and attaching plugins to each gallery when initialized
* Added a new transition: 'doorslide' that will slide the images in opposite directions
* Added 'idleMode' option, set this to false to prevent the gallery from entering idle mode at all
* Added 'fullscreenDoubleTap' option (default true) that listens for the double-tap event on touch devices and toggle fullscreen mode if it happens.

1.2.3
-----
* Added Flickr plugin docs
* Increased CSS load timeout to fix many loadTheme errors
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