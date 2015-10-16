define( function ( require ) {
	"use strict";

	var CMS = require( "CMS" ),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function () {
				this.render();
				this.$el.find( ".error-message" ).hide();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( model, error );
				} );
			},

			template: _.template( require( "text!../template/resetTemplate.html" ) ),

			render: function () {
				this.$el.html( this.template( this.model.toJSON() ) );
			},

			events: {
				"blur #email" : "checkEmail"
			},

			checkEmail: function () {
				this.$el.find( ".email" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				this.model.set( { email : $( "#email" ).val().trim() }, { validate : true } );
			},

			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
					this.$el.find( "." + error.name ).addClass( "has-error" );
					this.$el.find( "#error-message" ).text( error.message );
				}, this );

				this.$el.find( ".error-message" ).show();
			}
		});

		return View;
});