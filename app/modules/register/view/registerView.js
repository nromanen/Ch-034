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
            $el.popover({title: "Помилка!", content: error, trigger: "focus"});
        }
    });

    var CMS = require("CMS"),

    Model = require("modules/register/model/registerModel"),

    View = CMS.View.extend({
        el: "#CrsMSContainer",

        template: _.template(require("text!../template/registerTemplate.html")),

        events: {
            'click #submit': "submitClicked"
        },

        initialize: function() {
            this.model = new Model();
            Backbone.Validation.bind(this);

            /*this.listenTo(this.model, "invalid", function (model, error) {
                this.showErrors(model, error);
            });*/

        },

        serialize: function() {
            return {model : this.model};
        },

        afterRender: function() {
            this.$el.find('.error-message').addClass('hidden');
        },

        showErrors: function(model, errors) {
            this.$el.find('.warning').addClass('hidden');
            this.$el.find('.error-message').removeClass('hidden');
        },

        hideErrors: function() {
            this.$el.find('.warning').removeClass('hidden');
            this.$el.find('.error-message').addClass('hidden');
        },

        remove: function() {
            // Remove the validation binding
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
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
            //this.hideErrors();
            this.model.set(feedback);
            //console.log(this.model.isValid(true));
            if(this.model.isValid(true)) {
                this.hideErrors();
                CMS.router.navigate("courses", {trigger: true});
            } else {
                this.showErrors();
            }
        }
    });
    return View;
});