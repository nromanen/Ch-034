define(function(require, exports, module) {
    "use strict";

    var app = require("app");
    
    var CourseView = Backbone.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),

        el: false,

        render: function() {
            return this.template(this.model.toJSON());
        }
    });

    module.exports = CourseView;
});