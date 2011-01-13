*********
Slideshow
*********


.play( interval )
-----------------

    | returns **Galleria**

Starts the automatic slideshow and sets the interval length in milliseconds. If
no interval is given, default (5000 = 5 seconds) is used.


.pause()
--------

    | returns **Galleria**

Stops the slideshow and resets the interval.


.next()
-------

    | returns **Galleria**

Displays the next image in line, or the first if you are at the last image.


.prev()
-------

    | returns **Galleria**

Displays the previous image in line, or the last if you are at the first image.


.show( index )
--------------

    | returns **Galleria**

Shows the image specified as index. You can call this method anytime and the
image will be placed in a transition queue.