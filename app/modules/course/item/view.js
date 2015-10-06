define(function(require, exports, module) {
    "use strict";

    var Backbone = require("backbone");
    
    var CourseItemView = Backbone.View.extend({
        template: _.template(require("text!./template.html")),

        el: false,

        render: function() {
            return this.template(this.model.toJSON());
        }
    });

    module.exports = CourseItemView;
});