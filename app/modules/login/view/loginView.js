define( function (require) {
    "use strict";

    var CMS = require("CMS"),

    Model = require("modules/login/model/loginModel"),

    View = CMS.View.extend({

        initialize: function () {
            this.model = new Model();
            this.listenTo(this.model, "invalid", function (model, error) {
                this.errorMessage(model, error);
            } );
        },

        el: false,

        template: _.template( require("text!../template/loginTemplate.html")),

        serialize: function () {
            return {model: this.model};
        },

        afterRender: function () {
            this.$el.find(".error-message").addClass("hidden");
        },

        events: {
            "submit" : "submitHandler"
        },

        submitHandler: function (e) {
            e.preventDefault();

            this.$el.find(".input-group").removeClass("error");
            this.$el.find(".error-message").addClass("hidden");

            var dataObj = {
                email : this.$el.find("#email").val(),
                password: this.$el.find("#password").val()
            };

            this.model.set(dataObj, {validate: true});

            if ( this.model.isValid() ) {
                $.ajax({
                    url: "/login",
                    type: "POST",
                    data: dataObj,
                    statusCode: {
                        200: function () {
                            CMS.router.navigate( "courses", { trigger: true } );
                        },
                        409: function () {
                            this.$el.find( ".error-message" )
                                        .removeClass( "hidden" )
                                        .text( "ERROR" );
                        }

                    }
                })
            }
        },

        errorMessage: function (model, errors) {
            _.forEach( errors, function (error) {
                this.$el.find( error ).addClass("error");
            }, this );

            this.$el.find(".error-message").removeClass("hidden");
        }
    });

    return View;
});