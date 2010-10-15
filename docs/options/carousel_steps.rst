===============
carousel_steps
===============

    | type: **Number** or **String**
    | default: **'auto'**

The number of "steps" the carousel will advance when navigating between available thumbnails.
You can control the animation speed using the carousel_speed option.

``'auto'`` will move the carousel as many steps as there are visible thumbnails.

Example::

    $("#galleria").galleria({
        carousel_steps: 2 // will advance the carousel 2 steps everytime the user clicks on the arrow
    })