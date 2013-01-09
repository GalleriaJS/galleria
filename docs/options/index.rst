*******
Options
*******

.. toctree::
   :hidden:
   :glob:

   *


.. highlight:: javascript

The Galleria options cover most of the gallery customizations you will need for each implementation.
Below you will find a summary of all options available. Click on an option title for more explanations and examples.

These options are the standard options that you can use for all themes. However, themes can add new options and set/modify default values on their own. Please check each theme documentation for full coverage. Custom options for each theme starts with an underscore.


Using options
=============

Galleria options can be configured at anytime using the ``Galleria.configure`` function. You can add this code anywhere in your scripts, but we recommend you to put it before the ``Galleria.run`` command::

    <script>
    Galleria.loadTheme("themes/classic/galleria.classic.min.js");
    Galleria.configure({
        transition: 'fade',
        imageCrop: true
    });
    Galleria.run();
    </script>

You can also add options as a second argument when calling ``Galleria.run``::

    Galleria.run('#galleria', {
        transition: 'fade',
        imageCrop: true
    });


List of options
===============

- :doc:`autoplay` Sets Galleria to play slidehow when initialized.

- :doc:`carousel` Toggle the creation of a carousel.

- :doc:`carouselSpeed` Carousel animation speed in milliseconds.

- :doc:`carouselSteps` Defines how many "steps" the carousel should take on
  each nav click.

- :doc:`clicknext` Helper for adding a click event on the entire stage to move
  forward.

- :doc:`dailymotion` Adds player options for the Daliymotion video player

- :doc:`dataConfig` Defines how Galleria should parse the HTML. Useful for adding custom HTML captions.

- :doc:`dataSelector` Defines the selector Galleria should look for in the
  source.

- :doc:`dataSort` Function to sort the data before using it.

- :doc:`dataSource` Defines the Galleria data, or the HTML source where the
  data is found.

- :doc:`debug` Set this to false to prevent debug messages.

- :doc:`dummy` Defines a dummy image that will be used if the image can’t be found.

- :doc:`easing` Defines the easing mode globally.

- :doc:`extend` Add custom functionality to the gallery.

- :doc:`fullscreenCrop` Sets how Galleria should crop when in fullscreen mode.

- :doc:`fullscreenDoubleTap` Enabled fullscreen toggle on double-tap for touch devices.

- :doc:`fullscreenTransition` Defines a different transition for fullscreen mode.

- :doc:`height` Manually set a gallery height.

- :doc:`idleMode` Option for turning on/off idle mode.

- :doc:`idleTime` Defines how long delay before Galleria goes into idle mode.

- :doc:`idleSpeed` Defines the animation speed in milliseconds when entering/exiting idle mode.

- :doc:`imageCrop` Defines how Galleria will crop the image.

- :doc:`imageMargin` Sets a margin between the image and the stage.

- :doc:`imagePan` Toggles the image pan effect.

- :doc:`imagePanSmoothness` Defines how smooth ( and CPU consuming ) the pan
  effect should be.

- :doc:`imagePosition` Positions the image.

- :doc:`imageTimeout` Sets a timeout for fetching images.

- :doc:`initialTransition` Sets a different transition on the the first image.

- :doc:`keepSource` Lets you keep the source elements.

- :doc:`layerFollow` Boolean for controlling if the layer will follow the image size or not.

- :doc:`lightbox` Helper for attaching a **lightbox** (to zoom in) when the user clicks on an image.

- :doc:`lightboxFadeSpeed` Defines how fast the lightbox should fade.

- :doc:`lightboxTransitionSpeed` Defines how fast the lightbox should animate.

- :doc:`maxScaleRatio` Defines how much Galleria is allowed to upscale images.

- :doc:`maxVideoSize` Defines how much Galleria is allowed to upscale videos.

- :doc:`overlayBackground` Defines the background color of the overlay.

- :doc:`overlayOpacity` Sets how transparent the overlay should be.

- :doc:`pauseOnInteraction` Toggles if Galleria should stop playing if the
  user navigates.

- :doc:`popupLinks` Open Image links in new windows.

- :doc:`preload` Defines how much Galleria should preload.

- :doc:`queue` Defines if Galleria should queue the slideshow.

- :doc:`responsive` Sets Galleria in responsive mode.

- :doc:`show` Lets you start the slideshow at any image index.

- :doc:`showCounter` Toggles the counter.

- :doc:`showInfo` Toggles the caption.

- :doc:`showImagenav` Toggles the image navigation arrows.

- :doc:`swipe` Enables the swipe gesture for navigating on touch devices.

- :doc:`thumbCrop` Same as image_crop for thumbnails.

- :doc:`thumbDisplayOrder` Defines if the gallery should display the loaded thumbnails in order

- :doc:`thumbMargin` Same as :doc:`imageMargin` for thumbnails.

- :doc:`thumbnails` Sets how and if thumbnails should be created.

- :doc:`thumbQuality` Defines if and how IE should use bicubic image rendering
  for thumbnails

- :doc:`touchTransition` Defines a different transition when a touch device is detected.

- :doc:`transition` Defines what transition to use.

- :doc:`transitionSpeed` Defines the speed of the transition.

- :doc:`trueFullscreen` Makes Galleria enter a native fullscreen mode where supported.

- :doc:`vimeo` Sets options for the Vimeo player

- :doc:`wait` Defines if and how Galleria should wait until it can be displayed using user interaction.

- :doc:`width` Manually set a gallery width.

- :doc:`youtube` Sets options for the YouTube player
