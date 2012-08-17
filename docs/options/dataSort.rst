========
dataSort
========

    | type: **Function** or **String**
    | default: **false**

Function to sort the data before using it.
You can use it the same way you would use `Array.sort() <https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort>`_.

.. highlight:: javascript

::

    Galleria.configure({
        dataSort: function(a, b) {
            // the sorting algorithm
        }
    });


If you want to sort the images in a random order, you can set this to **'random'**.