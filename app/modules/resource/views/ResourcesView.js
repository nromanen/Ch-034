define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ResourceView = require("./ResourceView"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/resourcesTemplate.html")),
        el: false,

        events: {
            "click #save-module-resources": "",
            "click #cancel-rosources": "backToEditModule",
        },

        initialize: function(options) {
            this.listenTo(this.collection, "reset sync request", this.render);
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        },
        serialize: function() {
            return {
                resources: this.collection
            };
        },
        beforeRender: function() {
            this.collection.each(this.renderOne, this);
        },
        renderOne: function(el) {
            this.insertView("#resources", new ResourceView({
                model: el
            }));
        },
        backToEditModule: function() {
            var that = this;
            Backbone.history.navigate("#courses/" + that.courseId + "/modules/" + that.moduleId + "/edit", {
                trigger: true
            });
        }
    });
    return View;
});