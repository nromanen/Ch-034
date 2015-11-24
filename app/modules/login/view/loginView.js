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
            "click #submitLogin" : "submitHandler"
        },
        submitHandler: function (e) {
            e.preventDefault();
            this.$el.find(".input-group").removeClass("error");
            this.$el.find(".error-message").addClass("hidden");
            var dataObj = {
                email : this.$el.find( "#email" ).val().trim(),
                password: this.$el.find( "#password" ).val().trim()
            };
            this.model.set(dataObj, {validate: true});

            var that = this;
            if ( this.model.isValid() ) {
                $.ajax({
                    url: CMS.api + "login",
                    type: "POST",
                    crossDomain: true,
                    data: dataObj,
                    statusCode: {
                        200: function () {
                            CMS.router.navigate( "courses", { trigger: true } );
                        },
                        409: function ( jqXHR ) {
                            var error = JSON.parse( jqXHR.responseText );
                            that.$el.find( ".text-danger" ).html( error.message );
                            that.$el.find( error.name ).addClass( "error" );
                            that.$el.find( ".error-message" ).removeClass( "hidden" );
                        },
                        404: function ( jqXHR ) {
                            var error = JSON.parse( jqXHR.responseText );
                            that.$el.find( ".text-danger" ).html( error.message );
                            that.$el.find( error.name ).addClass( "error" );
                            that.$el.find( ".error-message" ).removeClass( "hidden" );
                        }
                    }
                });
            } else if ( !this.model.isValid() ) {
                this.errorMessage( this.model, this.model.validationError );
            } else {
                return this;
            }
        },
        errorMessage: function (model, errors) {
            _.forEach( errors, function (error) {
                this.$el.find( error ).addClass("error");
            }, this );
            this.$el.find( ".text-danger" ).html( "<b>Помилка!</b>Заповніть підсвічені поля та спробуйте знову." );
            this.$el.find(".error-message").removeClass("hidden");
        }
    });
    return View;
});