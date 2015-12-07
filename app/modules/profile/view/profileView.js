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
            $el.popover({title: CMS.Helpers.Messages.errorWord, content: error, trigger: "focus"});
        }
    });

    var CMS = require("CMS"),

    Model = require("../model/profileModel"),

    View = CMS.View.extend({

        el: false,

        events: {
            'click #submit': "submitClicked",
            'click #edit'  : "editProfile",
            'click #cancel': "cancelEditing"
        },

        initialize: function() {
            this.model = new Model(CMS.SessionModel.getItem('UserSession').profile);
            Backbone.Validation.bind(this);
            this.profileTemplate = _.template(require("text!../template/profileTemplate.html"));
            this.editProfileTemplate = _.template(require("text!../template/editProfileTemplate.html"));
            this.template = this.profileTemplate;
        },

        switchToProfile: function() {
            this.template = this.profileTemplate;
            this.render();
            return this;
        },

        switchToEditProfile: function() {
            this.template = this.editProfileTemplate;
            this.render();
            return this;
        },

        serialize: function() {
            return {model: this.model};
        },

        afterRender: function() {
            this.hideErrors();
        },

        showErrors: function(model, errors) {
            this.$el.find('#warnMsg').show();
            this.$el.find('#warnMsg').addClass('error-message');
            this.$el.find('.title-msg').html(CMS.Helpers.Messages.errorWord);
            this.$el.find('.text-msg').html(CMS.Helpers.Messages.tryAgain);
        },

        hideErrors: function() {
            this.$el.find('#warnMsg').hide();
        },

        editProfile: function(e) {
            e.preventDefault();
            this.switchToEditProfile();
        },

        cancelEditing: function(e) {
            e.preventDefault();
            this.switchToProfile();
        },

        submitClicked: function(e) {
            e.preventDefault();

            var feedback = {
                name   : this.$el.find('#name').val(),
                surname: this.$el.find('#surname').val(),
                email  : this.$el.find('#email').val(),
                avatar : this.$el.find('#avatar').val(),
                social : {
                    phone   : this.$el.find('#phone').val(),
                    skype   : this.$el.find('#skype').val(),
                    linkedin: this.$el.find('#linkedin').val(),
                    fb      : this.$el.find('#fb').val(),
                    vk      : this.$el.find('#vk').val()
                },

            };
            var password = this.$el.find('#password').val(),
                repeatPass = this.$el.find('#repeatPass').val();

            if (password.length !== 0) {
                feedback.password = password;
            }

            this.model.set(feedback, {validate: true});

            if(this.model.isValid()) {

                this.model.save(null, {
                    success: function(model, response) {
                        var session = CMS.SessionModel.getItem("UserSession");
                        session.profile = response.profile;
                        session = JSON.stringify(session);
                        CMS.SessionModel.setItem("UserSession", session);
                        CMS.Event.trigger("session:change");
                        CMS.router.renderHomepage();
                        Backbone.history.navigate("#profile", {trigger: true});
                    },
                    error: function(model, response) {
                    }
                });
                this.hideErrors();
                this.switchToProfile();

            } else {
                this.showErrors();
            }
        }
    });
    return View;
});