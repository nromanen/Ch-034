define(function(require) {
    "use strict";

    var Backbone = require("backbone");

    var View = Backbone.View.extend({
        testFunc: function() {
            console.log("test function");
        }
    });

    return View;
});