require.config({
    baseUrl: '/',
    paths: {
        'jquery'                  : '../vendor/bower/jquery/dist/jquery.min',
        'jquery-serialize-object' : '../vendor/bower/jquery-serialize-object/dist/jquery.serialize-object.min',
        'lodash'                  : '../vendor/bower/lodash/lodash.min',
        'backbone'                : '../vendor/bower/backbone/backbone-min',
        'bootstrap'               : '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text'                    : '../vendor/bower/requirejs-text/text',
        'CMS'                     : './app',
        'backbone.layoutmanager'  : '../vendor/bower/layoutmanager/backbone.layoutmanager',
        'backbone.localStorage'   : '../vendor/bower/backbone.localStorage/backbone.localStorage-min',
        'backbone.validation'     : '../vendor/bower/backbone.validation/dist/backbone-validation-amd-min',
        "moment"                  : "../vendor/bower/moment/moment",
        "uk-locale"               : "../vendor/bower/moment/locale/uk"
    },

    map: {
        "*": {
            "underscore": "lodash"
        }
    },

    shim: {
        'lodash': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery-serialize-object': {
            deps: ['jquery']
        },
        'backboneValidation' : {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    },

    deps: ['main'],

    config: {
        moment: {
            noGlobal: true
        }
    }

});
