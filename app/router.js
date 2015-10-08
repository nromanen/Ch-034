define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var Login = require("modules/login/index");
    var Course = require("modules/course/index");
    var Module = require("modules/module/index");
    //require("bootstrap");

    var Backbone = require("backbone");

    var Router = Backbone.Router.extend({
        initialize: function() {
            
            this.courses = new Course.Collection();
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
            "five": "five",
            "module": "module"
        },

        index: function() {
            new Course.Views.List({collection: this.courses});
            this.courses.fetch();
        },

        five: function() {
            this.container.render();
            console.log("Five route");
        },

        module: function() {
            this.module.fetch();
            new Module.Views.Item({model: this.module});
        },
    });

    module.exports = Router;

});