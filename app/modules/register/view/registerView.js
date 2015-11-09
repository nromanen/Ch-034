define(function(require) {
    "use strict";

_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
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

        showErrors: function(model, errors) {
            _.each(errors, function (error) {
                this.$el.find('.' + error.name).addClass('error');
                this.$el.find(".error-message").removeClass("hidden").text(error.mes);
            }, this);
            this.$el.find(".warning").addClass("hidden");
        },

        hideErrors: function() {
            this.$el.find('.error-message').addClass('hidden');
            this.$el.find(".input-group").removeClass("error");
        },

        remove: function() {
            // Remove the validation binding
            // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
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
            this.hideErrors();
            this.model.set(feedback);
            if(this.model.isValid(true)) {
                CMS.router.navigate("courses", {trigger: true});
            }
        }
    });

    return View;
});