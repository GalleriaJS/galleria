=========
idleMode
=========

    | type: **Boolean** or **String**
    | default: **true**

Global option for turning on/off idle mode.

Each gallery enters idle mode after certain amount of time and themes behave differently when this happens, f.ex clears the stage from distractions.
If you want to prevent idle mode from ever happening, set this to false.

New in 1.2.8: you can also set this to 'hover', this will make idleMode happen as soon as the user moves the mouse outside the gallery container,
and then activate it again when the mouse enters the gallery.