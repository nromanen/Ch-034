define( function ( require ) {
	"use strict";

	var CMS = require( "CMS" ),
		Model = require( "modules/login/model/loginModel" ),
		View = CMS.View.extend({

			initialize: function () {
				this.model = new Model();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( model, error );
				} );
			},

			el: "#CrsMSContainer",
				
			template: _.template( require( "text!../template/loginTemplate.html" ) ),

			serialize: function () {
				return { model: this.model };
			},

			afterRender: function () {
				this.$el.find( ".error-message" ).hide();
			},

			events: {
				"submit" : "submit"
			},

			submit: function (e) {
				e.preventDefault();
				this.$el.find( ".form-group" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				this.model.set( { email : $( "#email" ).val(), password: $( "#password" ).val() }, { validate: true } );
			},
				
			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
				this.$el.find( "." + error.name ).addClass( "has-error" ); 
				}, this );

				this.$el.find( ".error-message" ).show();
			}
		});

	return View;
});