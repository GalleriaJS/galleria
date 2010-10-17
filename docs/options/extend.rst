=====================
extend( [ options ] )
=====================

    | type: **Function**
    | arguments: **options Object**

This function is used to extend the init function of the theme. You will have full access to the Galleria API here.
The argument is the cascaded options object, and the scope is always the Galleria gallery instance.

Use extend as a method for adding custom modifications such as play/pause without creating a new theme.

Example on how to add a play link by extending the theme:
..........................................................

::
    
    <a id="play" href="#">Play</a>
    <script>
        $('#galleria').galleria({
            extend: function(options) {
            
                var gallery = this; // "this" is the gallery instance
                
                $('#play').click(function() {
                
                    gallery.play(); // call the play method
                    
                });
            }
        });
    </script>