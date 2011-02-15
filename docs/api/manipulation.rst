Manipulation
============

.splice( index, howMany[, element1[, ...[, elementN]]] )
--------------------------------------------------------

    | returns **Galleria**

Adds and/or removes images from the gallery. This method works just like the JavaScript ``Array.splice`` method as explained here:

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice

Examples::

    this.splice( 0, 2 ); // removes two images after the first
    this.splice( -2, 2 ); // removes the last two images
    

.push( element1, ..., elementN )
--------------------------------------------------------

    | returns **Galleria**

Adds and/or removes images from the gallery. This method works just like the JavaScript ``Array.push`` method as explained here:

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push

Examples::

    this.push({ image: 'image1.jpg' }); // adds an image to the gallery


.addElement( elemID )
---------------------

    | returns **Galleria**

Creates a new element into the Galleria DOM and becomes instantly available
using ``.$()`` or ``.get()``


.appendChild( parentID, childID )
---------------------------------

    | returns **Galleria**

Appends an element to another in the Galleria DOM structure using element IDs.
Example::

    // creates a new element with the id 'mystuff':
    this.addElement('mystuff');

    // appends the element to the container
    this.appendChild('container','mystuff');


.prependChild( parentID, childID )
----------------------------------

    | returns **Galleria**

Prepends an element to another in the Galleria DOM structure using element IDs.
Example::

    // creates a new element with the id 'mystuff':
    this.addElement('mystuff');

    // appends the element to the stage
    this.prependChild('stage','mystuff');


.setCounter( [index] )
----------------------

    | returns **Galleria**

Sets the counter to the index or the active image if no index is specified.


.setInfo( [index] )
-------------------

    | returns **Galleria**

Sets the captions to display data taken from the index or the active image if
no index is specified. Example::

    this.bind('thumbnail', function(e) {
    
        $(e.thumbTarget).hover(this.proxy(function() {
        
            this.setInfo(e.thumbOrder); // sets the caption to display data from the hovered image
            this.setCounter(e.thumbOrder); // sets the counter to display the index of the hovered image
            
        }, this.proxy(function() {
        
            this.setInfo(); // reset the caption to display the currently active data
            this.setCounter(); // reset the caption to display the currently active data
            
        }));
    });