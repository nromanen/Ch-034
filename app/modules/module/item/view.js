define(function(require, exports, module) {
    "use strict";

    var Module = require("./model");

    var ModuleItemView = Backbone.View.extend({

        template: _.template(require("text!./template.html")),

        el: "#module-container",

        initialize: function() {
            console.log(this.model);
            this.listenTo(this.model, "reset sync", this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON() ));
            return this;
        }
    });

    module.exports = ModuleItemView;
});