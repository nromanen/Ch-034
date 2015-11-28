define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/moduleTemplate.html")),
        el: false,
        initialize: function(options) {
            this.courseId = options.courseId;
            this.listenTo(this.model, "reset sync request", this.render);
        },

        serialize: function() {
            var module = this.model;
            module.attributes.id = this.model.id;
            module.attributes.courseId = this.model.courseId;
            module.attributes.downloadable = CMS.downloadable;
            module.attributes.embeddable = CMS.embeddable;

            return {
                module: module,
                courses: CMS.SessionModel.getItem("UserSession").profile._courses
            };
        }

    });
    return View;
});