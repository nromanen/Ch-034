define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var CoreModule = require("modules/core/index");
    var CourseModule = require("modules/course/index");

    var Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CourseModule;
            this.courses = new CourseModule.Collection();
            /*
            var MainLayout = Backbone.View.extend({
                el: "body",
                template: _.template(require('text!./templates/main.html')),

                render: function() {
                    this.$el.prepend(this.template);
                }
            });

            this.container = new MainLayout();
            this.container.render();
*/
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
            new CourseModule.Views.Courses({collection: this.courses});
        }
    });

    module.exports = Router;

});