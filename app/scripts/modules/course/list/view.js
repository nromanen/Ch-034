define(function(require, exports, module) {
    "use strict";

    var Item = require("../item/view");

    var Layout = Backbone.View.extend({

        el: ".courses",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            console.log("fetched");
            this.$el.html("");
            this.collection.each(function(course) {
                this.$el.append(new Item({
                    model: course
                }).render());
            }, this);
            console.log(this.$el);
        }

        
    });

    module.exports = Layout;
});