=====
debug
=====

    | type: **Boolean**
    | default: *false*

This option is for turning debug on/off. 
By default, Galleria fails most errors silently, but in development mode you should turn debug on to throw errors when something is not right.

If your gallery fails to load, turning debug to ``true`` is the first thing you should do.


Example::

    $('#galleria').galleria({
        debug: true // debug is now on
     });