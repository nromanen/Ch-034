define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Widget = require("../model/widgetModel"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/widgetTemplate.html")),

        serialize: function() {
            return {
                widget: this.model
            };
        }
    });

    return View;
});