***********************
Galleria error messages
***********************

When Galleria run into problems, it will display errors in the gallery container.
Red are fatal, they will also stop the gallery script. Black are warnings.

Fatal errors will also throw an exception, causing all scripts to stop.

**Tip:** You can turn off all errors by setting :doc:`/options/debug` to false.
If debug is set to false, no errors will be displayed and no exceptions thrown. If a fatal error occurs,
a simple 'Gallery could not load.' will appear, but no other scripts will be affected.
We recommend to have debug on while developing, then turn it off on deploy.

Remember that the errors and warnings are designed to help you, not scare you away. They are simply a guide to why something is not working properly.
So please, don’t panic and hit the support the first thing you do if you get errors, just read through this document and other pages in the documentation
and go through necessary steps to debug the errors. Most times it is a small mistake somewhere that is easily corrected.

This document will explain some of the most common error messages, what might cause them and what you can do if they appear.


Theme CSS could not load
========================

    | Type: **Fatal**

This error message will appear if the browser could not load the CSS file attached to the theme when using loadTheme().
It will try for 10 seconds before displaying this error.

What you can do
---------------

1. Make sure that the CSS file is in the right path (inside the theme folder) and that it has the right permissions
2. Optimize your page and gallery to prevent slowish downloads of resources. Read more about Galleria optimization here: :doc:`/references/optimize`.
3. Load the CSS file manually instead, you can do this by simply adding a LINK stylesheet tag in the head with the theme CSS file.


Target not found
================

    | Type: **Fatal**

This error message will appear if the target element that you try to use as gallery could not be found.

What you can do
---------------

1. Double-check the jQuery selector when calling Galleria, and make sure that it is in the document.


You have reached the browser stylesheet limit (31)
==================================================

    | Type: **Fatal**

Internet Explorer has a stylesheet limit of 31. This error will appear if you reached that limit.

What you can do
---------------

1. Reduce the number of stylesheets used in the document. You can trick IE by using @import instead.


Init failed: Gallery instance already initialized
=================================================

    | Type: **Warning**

This warning will appear if you somehow managed to run the init function twice for the same instance.

What you can do
---------------

1. Go through your JavaScript logic and make sure that you are not doing anything fishy with the instance. Use only public methods and avoid custom constructors and other non-supported techniques.
2. Make sure you are not calling loadTheme() twice.


Init failed: No theme found
===========================

    | Type: **Fatal**

When the gallery initializes, the theme should already be loaded and ready.
But if it somehow is missing, this error will appear.


What you can do
---------------

1. Make sure you are using loadTheme() the right way
2. Post your issue at http://support.galleria.io for further assistance


Your page is in Quirks mode, Galleria may not render correctly. Please validate your HTML.
==========================================================================================

    | Type: **Warning**

This message appears in IE when it is in so called "Quirks Mode". This usually happens when you have the wrong doctype.
Galleria might still function in Quirks Mode, but there is a big chance that it will look/behave quirky.

What you can do
---------------

1. Add a doctype and validate your page HTML.


Could not extract a stage height from the CSS. Traced height: ...
=================================================================

    | Type: **Fatal**

After the gallery has initialized, it will make sure that the stage has sufficient height to continue the program.
It targets the stage, because this is a good way of making sure that the CSS is loaded and has applied.

It doesn’t really matter if you set width/height as options, because Galleria needs to extract *computed* measures.
That means that the gallery and its parents must be visible in some way, otherwise it will fail.

This message will appear if these requirements aren’t met within 5 seconds.

What you can do
---------------

1. Make sure that your gallery is visible so it can extract measures. If it is hidden in an accordion or inside a container with display: none, it will fail. You can try to set :doc:`/options/wait` to true if that is the case.
2. Double-check the path to the theme CSS and make sure it works properly.
3. If you have made a custom theme, make sure that the stage has a height.


Could not extract sufficient width/height of the gallery container. Traced measures: ...
========================================================================================

    | Type: **Fatal**

The gallery needs a global width & height of the container. It will try to extract them from the CSS or containing elements measures,
or from the width/height options.

If it fails to extract a width or height, this message will appear.

What you can do
---------------

1. Make sure that your gallery has a width and height. You can do that using CSS or by settings options.


Stage width or height is too small to show the gallery. Traced measures: ...
============================================================================

    | Type: **Fatal**

Again, this is another test that makes sure that the gallery has a width/height.
Unlike the previous errors, this is specific for the stage measures, not the container.

What you can do
---------------

1. If you have made a custom theme, make sure that the stage has a width and height in the CSS.
2. Follow the same instructions as for "Could not extract a stage height from the CSS" error.


Load failed: no data found.
===========================

    | Type: **Warning**

This message appears if the data array is empty after parsing the data.
It is a common message if you are using the Flickr or Picasa plugin and the plugin fails to load a set.

What you can do
---------------

1. If you are using the Flickr or Picasa plugin, double check the settings and make sure you are requesting public photos.
2. If you are using JSON data, double-check the array and make sure it is valid.
3. If you are using HTML, make sure that it is properly formatted.


Theme at [path] could not load, check theme path.
=================================================

    | Type: **Fatal**

If you are using the loadTheme() function, this error will appear if the theme script fails to load after 5 seconds.
This is somewhat common if you are working locally first and everything works, then when you upload to the server this error appears.
In those cases, the most common thing is that the script is not readable by the browser, so you need to adjust the file permissions on the server.

What you can do
---------------

1. Triple-check the theme path, also make sure that it is readable without a 403 error. You can do that easily by pointing the browser directly to the script.


Could not extract width/height from image: ...
==============================================

    | Type: **Warning**

Galleria loads the images and uses the width & height to calculate scaling and proportions.
If it for some reason can’t extract these measurements from the image, this warning will appear.

This was much more common in version 1.2.5, but we fixed a bug in 1.2.6 that made it appear for no reason.

What you can do
---------------

1. Make sure that the images are fully readable and that there is no fishy Apache-cache for images going on.
2. Make sure that the images are 100% valid and working.
3. Turn off any extensions, such as AdBlock, when debugging.
4. If you still get this warning, but everything seems to work fine, just turn off debug when deploying and it will be OK.


Image not found: [source]
=========================

    | Type: **Warning**

This error will be displayed if the image is not found after a couple of attempts.
It might be a 404 or something else that prevents the browser from reading the image.
You can define a :doc:`/options/dummy` image that should be shown instead if this happens.

What you can do
---------------

1. Double check the image path.
2. Make absolute sure that the image is fully readable, you can easily do that by pointing your browser directly to the image.


Could not scale image: [source]
===============================

    | Type: **Warning**

This happens if the script could not read a valid width and height for the image container.
Usually, this error happens when there is a problem with the gallery CSS, and it usually comes with other errors.

What you can do
---------------

1. Make sure that the theme CSS is in order.
2. Follow the same instructions as for "Could not extract a stage height from the CSS" error.
