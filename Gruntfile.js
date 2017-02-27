module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\n' +
        ' * Galleria - v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) 2010 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * Licensed under the <%= pkg.license %> License.\n' +
        ' * https://raw.github.com/worseisbetter/galleria/master/LICENSE\n' +
        ' *\n' +
        ' */\n\n',

        clean: {
            files: ['dist']
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js'],
                    'dist/plugins/flickr/<%= pkg.name %>.flickr.min.js': ['src/plugins/flickr/<%= pkg.name %>.flickr.js'],
                    'dist/plugins/history/<%= pkg.name %>.history.min.js': ['src/plugins/history/<%= pkg.name %>.history.js'],
                    'dist/plugins/picasa/<%= pkg.name %>.picasa.min.js': ['src/plugins/picasa/<%= pkg.name %>.picasa.js'],
                    'dist/themes/classic/<%= pkg.name %>.classic.min.js': ['src/themes/classic/<%= pkg.name %>.classic.js']
                    }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'dist/themes/classic/<%= pkg.name %>.classic.min.css': ['src/themes/classic/<%= pkg.name %>.classic.css'],
                    'dist/themes/fullscreen/<%= pkg.name %>.fullscreen.min.css': ['src/themes/fullscreen/<%= pkg.name %>.fullscreen.css']
                }
            }
        },

        replace: {
            dist: {
                src: ['src/themes/classic/classic-demo-cdn.html', 'src/themes/classic/fullscreen-demo-cdn.html', 'README.rst'],
                overwrite: true,
                replacements: [{
                    from: /\/libs\/galleria\/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}\//g,
                    to: '\/libs/galleria/<%= pkg.version %>/'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*'],
                    dest: 'dist'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'replace', 'copy']);

};
