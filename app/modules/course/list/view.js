define(function(require, exports, module) {
    "use strict";

    var Item = require("../item/view");

    var Layout = Backbone.View.extend({

        tagName: "div",

        className: "row",

        render: function() {
            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(model) {
            this.$el.append(new Item({
                model: model
            }).render());
        },
        
    });

    module.exports = Layout;
});