define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),
        questionModel = require("../models/managementModel"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/questionEditTemplate.html")),
        events: {
            'click #save_question': 'saveQuestionHandler'
        },

        initialize: function(options) {
            this.type = options.type;
            this.idParent = options.idParent;
            this.listenTo(this.model, "invalid", this.errorMessage);
        },
        serialize: function() {
            return {
                model   : this.model,
                typeTest: CMS.typeTest
            };
        },
        saveQuestionHandler: function() {
            this.$el.find("#question_name").removeClass("error");
            this.$el.find("#question_name").popover("destroy");
            var _this = this;
            var serialized = this.$el.serializeObject();
            if(this.type == "addNewInstance"){
                var newTest = new questionModel();
                newTest.urlRoot = CMS.api + "tests/" + this.idParent + "/questions";
            }
            else {
                var newTest = this.model;
            }
            newTest.set(serialized, {validate: true});
            if(!newTest.validationError) {
                newTest.save(null, {
                    success: function() {
                        if(_this.type == "addNewInstance") {
                            Backbone.history.navigate("#management/tests/" + _this.idParent + "/questions", {
                                trigger: true
                            });
                        }
                        else {
                            newTest.fetch({reset: true});
                        }
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
