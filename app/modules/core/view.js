define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        Layout = require("backbone.layoutmanager"),
        moment = require("moment"),
        uklocale = require("uk-locale"),

    CoreLayout = Backbone.Layout.extend({
        manage: true,

        convertToMonthAndDate: function (jsonDate) {
            return moment(jsonDate).locale('uklocale').format('DD MMMM');
        }
    });
    return CoreLayout;
});
