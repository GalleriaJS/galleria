===
DOM
===

Galleria builds a rich DOM structure for each Gallery. You can access them in the Theme API using ``this.get( ID )`` or ``this.$( IDs )``. Read more about DOM manipulation in the Theme API.

List of elements
================
Here is a list of each element in the default Galleria DOM and their layout::

    container
        stage
            images
            loader
            counter
            image-nav
                image-nav-right
                image-nav-left
            thumbnails-container
                thumb-nav-left
                thumbnails-list
                    thumbnails
                thumb-nav-right
            info
                info-text
                    info-title
                    info-description
                    info-author


HTML structure
==============

The HTML structure is built with a ``galleria-`` prefix to all classes to ensure CSS encapsulation. The class ``.carousel`` is added to ``thumbnails-container``  if a carousel is present. The ``.disabled`` class is added to ``thumb-nav-left`` and ``thumb-nav-right`` if you are at the end/start of the carousel.

This presentation of the Galleria HTML structure is good to have when building CSS for your custom theme::

    <div class="galleria-container">
        <div class="galleria-stage">
            <div class="galleria-images">
                <div class="galleria-image">
                    <img>
                </div>
                <div class="galleria-image">
                    <img>
                </div>
            </div>
            <div class="galleria-loader"></div>
            <div class="galleria-counter">
                <span class="current"></span>
                <span class="total"></span>
            </div>
            <div class="galleria-image-nav">
                <div class="galleria-image-right-nav"></div>
                <div class="galleria-image-left-nav"></div>
            </div>
        </div>
        <div class="galleria-thumbnails-container [ carousel ]">
            <div class="galleria-thumb-nav-left [ disabled ]"></div>
            <div class="galleria-thumbnails-list">
                <div class="galleria-thumbnails">
                    <div class="galleria-image">
                        <img>
                    </div>
                    [...]
                </div>
            </div>
            <div class="galleria-thumb-nav-right [ disabled ]"></div>
        </div>
        <div class="galleria-info">
            <div class="galleria-info-text">
                <div class="galleria-info-title"></div>
                <div class="galleria-info-description"></div>
                <div class="galleria-info-author"></div>
            </div>
        </div>
    </div>