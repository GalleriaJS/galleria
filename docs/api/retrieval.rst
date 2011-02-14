Retrieval
=========

.$( elemIDs )
-------------

    | returns **jQuery**

Fetches elements from the Galleria DOM structure and returns a jQuery object
with all elements, very useful for theme development. You can specify a single
element ID or multiple elements in a comma-separated list. Example::

    this.$('stage,thumbnails').click(function(e) {
        Galleria.log('stage or thumbnails clicked');
    });


.get( elemID )
--------------

    | returns **HTML Element**

Fetches a single element from the Galleria DOM structure and returns it. Example::

    console.log( this.get('stage') ); // the HTML element
    console.log( this.$('stage') ); // the same element wrapped in jQuery


.getNext( [base] )
------------------

    | returns **Number**

Helper method for getting the next image index in line. Returns the first if
last has exceeded. ``base`` is the index you want to start from, if not
specified it grabs the active image index.


.getPrev( [base] )
------------------

    | returns **Number**

Helper method for getting the previous image index in line. Returns the last
index if base is zero. ``base`` is the index you want to start from, if not
specified it grabs the active image index.


.getActiveImage()
-----------------

    | returns **IMG Element**

Method for grabbing the currently displayed image.


.getData( [index] )
-------------------

    | returns **Object**

Returns the data object for the image. You can specify index or it will assume
the currently active image.

.getIndex()
-----------

    | returns **Number**

Returns the current index.


.mousePosition( event )
-----------------------

    | returns **Object**

Helper method for getting the right ``x`` and ``y`` values from a mouse event,
relative to the galleria position. ``event`` is a jQuery mouseevent object.


.hasInfo( [index] )
-------------------

    | returns **Boolean**

Helper method for finding out if a gallery image has info (captions). You can
specify index or it will assume the currently active image. Example::

    $(document).bind('mousemove', this.proxy(function(e) {
        var pos = this.mousePosition(e);
        Galleria.log(pos.x, pos.y);
    }));