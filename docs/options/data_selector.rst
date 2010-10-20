=============
data_selector
=============

    | type: **String**
    | default: **'img'**

The selector Galleria should look for in the HTML source. 
If you are using other elements than images to store data in the HTML, you can set this option to configure Galleria to look for the right elements. 

You can use any jQuery selector, see http://api.jquery.com/category/selectors/

Most often it is a matter of graceful degradation; using the data_selector and data_config option you have full control over what the users will see
if they turn off JavaScript. By default, Galleria works with Image elements as a data source and fallback, but that might not be the case in your app.

You can use the data_config option to parse the selected elements and extract data in a customized way.

Example::

    <div id="galleria">
        <a href="myimg.jpg">My image</a>
        <a href="myimg2.jpg">My other image</a>
    </div>
    
    <script>
    $('#galleria').galleria({
        data_selector: "a",
        data_config: function(a) {
            // a is now the anchor element
            // the function should return an object with the new data
            return {
                image: $(a).attr('href') // tell Galleria that the href is the main image,
                title: $(a).text(), // use the anchor text for title
            };
        }
    });
    </script>