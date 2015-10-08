define(function(require, extend, module) {
    "use strict";

    var Backbone = require('backbone');

    var app = require("app");

    var Model = Backbone.Model.extend({

        defaults: {
            id: "00000000",
            courseId: "00000000",
            title: "",
            description: "",
            video: ""
        },

        url: function() {
            return app.api + 'modules/1';
        }

    });

    module.exports = Model;
});