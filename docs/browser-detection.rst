=====================
Broswer detection
=====================

These static variables are mainly used to detect browsers.

Example usage:
..............

::

    <script>
    if (Galleria.OPERA) {
        Galleria.log('you are using opera!');
    }
    </script>

List of static variables:
=========================

Galleria.IE
-----------
Detects IE6+ using object detection.

Galleria.IE6
------------
Detects IE6 using object detection.

Galleria.IE7
------------
Detects IE7 using object detection.

Galleria.IE8
------------
Detects IE8 using object detection.

Galleria.IE9
------------
Detects IE9 using object detection.

Galleria.WEBKIT
------------
Detects webkit using browser sniffing.

Galleria.SAFARI
------------
Detects safari using browser sniffing.

Galleria.CHROME
------------
Detects chrome using browser sniffing.

Galleria.OPERA
------------
Detects opera using object detection.

Galleria.MAC
------------
Detects macintosh platform using navigator.platform sniffing.

Galleria.QUIRK
------------
Detects quirkcs mode using object detection.

Galleria.IPHONE
------------
Detects iphone using browser sniffing.

Galleria.IPAD
------------
Detects ipad using browser sniffing.

Galleria.ANDROID
------------
Detects android using browser sniffing.

Galleria.TOUCH
------------
Detects touch devices using browser sniffing.