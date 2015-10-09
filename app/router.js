define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Courses = require("modules/course/index"),
    Module = require("modules/module/index"),

    Router = Backbone.Router.extend({
        initialize: function() {

            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
            this.module = new Module.Model();
            
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
            "courses(/)(/page/:pageNumber)": "courses",
            "module": "module"
        },

        index: function() {
            
        },

        courses: function(currentPage) {
            this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            this.courses.fetch();
            new Courses.Views.Courses({collection: this.courses});
        },
        module: function() {
            this.module.fetch();
            new Module.Views.Item({model: this.module});
        }

    });

    return Router;

});