define(function(require) {
    "use strict";

    var Backbone = require("backbone");

    var Collection = Backbone.Collection.extend({
        testFunc: function() {
            console.log("test function");
        }
    });

    return Collection;
});