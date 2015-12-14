define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/testEditTemplate.html")),
        events: {
            'click #save_test': 'saveTestHandler'
        },

        initialize: function(options) {
            this.listenTo(this.model, "invalid", this.errorMessage);
        },
        serialize: function() {
            return {
                model         : this.model,
                estimateMethod: CMS.estimateMethod
            };
        },
        saveTestHandler: function() {
            this.$el.find("#test_name").removeClass("error");
            this.$el.find("#test_name").popover("destroy");
            var _this = this;
            var serialized = this.$el.serializeObject();
            this.model.set(serialized, {validate: true});
            if(!this.model.validationError) {
                this.model.save(null, {
                    success: function() {
                        _this.model.fetch({reset: true});
                    },
                    error: function() {
                    }
                });
            }
        },
        errorMessage: function (model, error) {
            this.$el.find("#test_name").addClass("error");
            this.$el.find("#test_name").popover({
                container: "body",
                name: error.name,
                content: error.message,
                placement: "bottom",
                trigger: "focus, hover"
            });
            this.$el.find("#test_name").popover("toggle");
        }

    });

    return View;
});
