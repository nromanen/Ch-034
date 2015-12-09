require.config({
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery'                  : '../vendor/bower/jquery/dist/jquery.min',
        'jquery-serialize-object' : '../vendor/bower/jquery-serialize-object/dist/jquery.serialize-object.min',
        'lodash'                  : '../vendor/bower/lodash/lodash.min',
        'backbone'                : '../vendor/bower/backbone/backbone-min',
        'bootstrap'               : '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text'                    : '../vendor/bower/requirejs-text/text',
        'backbone.layoutmanager'  : '../vendor/bower/layoutmanager/backbone.layoutmanager',
        'backbone.localStorage'   : '../vendor/bower/backbone.localStorage/backbone.localStorage-min',
        'backbone.validation'     : '../vendor/bower/backbone.validation/dist/backbone-validation-amd-min',
        'moment'                  : '../vendor/bower/moment/moment',
        'bootstrapdatetimepicker' : '../vendor/bower/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'uk-locale'               : '../vendor/bower/moment/locale/uk',
        'ckeditor-jquery'         :'../vendor/bower/ckeditor/adapters/jquery',
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
        'ckeditor-jquery':{
            deps:['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery-serialize-object': {
            deps: ['jquery']
        },
        'bootstrapdatetimepicker': {
            deps: ['jquery', 'bootstrap']
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
