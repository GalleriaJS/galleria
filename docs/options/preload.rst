=======
preload
=======

    | type: **String** or **Number**
    | default: **2**

Defines how many images Galleria should preload in advance.
Please note that this only applies when you are using separate thumbnail files.
Galleria always cache all preloaded images.

- **2** preloads the next 2 images in line
- **'all'** forces Galleria to start preloading all images. This may slow down client.
- **0** will not preload any images