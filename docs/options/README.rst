================
Galleria Options
================

Galleria options are defined using a flat object during initialization.::

    $('#galleria').galleria({
        preload: 3,
        transition: 'fade',
        image_crop: true
    });

**Note:** You can define your own options and set defaults for each theme using the Theme builder API.

List of options
...............

- **autoplay** — sets Galleria to play slidehow when initialized
- **carousel** — toggle the creation of a carousel
- **carousel_follow** — defines if the carousel should follow the image
- **carousel_speed** — carousel animation speed in milliseconds
- **carousel_steps** — defines how many "steps" the carousel should take on each nav click
- **clicknext** — helper for adding a click event on the entire stage to move forward
- **data_config** — defines how Galleria should parse the HTML
- **data_selector** — defines the selector Galleria should look for in the source
- **data_source** — defines the Galleria data, or the HTML source where the data is found.
- **debug** — set this to true to get error messages
- **easing** — defines the easing mode globally
- **extend** — add custom functionality to the gallery
- **height** — manually set a gallery height
- **idle_time** — defines how long delay before Galleria goes into idle mode.
- **image_crop** — defines how Galleria will crop the image
- **image_margin** — sets a margin between the image and the stage
- **image_pan** — toggles the image pan effect
- **image_pan_smoothness** — defines how smooth ( and CPU consuming ) the pan effect should be.
- **image_position** — positions the image
- **keep_source** — lets you keep the source elements
- **lightbox_fade_speed** — defines how fast the lighbox should fade
- **lightbox_transition_speed** — defines how fast the lighbox should animate
- **max_scale_ratio** — defines how much Galleria is allowed to scale
- **min_scale_ratio** — defines how much Galleria must scale
- **on_image** — helper event method for adding custom functionality every time an image is shown
- **overlay_opacity** — sets how transparent the overlay should be
- **overlay_background** — defines the background color of the overlay
- **pause_on_interaction** — toggles if Galleria should stop playing if the user navigates
- **popup_links** — open Image links in new windos
- **preload** — defines how much Galleria should preload
- **queue** — defines if Galleria should queue the slideshow
- **show** — lets you start the slideshow at any image index
- **show_info** — toggles the caption
- **show_counter** — toggles the counter
- **show_imagenav** — toggles the image navigation arrows
- **thumb_crop** — same as image_crop for thumbnails
- **thumb_fit** — lets you fit thumbnails according to width
- **thumb_margin** — same as image_margin for thumbnails
- **thumb_quality** — Defines if and how IE should use bicubic image rendering for thumbnails
- **thumbnails** — sets how and if thumbnails should be created
- **transition** — defines what transition to use
- **transition_initial** — sets a different transition on the the first image
- **transition_speed** — defines the speed of the transition
- **width** — manually set a gallery width
