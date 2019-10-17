module.exports = function (grunt) {
    "use strict";

    var assets  = require('postcss-assets');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\n' +
        ' * Galleria - v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) 2010 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * Licensed under the <%= pkg.license %> License.\n' +
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
                }
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\/libs\/galleria\/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}\//g,
                            replacement: '\/libs/galleria/<%= pkg.version %>/'
                        }
                    ],
                    usePrefix: false,
                },
                files: [{
                    expand: true,
                    src: ['src/themes/*/demo-cdn.html', 'README.rst']
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.html', '**/*.js'],
                    dest: 'dist'
                }]
            }
        }

    });

    var themes = ['azur', 'folio', 'fullscreen', 'miniml', 'twelve', 'classic'];
    themes.forEach(function(name) {

        grunt.config(['uglify', name], {
            options: {
                banner: '<%= banner %>'
            },

            files: [{
                src: 'src/themes/' + name + '/galleria.' + name + '.js',
                dest: 'dist/themes/' + name + '/galleria.' + name + '.min.js'
            }]
        });

        grunt.config(['postcss', name], {
            options: {
                processors: [
                    assets()
                ]
            },
            files: [{
                src: 'src/themes/' + name + '/galleria-inline.' + name + '.css',
                dest: 'dist/themes/' + name + '/galleria.' + name + '.css'
            }]
        });

        grunt.config(['cssmin', name], {
            files: [{
                src: 'dist/themes/' + name + '/galleria.' + name + '.css',
                dest: 'dist/themes/' + name + '/galleria.' + name + '.min.css'
            }]
        });

    });

    grunt.config(['replace', 'inline'], {
        options: {
            patterns: [
                {
                    match: 'url(',
                    replacement: 'inline('
                }
            ],
            usePrefix: false,
        },
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['themes/*/galleria.*.css'],
            dest: 'src/',
            rename: function(destBase, destPath) {
                return destBase+destPath.replace('galleria.', 'galleria-inline.');
            }
        }]
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'replace', 'uglify', 'postcss', 'cssmin', 'copy']);

};
