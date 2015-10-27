define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        Layout = require("backbone.layoutmanager"),
        
    CoreLayout = Backbone.Layout.extend({
        manage: true,

        convertToMonthAndDate: function (jsonDate) {
            var date = new Date(jsonDate);
            var options = {
                day: 'numeric',
                month: 'long'
            };
            return date.toLocaleString("ua", options);
        }

    });

    return CoreLayout;
}); 