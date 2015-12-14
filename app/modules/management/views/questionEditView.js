define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/questionEditTemplate.html")),
        events: {
            'click #save_question': 'saveQuestionHandler'
        },

        initialize: function(options) {
            this.listenTo(this.model, "invalid", this.errorMessage);
        },
        serialize: function() {
            return {
                model   : this.model,
                typeTest: CMS.typeTest
            };
        },
        saveQuestionHandler: function() {  console.log("quest");
            this.$el.find("#question_name").removeClass("error");
            this.$el.find("#question_name").popover("destroy");
            var _this = this;  console.log(this.$el);
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
            this.$el.find("#question_name").addClass("error");
            this.$el.find("#question_name").popover({
                container: "body",
                name: error.name,
                content: error.message,
                placement: "bottom",
                trigger: "focus, hover"
            });
            this.$el.find("#question_name").popover("toggle");
        }
    });

    return View;
});
