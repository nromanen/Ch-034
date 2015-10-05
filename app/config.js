require.config({
    baseUrl: '/',
    paths: {        
        'jquery': '../vendor/bower/jquery/dist/jquery.min',
        'underscore': '../vendor/bower/lodash/lodash.min',
        'backbone': '../vendor/bower/backbone/backbone-min',
        'bootstrap': '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text': '../vendor/bower/requirejs-text/text',
    },

    shim: {

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'bootstrap': {
            deps: ['jquery']
        },

    },

    deps: ['main']

});
