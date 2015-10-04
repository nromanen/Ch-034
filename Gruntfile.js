/*global module, require*/

(function () {
    "use strict";
    var LIVERELOAD_PORT = 35729;
    var SERVER_PORT = 9000;
    var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    module.exports = function (grunt) {

        var proxySnippet = require("grunt-connect-proxy/lib/utils.js").proxyRequest;

        // load all grunt tasks
        require('load-grunt-tasks')(grunt);

        grunt.initConfig({
            watch: {
                options: {
                    nospawn: true,
                    livereload: true
                },
                compass: {
                    files: ['app/styles/scss/{,*/}*.{scss}'],
                    tasks: ['compass']
                },
                livereload: {
                    options: {
                        livereload: LIVERELOAD_PORT
                    },
                    files: [
                        'app/{,*/}*.css',
                        'app/{,*/}*.js',
                        'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        'app/scripts/templates/{,*/}*.ejs'
                    ]
                },
                jst: {
                    files: [
                        'app/scripts/templates/{,*/}*.ejs'
                    ],
                    tasks: ['jst']
                }
            },
            connect: {
                options: {
                    port: SERVER_PORT,
                    hostname: '0.0.0.0'
                },
                livereload: {
                    options: {
                        middleware: function (connect) {
                            return [
                                lrSnippet,
                                mountFolder(connect, 'app'),
                                proxySnippet
                            ];
                        }
                    }
                }
                dist: {
                    options: {
                        middleware: function (connect) {
                            return [
                                mountFolder(connect, 'dist')
                            ];
                        }
                    }
                }
            },
            open: {
                server: {
                    path: 'http://localhost:<%= connect.options.port %>'
                }
            },
            clean: {
                dist: ['dist/*'],
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        'app/scripts/{,*/}*.js',
                        '!vendor/*',
                        'test/spec/{,*/}*.js'
                    ],
                    filter: function( filepath ) {
                        var index, file = grunt.option( 'file' );
                        // Don't filter when no target file is specified
                        if ( !file ) {
                            return true;
                        }

                        // Normalize filepath for Windows
                        filepath = filepath.replace( /\\/g, '/' );
                        index = filepath.lastIndexOf( '/' + file );

                        // Match only the filename passed from cli
                        if ( filepath === file || ( -1 !== index && index === filepath.length - ( file.length + 1 ) ) ) {
                            return true;
                        }

                        return false;
                    }
                }
            },
            compass: {
                options: {
                    sassDir: 'app/styles/scss',
                    cssDir: 'app/styles',
                    imagesDir: 'app/images',
                    javascriptsDir: 'app/modules/',
                    importPath: 'bower_components',
                    relativeAssets: true
                },
                dist: {},
                server: {
                    options: {
                        debugInfo: true
                    }
                }
            },
            useminPrepare: {
                html: 'index.html',
                options: {
                    dest: 'dist'
                }
            },
            usemin: {
                html: ['dist/{,*/}*.html'],
                css: ['dist/styles/{,*/}*.css'],
                options: {
                    dirs: ['dist']
                }
            },
            imagemin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'app/images',
                        src: '{,*/}*.{png,jpg,jpeg,svg}',
                        dest: 'dist/app/images'
                    }]
                }
            }
        });

        grunt.registerTask('server', function (target) {
            if (target === 'dist') {
                return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
            }



            grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'compass:server',
                'configureProxies:localhost',
                'connect:livereload',
                'open',
                'watch'
            ]);
        });


        grunt.registerTask('build', [
            'clean:dist',
            'compass:dist',
            'useminPrepare',
            'imagemin',
            'htmlmin',
            'concat',
            'cssmin',
            'uglify',
            'copy:dist',
            'usemin'
        ]);

        grunt.registerTask('default', [
            'jshint',
            'test',
            'build'
        ]);
    };
})();
