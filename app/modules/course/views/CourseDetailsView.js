define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = Backbone.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),

        el: ".main-container",

        initialize: function() {
            this.listenTo(this.model, "fetch reset sync", this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return View;
});