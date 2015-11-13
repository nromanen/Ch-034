define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Widget = require("../model/widgetModel"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/widgetTemplate.html")),
        tagName: 'div',

        initialize: function() {
            this.render;
        },
        serialize: function() {
            return {
                widget: this.model
            };
        }
    });

    return View;
});