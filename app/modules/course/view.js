define(function(require, exports, module) {
    "use strict";

    var List = require("./list/view");
    var Pagination = require("./pagination/view");

    var Layout = Backbone.View.extend({

        el: ".courses",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            this.$el.html(""); 
            this.$el.append(new List({collection: this.collection}).render().el);
            this.$el.append(new Pagination({collection: this.collection}).render());
        },
        
    });

    module.exports = Layout;
});