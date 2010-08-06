======
SlideShowPro Plugin
======

Galleria comes with a SSP plugin that can be used to fetch images from a SlideShowPro gallery and display them in your Galleria gallery.

Example usage
=============

**note:** You must include the SSP plugin script at ``src/plugins/galleria.ssp.js`` to use this plugin.

The plugin is very simple, just call the Galleria.SSP constructor with the XML file location and the plugin will return a formated galleria data object using YQL::

    var xml_file = 'http://domain.com/gallery.xml'
    var ssp = new Galleria.SSP(xml_file); // initialize the plugin

    ssp.getAlbum(0, function(data) {
        $('#galleria').galleria({
            data_source: data
        });
    });

Public methods
==============

.getAlbum( album_index, callback )
----------------------

    | returns **Galleria.SSP**

Grabs album data from the XML. If you have more than one album you can change the index. 0 is the first album. The callback has one argument - the converted Galleria data object. See example above for usage.