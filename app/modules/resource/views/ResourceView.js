define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/resourceTemplate.html")),
        el: false,
        initialize: function(options) {
            this.listenTo(this.model, "reset sync request", this.render);
        },

        serialize: function() {
            return {
                resource: this.model
            };
        }

    });
    return View;
});