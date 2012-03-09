.. highlight:: javascript

****************
Creating a Theme
****************

If you'd like to create your own re-useable theme, Galleria provides a codex
for that too. Using the static function ``Galleria.addTheme( [theme object]
)``, you can add custom theme functionality and css to create your own custom
theme. A good way to start is to have a look at some of the free themes in the
Galleria package and see how it's done.


Creata a simple theme step by step
----------------------------------
1. create a directory in your galleria theme directory called 'my_theme'

2. create a new css file called galleria.my_theme.css. Save in the folder you
   just created.

3. create a new js file called galleria.my_theme.js and save in the same
   directory. Add the following example code:

::

    Galleria.addTheme({
        name: 'my theme',
        author: 'John Doe, http://example.com',
        version: 1,
        css: 'galleria.my_theme.css',
        defaults: {
            // add your own default options here
            transition: 'fade',
            imagecrop: true,

            // custom theme-specific options should begin with underscore:
            _my_color: 'yellow'
        },
        init: function(options) {

            /*
            The init function get's called when galleria is ready.
            You have access to all public methods and events in here
            this = gallery instance
            options = gallery options (including custom options)
            */

            // set the container's background to the theme-specific _my_color option:
            this.$('container').css('background-color', options._my_color);

            // bind a loader animation:
            this.bind('loadstart', function(e) {
                if (!e.cached) {
                    this.$('loader').show();
                }
            });
            this.bind('loadfinish', function(e) {
                this.$('loader').hide();
            });
        }
    });

4. Go back to the galleria.my_theme.css file and add some styles

5. Add images and modify the code until you are satisfied with the result.
   Feel free to use any free Galleria theme as a starting point.

After the theme is created you can use the theme when calling Galleria::

    Galleria.loadTheme('/path/to/themes/galleria.my_theme.js');
    Galleria.run('#galleria');


The theme object explained:
---------------------------
- **name** (String) is the name of the theme, f.ex 'classic'

- **author** (String) is the name of the author

- **version** (Number) is the current theme version

- **css** (String) is the CSS file used. The CSS file must be in the same
  folder as the theme js file

- **defaults** (Object) sets the default and/or custom options for the theme.

- **init** (Function) contains all theme-specific logic. The function takes one
  argument, options, and the this keyword is the gallery instance. The function
  gets called after the data is fetched and the gallery is fully prepared to
  run.

The ``init`` function in your theme has access to a number of helpers,
functions and events that you can use to customize your theme logic.