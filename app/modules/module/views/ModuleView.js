define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/moduleTemplate.html")),

        el: "#page-container",

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON() ));
            return this;
        }
    });

    return View;
});    