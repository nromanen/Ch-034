define(function(require) {
    "use strict";

    var Backbone = require("backbone");

    var Model = Backbone.Model.extend({
        testFunc: function() {
            console.log("test function");
        }
    });

    return Model;
});