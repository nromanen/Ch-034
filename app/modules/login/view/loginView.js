define( function ( require ) {
	"use strict";

	var CMS = require("CMS"),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function () {
				this.render();
				this.$el.find( ".error-message" ).hide();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( model, error );
				} );
			},
				
			template: _.template( require( "text!../template/loginTemplate.html" ) ),

			render: function () {
				this.$el.html( this.template( this.model.toJSON() ) );
				return this;
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