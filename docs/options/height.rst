======
height
======

    | type: **Number**
    | default: **0**

Galleria need a height to work properly. You can set the height using this option to make sure it has the correct height.
If no height is set, Galleria will try to find the height of the parent container.

You can set an exact value, f.ex 200, and it will apply this exact height in pixels.
You can also set a relative ratio value which is anything below 2.
If you set a relative ratio value, the gallery height will be calculated by
multiplying this value with the width at any given scaling process.

This is very useful when programming responsive layouts.

Setting a fixed height example::

    Galleria.run('#galleria', {
        height: 400
    });

Setting a relative height (16/9 ratio) example::

    Galleria.run('#galleria', {
        height: 0.5625
    });

