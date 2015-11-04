define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/moduleTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        },
        serialize: function() {
            var module = this.model;
            module.attributes.id = this.model.id;
            module.courseId = this.model.courseId;

            return {
                module: module 
            };
        }

    });

    return View;
});