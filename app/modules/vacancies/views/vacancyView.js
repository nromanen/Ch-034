define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/vacancyTemplate.html")),

        el: false,

        serialize: function() {
            return {
                model: this.model
            };
        },
        initialize: function() {
        }
    });
    return View;
});