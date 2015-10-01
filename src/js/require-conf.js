require.config({
    baseUrl: 'js/',
    paths: {        
        'jquery': 'libs/jquery.min',
        'underscore': 'libs/underscore-min',
        'backbone': 'libs/backbone-min',
        'bootstrap': 'libs/bootstrap.min',
        'text': 'libs/text',
    },

    shim: {


        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'bootstrap': {
            deps: ['jquery']
        },

    }

});
