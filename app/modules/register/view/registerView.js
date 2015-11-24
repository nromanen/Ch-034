define(function(require) {
    "use strict";

    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
            $el.popover('destroy');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
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
                pass: this.$el.find('#pass').val(),
                repeatPass: this.$el.find('#repeatPass').val()
            };
            this.model.set(feedback);
            if(this.model.isValid()) {
                this.model.save(null, {
                    success: function(model, response) {
                        CMS.router.renderHomepage();
                        CMS.router.navigate("courses", {trigger: true});
                    },
                    error: function(model, response) {
                    }
                });
            } else {
                this.showErrors();
            }
        }
    });
    return View;
});