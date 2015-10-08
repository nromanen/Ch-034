require.config({
    baseUrl: '/',
    paths: {        
        'jquery': '../vendor/bower/jquery/dist/jquery.min',
        'lodash': '../vendor/bower/lodash/lodash.min',
        'backbone': '../vendor/bower/backbone/backbone-min',
        'bootstrap': '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text': '../vendor/bower/requirejs-text/text',
        'CMS': './app'
    },

    shim: {

        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        'bootstrap': {
            deps: ['jquery']
        },

    },
    
    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    deps: ['main']

});
