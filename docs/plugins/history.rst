.. highlight:: javascript

**************
History Plugin
**************

The Galleria History plugin is a simple extension to create Galleria add hash tags for permalinks and back button functionality enabled.
This is useful on fullscreen views and other use cases. The plugin simply adds a #/[id] hash to the URL and then applies the necessary code for all browsers to enable the back button.
It also makes permalinks possible by simply bookmarking f.ex http://mygalleria.com/#/4 and the user will be shown the 5th image in the gasllery (index starts at 0).

Browser support includes Firefox 2+, IE6+, Opera and Chrome.

You only need to include the plugin as a script, the rest is taken care of by Galleria.

How to install the plugin
=========================

Just include it in the head as a script tag, f.ex::

    <script src="plugins/galleria.history.min.js"></script>

