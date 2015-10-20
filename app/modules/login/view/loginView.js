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

			el: false,
				
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
				this.$el.find( ".form-group" ).removeClass( "error" );
				this.$el.find( ".error-message" ).hide();
				
				var dataObj = {
					email : $( "#email" ).val(), 
					password: $( "#password" ).val()
				};

				this.model.set( dataObj , { validate: true } );
			
			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
				this.$el.find( "." + error.name ).addClass( "error" ); 
				}, this );

				this.$el.find( ".error-message" ).show();
			}
		});

	return View;
});