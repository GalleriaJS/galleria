***
FAQ
***

What browsers can I run Galleria in?
------------------------------------

**The short answer:** IE7+, FF3+, Opera 11+, Chrome 9+, Safar 4+ and Mobile Safari.

**The long answer:** The Galleria core is not very browser dependent. We use regular, linted JavaScript for most of our API and jQuery to even out browser differences in the DOM. However, themes might have different support tables, and sometimes they use progressive enhancement for visual details. All themes made by Galleria supports IE7+, Opera 11, Firefox 3+, Chrome 9+, Safari 4+ and Mobile Safari (iPad, iPhone, Android etc). IE6 is not supported by any theme at this point, but Galleria itself supports it so you can patch a theme yourself if you need IE6 compliance (we don’t really see the point though).


Wait a minute, what’s up with all the ”Buy now” stuff? I thought Galleria was free?
-----------------------------------------------------------------------------------

The Galleria core and one bundled theme (Classic) is released under the MIT license and is completely free to use and abuse. We like to keep it that way. However, nobody wants to see Galleria become yet another JavaScript component that drops out after the first beta, like so many jQuery-related products do. But in order to establish continuous growth and progress, we need fundings. Donations are always welcome, but unfortunately not enough to keep things running for us.

So the business model we decided to take was to keep Galleria 100% free but also develop Premium Themes and add-ons that we release under a commercial license. These themes are available for purchase on our site and they probably cost less than half of your hourly consulting fee rate. Purchasing themes is a great way to support the project and at the same time increase your portfolio of web design components.


I get a "Fatal Error" when I run Galleria
-----------------------------------------

Galleria throws errors when something is not right. Some errors are considered critical for Galleria to run properly, and when they occur Galleria stops and throws a "Fatal Error".
The most common error is that the path to the themes, images or scripts are wrong so please double check those and make sure you have the right permissions set.

Another common issue is that the gallery is hidden when it tries to initialize,
then it will fail to extract correct measurements. Make sure the gallery is visible or try the :doc:`/options/wait` option.

If you are experiencing other problems, you might want to optimize your gallery for better loading process.
Please read through :doc:`/reference/optimize` to get information of the best way to optimize your gallery.


The gallery does not work, instead I get a big list of images
-------------------------------------------------------------

This is probably because Galleria never gets initialized. Please make sure you are:

* targeting the correct element selector when calling Galleria
* including jQuery in your document
* including Galleria and not getting any error messages
* make sure the path to the scripts are correct and you have the right permissions
* calling Galleria after the images in the HTML source


Do you do custom themes for a fee?
----------------------------------

At the moment, not really. But you are welcome to throw us a request and we’ll see what we can do. It helps if you include your budget and design mockups / feature specs when contacting us.


Galleria runs much smoother in Chrome than in IE
------------------------------------------------

Being JavaScript based, the user experience can vary depending on browser and OS environment. Chrome is generally a really good browser with a fast JavaScript rendering engine, while IE and FF can be slower. We did optimize the product to work at it’s best in all environments, but the result can vary slightly.


What mobile strategy does Galleria have?
----------------------------------------

We do not currently develop specific themes for mobile devices since we have not yet seen a good web app for flicking through images that comes anywhere near the native experience. Instead, we focus on mobile compatibility in a web site context, meaning that the Galleria gallery works on mobile devices much the same way as they do on the desktop web. We also optimize our themes so the interaction is more precise when displayed on touch devices.

This direction might change very soon since there is a lot of things happening on the mobile web in a fast pace.


Can I use HTML captions?
------------------------

Yes you can, just use the data-title and data-description attributes on the IMG tag. Read more at :doc:`/references/data` for much more information about how to pass data to Galleria.


Do you have multi-license options for Premium themes?
-----------------------------------------------------

On the site you can only buy single-licenses, but we can do multi-license on request. Please email us at galleria@aino.se and explain your usage for a quote.