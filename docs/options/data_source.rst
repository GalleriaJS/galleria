===========
data_source
===========

    | type: **String** or **Array**
    | default: *jQuery target*

This is for defining where to look for the Galleria data. 
By default, Galleria looks for HTML data in the target selector, but you can tell Galleria to look elsewhere in the document using this option.

If you are using JSON data, you can use this option to bring that JSON Array into Galleria.


Examples:
=========

::

    // Galleria will look for images in '#galleria':
    $('#galleria').galleria();

    // Galleria will look for images in '#images' 
    // but use '#galleria' as gallery container:
    $('#galleria').galleria({data_source: '#images'});


Using custom data Array:
........................

::

    <div id="galleria"></div>
    <script>
    var data = [
        { image: "/path/to/myimage1.jpg" },
        { image: "/path/to/myimage2.jpg" },    
    ];
    
    $('#gallery').galleria({
        data_source: data,
    });
    </script>
    

Placing the Galleria gallery in a different place and keep the thumbnails:
..........................................................................

::
    
    <div id="gallery"></div>
    <div id="source">
        <a href="myimg1.jpg"><img src="mythumb1.jpg"></a>
        <a href="myimg2.jpg"><img src="mythumb2.jpg"></a>
    </div>
    <script>
    $('#gallery').galleria({
        data_source: "#source",
        keep_source: true // this prevents galleria from clearing the data source container
    });
    </script>