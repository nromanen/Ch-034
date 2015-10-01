module.exports = function(grunt ) {
    "use strict";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build'],

        jshint: {
            dev: {
              src: ['src/js/*', '!src/js/libs']
            },
        },

        sass: {
            dist: {
              options: {
                style: 'compressed'
              },
              files: {
                'src/assets/css/main.min.css': 'src/scss/index.scss',
              }
            }
        },

        copy: {
            libs: {
                files:
                [
                    {
                        expand: true, cwd: 'bower_components/', src: 
                        [
                            'jquery/dist/jquery.min.js', 
                            'underscore/underscore-min.js', 
                            'backbone/backbone-min.js', 
                            'bootstrap/dist/js/bootstrap.min.js',
                            '../node_modules/requirejs/require.js',
                            'requirejs-text/text.js'
                        ], flatten: true, dest: 'src/js/libs/'
                    },

                    {
                        expand: true, cwd: 'bower_components/', src: 
                        [
                            'bootstrap/dist/css/bootstrap.min.css'
                        ], flatten: true, dest: 'src/assets/css/'
                    },

                    {
                        expand: true, cwd: 'bower_components/', src: 
                        [
                            'bootstrap/dist/fonts/*'
                        ], flatten: true, dest: 'src/assets/fonts/'
                    }
                ]
            },

            src: {
                files: [
                    {expand: true, src: ['src/index.html'], flatten: true, dest: 'build/'},
                    {expand: true, src: ['src/assets/css/*'], flatten: true, dest: 'build/assets/css/'},
                    {expand: true, cwd: 'src/', src: ['js/libs/**'], dest: 'build/'},
                ]
            }
        },

        usemin: {
            html: ['build/index.html']
        },

        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: ['src/js/**', '!src/js/libs'],
                tasks: ['jshint:dev']
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/js",
                    mainConfigFile: "src/js/require-conf.js",
                    name: "app",
                    out: "build/js/main.js"
                }
            }
        },

        connect: {
            dev: {
              options: {
                livereload: true,
                port: 8034,
                base: 'src/'
              }
            }   
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    grunt.registerTask('copy-libs', ['copy:libs']);
    grunt.registerTask('build:dev', ['copy-libs', 'jshint:dev', 'sass']);
    grunt.registerTask('serve', ['connect:dev', 'watch']);
    grunt.registerTask('build:prod', ['clean', 'jshint:dev', 'sass', 'copy:src', 'requirejs:compile']);
    grunt.registerTask('default', []);
    
};
