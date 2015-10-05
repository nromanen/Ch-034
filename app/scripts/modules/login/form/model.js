define(function(require, extend, module) {
    "use strict";

    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({

        defaults: {
            email: "default",
            password: "default"
        }

    });

    module.exports = Model;
});