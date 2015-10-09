define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Courses = require("modules/course/index"),
    Module = require("modules/module/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
            this.modules = new Module.Collection();
            this.module = new Module.Model();            
        },

        routes: {
            "": "index",
            "courses(/)(/page/:pageNumber)": "courses",
            "modules(/)(/page/:pageNumber)": "modules",
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
        
        modules: function() {
            this.modules.reset();
            this.modules.fetch();
            new Module.Views.Modules({collection: this.modules});
        },

        module: function() {
//            this.module.reset();
            this.module.fetch();
            new Module.Views.Module({model: this.module});
        }
    });

    return Router;

});