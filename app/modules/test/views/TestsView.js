define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        TestView = require("./TestView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testsTemplate.html")),
        el: ".tests",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            this.$el.html(this.template());
            this.$el.append(new PaginationView({collection: this.collection}).render());
            this.collection.each(this.renderOne, this);
        },

        renderOne: function(model) {
            this.$el.find('.test').append(new TestView({
                    model: model
                }).render());              
        }
        
    });

    return View;
});