define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = require("modules/register/model/registerModel"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../template/registerTemplate.html")),
        events: {
            'click #submit': "submitClicked"
        },

        initialize: function() {
            this.model = new Model();
            this.listenTo(this.model, "invalid", function (model, error) {
                this.showErrors(model, error);
            });
        },

        serialize: function() {
            return {model : this.model};
        },

        afterRender: function() {
            this.$el.find(".error-message").addClass("hidden");
        },

        submitClicked: function(e) {
            e.preventDefault();
            var feedback = {
                name: this.$el.find('#name').val(),
                surname: this.$el.find('#surname').val(),
                email: this.$el.find('#email').val(),
                pass: this.$el.find('#pass').val(),
                repeatPass: this.$el.find('#repeatPass').val()
            };
            this.hideErrors();
            this.model.set(feedback);
            if(this.model.isValid()) {
                this.model.save(null, {
                    success: function(model, response) {
                        console.log("trigg");
                        console.log(response);
                        CMS.router.renderHomepage();
                        CMS.router.navigate("courses", {trigger: true});
                    },
                    error: function(model, response) {
                        console.log("err");
                        console.log(response);
                    }
                });

            }
        },

        showErrors: function(model, errors) {
            _.each(errors, function (error) {
                this.$el.find('.' + error).addClass('error');
            }, this);
            this.$el.find(".warning").addClass("hidden");
            this.$el.find(".error-message").removeClass("hidden");
        },

        hideErrors: function() {
            this.$el.find('.error-message').addClass('hidden');
            this.$el.find(".input-group").removeClass("error");
        }
    });

    return View;
});