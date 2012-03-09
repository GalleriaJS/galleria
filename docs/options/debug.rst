=====
debug
=====

    | type: **Boolean**
    | default: *true*

This option is for turning debug on/off.
By default, Galleria displays errors by printing them out in the gallery container and sometimes throw exceptions.
For deployment you can turn debug off to generate a more generic error message if a fatal error is raised.

.. highlight:: javascript

Example::

    Galleria.configure({
        debug: false // debug is now off for deployment
    });