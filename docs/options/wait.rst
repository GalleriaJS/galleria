====
wait
====

    | type: **Number** or **Boolean**
    | default: **5000**

Sets how long Galleria should wait when trying to extract measurements, before throwing an error.
Set this to **true** for infinity.

More information about how Galleria initializes:
------------------------------------------------

When Galleria initializes, it needs to be able to take measures of the layout. Setting width and height is not enough,
it also need to be able to extract computed values, and that can only be done if the gallery is "visible".

This can be a problem if you are running galleries in a javascript accordion or pagination, where you hide some parts of the content.
Then Galleria will fail to load on all hidden "pages".

This little option allows you to define how long Galleria will try to extract these measurements. Default is 5 seconds, but
you can also set this to **true** and let the Gallery wait for an infinity, or until the gallery is shown by user interaction.

As soon as the Gallery can grab the right measurements, it will appear.