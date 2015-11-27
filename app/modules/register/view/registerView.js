define(function(require) {
    "use strict";

    _.extend(Backbone.Validation.callbacks, {

        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');
            $group.removeClass('has-error');
            $el.popover('destroy');
        },

        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');
            $group.addClass('has-error');
            $el.popover({title: Message.errorWord, content: error, trigger: "focus"});
        }
    });

    var CMS = require("CMS"),

    Message = require("modules/messages"),

    Model = require("modules/register/model/registerModel"),

    View = CMS.View.extend({

        el: false,

        template: _.template(require("text!../template/registerTemplate.html")),

        events: {
            'click #submit': "submitClicked"
        },

        initialize: function() {
            this.model = new Model();
            Backbone.Validation.bind(this);
        },

        serialize: function() {
            return {model: this.model};
        },

        afterRender: function() {
            this.hideErrors();
        },

        showErrors: function(model, errors) {
            this.$el.find('#warnMsg').addClass('error-message');
            this.$el.find('.title-msg').html(Message.errorWord);
            this.$el.find('.text-msg').html(Message.tryAgain);
        },

        hideErrors: function() {
            this.$el.find('#warnMsg').removeClass('error-message');
            this.$el.find('.title-msg').html(Message.attentionWord);
            this.$el.find('.text-msg').html(Message.fieldsRequired);
        },

        submitClicked: function(e) {
            e.preventDefault();
            var feedback = {
                name: this.$el.find('#name').val(),
                surname: this.$el.find('#surname').val(),
                email: this.$el.find('#email').val(),
                password: this.$el.find('#password').val(),
                repeatPass: this.$el.find('#repeatPass').val()
            };

            this.model.set(feedback, {validate: true});

            if(this.model.isValid()) {

                this.model.save(null, {
                    success: function(model, response) {
                        CMS.router.renderHomepage();
                        CMS.router.navigate("/courses", {trigger: true});
                    },
                    error: function(model, response) {
                        console.log("Error: " + response);
                    }
                });
                this.hideErrors();
                CMS.router.navigate("/courses", {trigger: true});

            } else {
                this.showErrors();
            }
        }
    });
    return View;
});