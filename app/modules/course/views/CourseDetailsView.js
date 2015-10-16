define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        },

        serialize: function() {
            return { course: this.model };
        }

    });

    return View;
});