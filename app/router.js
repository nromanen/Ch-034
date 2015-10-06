define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var Login = require("modules/login/index");
    var Course = require("modules/course/index");
    //require("bootstrap");

    var Backbone = require("backbone");

    var Router = Backbone.Router.extend({
        initialize: function() {
            
            
            
            var MainLayout = Backbone.View.extend({
                el: "body",
                template: _.template(require('text!./templates/main.html')),

                render: function() {
                    this.$el.prepend(this.template);
                }
            });
            this.container = new MainLayout();
            this.container.render();

        },

        routes: {
            "": "index",
            "courses(/:pageNumber)": "courses"
        },

        index: function() {
        },

        courses: function(pageNumber) {
            this.courses = new Course.Collection(pageNumber);
            console.log(this.courses);
            this.courses.fetch();
            new Course.Views.List({collection: this.courses});  
        }
    });

    module.exports = Router;

});