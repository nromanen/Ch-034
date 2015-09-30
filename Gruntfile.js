module.exports = function(grunt ) {
    "use strict";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build'],

        jshint: {
            dev: {
              src: ['src/js/*']
            },
        },

        sass: {
            dist: {
              options: {
                style: 'compressed'
              },
              files: {
                'src/css/main.min.css': 'src/scss/index.scss',
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
                            'bootstrap/dist/js/bootstrap.min.js'
                        ], flatten: true, dest: 'src/libs/js/'
                    },

                    {
                        expand: true, cwd: 'bower_components/', src: 
                        [
                            'bootstrap/dist/css/bootstrap.min.css'
                        ], flatten: true, dest: 'src/libs/css/'
                    },

                    {
                        expand: true, cwd: 'bower_components/', src: 
                        [
                            'bootstrap/dist/fonts/*'
                        ], flatten: true, dest: 'src/libs/fonts/'
                    },
                ]
            },

            src: {
                files: [
                    {expand: true, src: ['src/index.html'], flatten: true, dest: 'build/'},
                    {expand: true, src: ['src/css/*'], flatten: true, dest: 'build/css/'},
                    {expand: true, cwd: 'src/', src: ['libs/**'], dest: 'build/'},
                ]
            }
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                root: 'src/',
                dest: 'build/',
                flow: {
                    steps: {
                        js: ['concat', 'uglify'],
                    },
                    post: {
                        js: [{
                            name: 'uglify',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    banner: '/*SoftServe ITA <%= pkg.name %> - v<%= pkg.version %> - ' +
                                            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                                    beautify: {
                                        ascii_only: true
                                    },
                                    compress: {
                                        hoist_funs: false,
                                        join_vars: true,
                                        loops: false,
                                        unused: true
                                  }
                                };
                            }
                        }]
                    }
                }
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
                files: ['src/js/**'],
                tasks: ['jshint:dev']
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


    grunt.registerTask('copy-bower', ['copy:libs']);
    grunt.registerTask('build:dev', ['jshint:dev', 'sass']);
    grunt.registerTask('serve', ['connect:dev', 'watch']);
    grunt.registerTask('build:prod', ['clean', 'jshint:dev', 'sass', 'copy:src', 'useminPrepare', 'concat:generated', 'uglify:generated', 'usemin']);
    grunt.registerTask('default', []);
    
};
