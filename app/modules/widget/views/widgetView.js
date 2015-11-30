define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Widget = require("../model/widgetModel"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/widgetTemplate.html")),

        serialize: function() {
            if (typeof(this.model.HTML)==="object"){
                return {
                    widget: this.model.HTML.el
                };
            } else {
                return {
                    widget: this.model
                };

            }
        }
    });
    return View;
});