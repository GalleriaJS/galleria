============
theme
============

    | type: **String**
    | default: **undefined**

The theme that should be used for this gallery.

If undefined, this will default to the most recently loaded theme.

The name should be in the same format as the theme's css/js files: 'galleria.themename'

.. highlight:: html

Example::

    <script>
    Galleria.loadTheme('themes/classic/galleria.classic.js');
    $('#galleria').galleria({
        theme: 'galleria.classic'
    });
    </script>
