define( function ( require ) {
	"use strict";

	var CMS = require( "CMS" ),
		Model = require( "modules/reset/model/resetModel" ),
		View = CMS.View.extend({

			initialize: function () {
				this.model = new Model();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( model, error );
				} );
			},

			el: "#CrsMSContainer",

			template: _.template( require( "text!../template/resetTemplate.html" ) ),

			serialize: function () {
				return { model: this.model };
			},

			events: {
				"submit" : "submit"
			},

			submit: function (e) {
				e.preventDefault();
				this.$el.find( ".input-group" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				this.model.set( { email : $( "#email" ).val().trim() }, { validate : true } );
			},

			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
					this.$el.find( "." + error.name ).addClass( "has-error" );
					this.$el.find( "#text-error-message" ).text( error.message );
				}, this );

				this.$el.find( ".error-message" ).show();
			}
		});

		return View;
});