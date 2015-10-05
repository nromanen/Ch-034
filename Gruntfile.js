module.exports = function(grunt ) {
    "use strict";
    
    var serveStatic = require('serve-static');
    var connect = require('connect');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build'],

        jshint: {
            dev: {
              src: ['app/scripts/*']
            },
        },

        sass: {
            dev: {
              options: {
                style: 'compressed'
              },
              files: {
                'app/assets/css/main.min.css': 'app/scss/index.scss',
              }
            },

            prod: {
              options: {
                style: 'compressed'
              },
              files: {
                'build/assets/css/main.min.css': 'app/scss/index.scss',
              }
            }

        },

        copy: {
            html: {
                files: [
                    {expand: true, src: ['app/index.html'], flatten: true, dest: 'build/'},
                ]
            }
        },

        bowercopy: {
            css: {
                options: {
                    destPrefix: 'build/assets/css'
                },
                files: {
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
                }
            },
            fonts: {
                options: {
                    destPrefix: 'build/assets/'
                },
                files: {
                    'build/assets/fonts': 'bootstrap/dist/fonts'
                }
            }

        },

        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: ['app/**', '!app/assets/css/*', 'build/**'],
                tasks: ['jshint:dev', 'sass']
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/scripts",
                    include: ['main'],
                    insertRequire: ['main'],
                    mainConfigFile: "app/scripts/config.js",
                    name: "../../vendor/bower/almond/almond",
                    out: "build/scripts/main.js"
                }
            }
        },

        processhtml: {
            dist: {
                files: {
                    'build/index.html': ['app/index.html']
                }
            }
        },

        connect: {
            dev: {
              options: {
                livereload: true,
                port: 8034,
                //base: 'app',
                middleware: function(connect) {
                    return [
                        serveStatic('.tmp'),
                        connect().use(
                            '/vendor/bower',
                            serveStatic('./vendor/bower')
                        ),
                        serveStatic('app')
                    ]
                }
              }
            },

            prod: {
              options: {
                livereload: true,
                port: 8034,
                //base: 'app',
                middleware: function(connect) {
                    return [
                        serveStatic('build')
                    ]
                }
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    
    grunt.registerTask('copy-libs', ['copy:libs']);
    grunt.registerTask('build:dev', ['jshint:dev', 'sass']);
    grunt.registerTask('serve', ['connect:dev', 'watch']);
    grunt.registerTask('serve:prod', ['connect:prod', 'watch']);
    grunt.registerTask('build:prod', ['clean', 'jshint:dev', 'sass:prod', 'bowercopy', 'processhtml', 'requirejs:compile']);
    grunt.registerTask('default', []);
    
};
