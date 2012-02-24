============
theme
============

    | type: **String**
    | default: **undefined**

The theme that should be used for this gallery.

If undefined, this will default to the most recently loaded theme.

The name should be in the same format as the theme's css/js files: 'galleria.themename'.

The theme must be loaded (either before or after) by calling 'Galleria.loadTheme'.

.. highlight:: html

Example::

    <script>
    Galleria.loadTheme('themes/classic/galleria.classic.js');
    $('#galleria').galleria({
        theme: 'galleria.classic'
    });
    </script>

Alternatively, it is possible to simply call 'loadTheme' directly before the gallery is initialized::

    <script>
    Galleria.loadTheme('themes/classic/galleria.classic.js');
    $('#galleria-one').galleria(); // Will have the 'classic' theme

    Galleria.loadTheme('themes/twelve/galleria.twelve.js');
    $('#galleria-two').galleria(); // Will have the 'Twelve' theme
    </script>
