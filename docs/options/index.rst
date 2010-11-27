*******
Options
*******

.. toctree::
   :hidden:
   :glob:

   *


.. highlight:: javascript


Galleria options are defined using a flat object during initialization.::

    $('#galleria').galleria({
        preload: 3,
        transition: 'fade',
        image_crop: true
    });

.. note:: You can define your own options and set defaults for each theme using
          the Theme builder API.


List of options
===============
- :doc:`autoplay` Sets Galleria to play slidehow when initialized.

- :doc:`carousel` Toggle the creation of a carousel.

- :doc:`carousel_follow` Defines if the carousel should follow the image.

- :doc:`carousel_speed` Carousel animation speed in milliseconds.

- :doc:`carousel_steps` Defines how many "steps" the carousel should take on
  each nav click.

- :doc:`clicknext` Helper for adding a click event on the entire stage to move
  forward.

- :doc:`data_config` Defines how Galleria should parse the HTML.

- :doc:`data_selector` Defines the selector Galleria should look for in the
  source.

- :doc:`data_source` Defines the Galleria data, or the HTML source where the
  data is found.

- :doc:`debug` Set this to true to get error messages.

- :doc:`easing` Defines the easing mode globally.

- :doc:`extend` Add custom functionality to the gallery.

- :doc:`height` Manually set a gallery height.

- :doc:`idle_time` Defines how long delay before Galleria goes into idle mode.

- :doc:`image_crop` Defines how Galleria will crop the image.

- :doc:`image_margin` Sets a margin between the image and the stage.

- :doc:`image_pan` Toggles the image pan effect.

- :doc:`image_pan_smoothness` Defines how smooth ( and CPU consuming ) the pan
  effect should be.

- :doc:`image_position` Positions the image.

- :doc:`keep_source` Lets you keep the source elements.

- :doc:`lightbox_fade_speed` Defines how fast the lightbox should fade.

- :doc:`lightbox_transition_speed` Defines how fast the lightbox should animate.

- :doc:`max_scale_ratio` Defines how much Galleria is allowed to scale.

- :doc:`min_scale_ratio` Defines how much Galleria must scale.

- :doc:`on_image` Helper event method for adding custom functionality every
  time an image is shown.

- :doc:`overlay_opacity` Sets how transparent the overlay should be.

- :doc:`overlay_background` Defines the background color of the overlay.

- :doc:`pause_on_interaction` Toggles if Galleria should stop playing if the
  user navigates.

- :doc:`popup_links` Open Image links in new windows.

- :doc:`preload` Defines how much Galleria should preload.

- :doc:`queue` Defines if Galleria should queue the slideshow.

- :doc:`show` Lets you start the slideshow at any image index.

- :doc:`show_info` Toggles the caption.

- :doc:`show_counter` Toggles the counter.

- :doc:`show_imagenav` Toggles the image navigation arrows.

- :doc:`thumb_crop` Same as image_crop for thumbnails.

- :doc:`thumb_fit` Lets you fit thumbnails according to width.

- :doc:`thumb_margin` Same as image_margin for thumbnails.

- :doc:`thumb_quality` Defines if and how IE should use bicubic image rendering
  for thumbnails

- :doc:`thumbnails` Sets how and if thumbnails should be created.

- :doc:`transition` Defines what transition to use.

- :doc:`transition_initial` Sets a different transition on the the first image.

- :doc:`transition_speed` Defines the speed of the transition.

- :doc:`width` Manually set a gallery width.
