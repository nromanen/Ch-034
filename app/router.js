define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var Login = require("modules/login/index");
    var Course = require("modules/course/index");
    //require("bootstrap");

    var Backbone = require("backbone");

    var Router = Backbone.Router.extend({
        initialize: function() {
            
            this.courses = new Course.Collection();
            
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
            "courses(/page/:pageNumber)": "courses"
        },

        index: function() {
        },

        courses: function(pageNumber) {
            this.courses.reset();
            this.courses.pageNumber = (pageNumber ? pageNumber : 1);
            this.courses.fetch();
            new Course.Views.Index({collection: this.courses});
        }
    });

    module.exports = Router;

});