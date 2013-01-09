========
autoplay
========

    | type: **Boolean** or **Number**
    | default: **false**

If ``true``, this will start playing the slideshow with 5 seconds interval (default).
If you set this to any number, f.ex 4000, it will start playing with that interval (in milliseconds)

.. highlight:: javascript

Example::

    Galleria.run('#galleria', {
        autoplay: 7000 // will move forward every 7 seconds
    });