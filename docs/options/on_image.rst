====================================
on_image( [ image ], [ thumbnail ] )
====================================

    | type: **Function**
    | arguments: **Main Image element**, **Thumbnail Image element**

Helper event function that triggers when an image is loaded and about to enter the stage.
This function simplifies the process of adding extra functionality when showing an image without using the extend method och manipulating the theme.

**image** is the main image and **thumbnail** is the active thumbnail. Both are returned as HTML Image elements.

The **"this"** keyword in the function is the gallery instance.

Example on how to open a lightbox when clicking the main image:
...............................................................

::

    <script>
    $('#galleria').galleria({
        on_image: function( image, thumb ) {
        
            var gallery = this;
            
            // image is now the image element and gallery the instance
            $( image ).click( function() {
                gallery.openLightbox();
            })
        }
    });
    </script>