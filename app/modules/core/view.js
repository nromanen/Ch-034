define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        Layout = require("backbone.layoutmanager"),
        
    CoreLayout = Backbone.Layout.extend({
        manage: true
    });

    return CoreLayout;
});