define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),
        testModel = require("../models/managementModel"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/testEditTemplate.html")),
        events: {
            'click #save_test': 'saveTestHandler'
        },

        initialize: function(options) { 
            this.type = options.type;
            this.idParent = options.idParent;
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
            if(this.type == "addNewInstance"){
                var newTest = new testModel();
                newTest.urlRoot = CMS.api + "modules/" + this.idParent + "/tests";
            }
            else {
                var newTest = this.model;
            }
            newTest.set(serialized, {validate: true});
            if(!newTest.validationError) {
                newTest.save(null, {
                    success: function() {
                        if(_this.type == "addNewInstance") {
                            Backbone.history.navigate("#management/modules/" + _this.idParent + "/tests", {
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
