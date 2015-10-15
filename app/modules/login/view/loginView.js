define( function ( require ) {
	"use strict";

	var CMS = require( "CMS" ),
		Model = require( "modules/login/model/loginModel" ),
		View = CMS.View.extend({

			initialize: function () {
				this.render();
				this.$el.find( ".error-message" ).hide();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( error );
				} );
			},

			el: false,
				
			template: _.template( require( "text!../template/loginTemplate.html" ) ),

			serialize: function () {
				return { model: this.model };
			},

			afterRender: function () {
				this.$el.find( ".error-message" ).addClass( "hidden" );
			},

			events: {
				"submit" : "submitHandler"
			},
			
			submitHandler: function (e) {
				e.preventDefault();
				
				this.$el.find( ".form-group" ).removeClass( "error" );
				this.$el.find( ".error-message" ).addClass( "hidden" );
				
				var dataObj = {
					email : this.$el.find( "#email" ).val(), 
					password: this.$el.find( "#password" ).val()
				};

				this.model.set( dataObj , { validate: true } );
			
			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
					this.$el.find( "." + error ).addClass( "error" ); 
					}, this );

				this.$el.find( ".error-message" ).removeClass( "hidden" );
			}
		});

	return View;
});