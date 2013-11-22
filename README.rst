********
Galleria
********

**Responsive JavaScript Image Gallery**

This is the open source repository for the Galleria core, the Classic theme, plugins and everything else that comes bundled with the free download.
Feel free to post issues - but keep them code related please. You may also do pull requests, but make sure you include some comments and/or tests.

Info, demos, docs and everything else: http://galleria.io

Updates via twitter: http://twitter.com/galleriajs

Non-code related issues and support: http://support.galleria.io

Documentation
=============

Documentation is currently available in `reST
<http://en.wikipedia.org/wiki/ReStructuredText>`_ format in the repository.

You can build local HTML using Sphinx: http://sphinx.pocoo.org/


Changes compared to original (aino) version of galleria
=======================================================

* Sometimes, the dummy image was not scaled and centered properly when using lazyLoadChunked().
  This was due to the dimensions of the dummy image not being computed in time (with lazyLoadChunked(...)).
  We changed the retry method from "retry once after 2ms" to "Utils.wait{ ..., timeout: 100 }" to retry multiple times
  for 100ms.

* Experimental "ondemand"-loading of thumbnails. The option `thumbnails: 'ondemand'` can be set in order to load thumbnails
  when needed:

  * Thumbnails that are in the visible range of the thumbnails-view are loaded
  * Thumbnails, that are adjacent to the visible range (one carousel-width before or after) are loaded.
  * As the carousel moves, more thumbnails are loaded.


