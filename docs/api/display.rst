*******
Display
*******

.enterFullscreen( [callback] )
------------------------------

    | returns **Galleria**

This will set the gallery in fullscreen mode. It will temporary manipulate some
document styles and blow up the gallery to cover the browser screen. Note that
it will only fill the browser window, not the client screen (javascript can't
do that).

The callback is called when the fullscreen mode has initialized (it takes
around 40 ms before everything is rescaled)


.exitFullscreen( [callback] )
-----------------------------

    | returns **Galleria**

This will exit fullscreen mode and revert the gallery to it's normal size and
also revert the document styles. The callback is called when the fullscreen
mode is turned off (it takes around 40 ms before everything is rescaled)


.showLightbox( [index] )
------------------------

    | returns **Galleria**

This will pop out a lightbox window of the image. You can specify an index if
you want to display a different image than the currently active. The lightbox
window is fairly simple and pre-styled (no CSS or images needed). You can
define some values like the overlay opacity as a galleria option.


.hideLightbox()
---------------

    | returns **Galleria**

This will close the lightbox window.


.addIdleState(elem, styles)
---------------------------

    | returns **Galleria**

This will add an "idle" state of any element. The idle state activates when no
user interaction has been made for x amount of milliseconds. You can modify the
idle timeout using the idle_time option (default is 3000 milliseconds). Styles
is an object of CSS styles you wish to animate the element to when entering
idle state. Example::

    // will fade out the thumbnails when entering idle mode
    this.addIdleState(this.get('thumbnails'), {
        opacity: 0
    });


.removeIdleState(elem)
----------------------

    | returns **Galleria**

Removes an elements idle state set using the ``addIdleState`` method.


.addPan( [image] )
------------------

    | returns **Galleria**

Manually applies a panning effect that revealse cropped areas on mousemove. If
no image specified, it will assume the currently displayed image. You can set
this to automatically add pan on each image using the ``image_pan`` option.


.removePan()
------------

    | returns **Galleria**

Removes all panning effects set by ``addPan()``.