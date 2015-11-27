require.config({
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery'                  : '../vendor/bower/jquery/dist/jquery.min',
        'rangy'                   : '../vendor/bower/wysihtml5x/lib/rangy/rangy-core',
        'jquery-serialize-object' : '../vendor/bower/jquery-serialize-object/dist/jquery.serialize-object.min',
        'lodash'                  : '../vendor/bower/lodash/lodash.min',
        'backbone'                : '../vendor/bower/backbone/backbone-min',
        'bootstrap'               : '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text'                    : '../vendor/bower/requirejs-text/text',
        'backbone.layoutmanager'  : '../vendor/bower/layoutmanager/backbone.layoutmanager',
        'backbone.localStorage'   : '../vendor/bower/backbone.localStorage/backbone.localStorage-min',
        'backbone.validation'     : '../vendor/bower/backbone.validation/dist/backbone-validation-amd-min',
        'moment'                  : '../vendor/bower/moment/moment',
        'uk-locale'               : '../vendor/bower/moment/locale/uk',
        'bootstrap.wysihtml5'     : '../vendor/bower/bootstrap3-wysihtml5-bower/dist/amd/bootstrap3-wysihtml5.all',
        'bootstrap.wysihtml5.ua-UA': '../vendor/bower/bootstrap3-wysihtml5-bower/dist/locales/bootstrap-wysihtml5.ua-UA',
        'CMS'                     : './app'
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
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
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
