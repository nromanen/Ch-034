define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CourseView = require("./CourseView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/coursesTemplate.html")),
        el: false,

        initialize: function() {
            //this.listenTo(this.collection, "reset sync request", this.render);
            this.collection.on("fetch", function() {
                console.log("fetch");
                this.html("SPIIIIIINNNNNNERRR");
            }, this);
        },

        serialize: function() {
            return { courses: this.collection };
        },

        beforeRender: function() {
            console.log("turn");
            this.collection.each(this.renderOne, this);
            this.insertView("nav", new PaginationView({
                collection: this.collection
            }));
            
        },

        renderOne: function(model) {
            this.insertView(".courses", new CourseView({
                model: model
            }));
        }
        
    });

    return View;
});