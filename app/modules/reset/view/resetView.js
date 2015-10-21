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

			el: false,

			template: _.template( require( "text!../template/resetTemplate.html" ) ),

			serialize: function () {
				return { model: this.model };
			},

			afterRender: function () {
				this.$el.find( ".input-group" ).removeClass( "hidden" );
			},

			events: {
				"submit" : "submitEmail"
			},

			submitEmail: function (e) {
				e.preventDefault();
				this.$el.find( ".input-group" ).removeClass( ".error" );
				this.$el.find( ".error-message" ).addClass( "hidden" );
				this.model.set( { email : this.$el.find( "#email" ).val().trim() }, { validate : true } );
			},

			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
					this.$el.find( "." + error.name ).addClass( ".error" );
					this.$el.find( "#text-error-message" ).text( error.message );
				}, this );

				this.$el.find( ".error-message" ).removeClass( "hidden" );
			}
		});

		return View;
});