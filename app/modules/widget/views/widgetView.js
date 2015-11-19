define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Widget = require("../model/widgetModel"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/widgetTemplate.html")),

        serialize: function() {
            //console.log(this.model.HTML)
            if (typeof(this.model.HTML)==="object"){
                console.log("object!")
                console.log(this.model.HTML.el)
                return {
                    widget: this.model.HTML.el
                };
            } else {
                console.log("string!")
                return {
                    widget: this.model
                };

            }
        }
    });
    console.log("View" + View)
    return View;
});