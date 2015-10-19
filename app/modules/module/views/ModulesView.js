define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
    ModuleView = require("./ModuleView"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/modulesTemplate.html")),

        el: "#page-container",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            this.$el.html(this.template());

 //           this.collection.each(this.renderOne, this);
/*        },

        renderOne: function(model) {
            this.$el.append(this.template({
                model: model
            }).render());*/
        }
    
/*        render: function() {
            this.$el.html("");
            this.collection.each(this.renderOne, this);
            this.$el.append(new PaginationView({collection: this.collection}).render());
        },

        renderOne: function(model) {
            this.$el.append(new CourseView({
                model: model
            }).render());
        }*/
        
    });

    return View;

});