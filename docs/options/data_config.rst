==============================
data_config( [HTML element] )
==============================

    | type: **Function**
    | arguments: **HTML element**

This very useful function configures how the data should be extracted from the source. 
It should return an object that will blend in with the default extractions.

Use this option to control how your data should be interpreted.
A common case is when you have HTML markup that you would like to implement as captions.
This option can tell Galleria how to interpret your HTML code so it collects the right data.

The argument is a HTML element selected from the HTML source ( most often an Image element ). 
Use this to traverse the source and return the right data into Galleria.

If you are using other elements than Images as source, you can change the selctor using the data_selector option.

Default extractions from the HTML element:
..................................................

- **image:** the ``src`` attribute OR parent ``<a>`` tag's ``href`` attribute (if exists and links to an image)
- **thumb:** the ``src`` attribute
- **title:** the ``title`` attribute
- **description:** the ``alt`` attribute
- **link:** the ``longdsesc`` attribute

Example on how to alter the extraction logic:
..............................................

::

    <div id="galleria">
        <img src="myimg.jpg" rel="John Doe">
        <span class="desc">My picture</span>
    </div>
    <script>
    $('#galleria').galleria({
        data_config: function(img) {
            // img is now the image element
            // the function should return an object with the new data
            return {
                title: $(img).attr('rel') // sets title to "John Doe",
                description: $(img).next('.desc').html(), // sets description to "My picture"
            };
        }
    });
    </script>
    
Example on how to add rich HTML captions:
.........................................

::

    <div id="galleria">
        <div class="image">
            <img src="myimg.jpg">
            <h2Lorem ipsum title</h2>
            <div class="desc">You can add <strong>strong</strong> tags or any other HTML as caption</div>
        </div>
    </div>
    <script>
    $('#galleria').galleria({
        data_config: function(img) {
            return {
                title: $(img).next('h2').html(), // tell Galleria to use the h2 as title
                description: $(img).siblings(.desc).html() // tell Galleria to grab the content from the .desc div as caption
            };
        }
    });
    </script>