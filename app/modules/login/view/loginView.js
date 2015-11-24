define( function (require) {
    "use strict";

    var CMS = require("CMS"),

    Model = require("modules/login/model/loginModel"),

    View = CMS.View.extend({
        template: _.template( require("text!../template/loginTemplate.html")),
        el: false,
        initialize: function () {
            this.model = new Model();
            this.listenTo(this.model, "invalid", this.errorMessage);
            this.listenTo(this.model, "change", function(model) {
                CMS.SessionModel.login(model.attributes, $.proxy(this.loginErrorHandler, this));
            });
        },
        events: {
            "submit" : "submitHandler",
            "document ajaxError": "loginErrorHandler"
        },
        serialize: function () {
            return {model: this.model};
        },
        afterRender: function () {
            this.$el.find(".error-message").addClass("hidden");
        },
        submitHandler: function (e) {
            e.preventDefault();
            this.$el.find(".input-group").removeClass("error");
            this.$el.find("input").popover("destroy");
            this.$el.find(".error-message").addClass("hidden");
            var dataObj = {
                email : this.$el.find("#email").val(),
                password: this.$el.find("#password").val()
            };
            this.model.set(dataObj, {validate: true});
        },
        errorMessage: function (model, errors) {
            this.$el.find(".error-message")
                .removeClass("hidden")
                .html("<b>Помилка!!</b>Заповніть підсвічені поля та спробуйте знову.");
            _.forEach( errors, function (error) {
                this.$el.find( "."+error.inputName ).addClass("error");
                this.$el.find("#"+error.inputName).popover({
                    container: 'body',
                    title: error.title,
                    content: error.message,
                    placement: "right",
                    trigger: "focus, hover"
                });
                this.$el.find("#"+error.inputName).popover('toggle');
            }, this );

        },
        loginErrorHandler: function(event, thrownError) {
            this.$el.find(".error-message").removeClass("hidden").html(thrownError);
        }
    });
    return View;
});