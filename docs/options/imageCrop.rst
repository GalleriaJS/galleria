=========
imageCrop
=========

    | type: **Boolean** or **String**
    | default: **false**

Defines how the main image will be cropped inside it’s container.

- **true** means that all images will be scaled to fill the stage, centered and cropped.
- **false** will scale down so the entire image fits.
- **'height'** will scale the image to fill the height of the stage.
- **'width'** will scale the image to fill the width of the stage.
- **'landscape'** will fill up images that has landscape proportions, but scale portrait images to fit inside the container.
- **'portrait'** is like 'landscape' but the other way around.