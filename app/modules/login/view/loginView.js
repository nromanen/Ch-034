define(function(require) {
	"use strict";

	var CMS = require("CMS"),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function() {
				this.render();
				this.$el.find( ".error-message" ).hide();
				this.listenTo( this.model, "invalid", this.errorMessage );
			},

			template: _.template( require( "text!../template/loginTemplate.html" ) ),

			render: function() {
				this.$el.html( this.template( this.model.toJSON() ) );
				return this;
			},

			events: {
				"blur #email" : "validEmail",
				"blur #password" : "validPassword"
			},

			validEmail: function() {
				var newEmail = $( "#email" ).val();
				this.$el.find( ".email-input" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				this.model.set( { email: newEmail }, { validate: true } );
			},

			validPassword: function() {
				//var form = $( "#loginForm" ).serializeObject();
				//this.model.set( form, { validate: true } );
			},

			errorMessage: function() {
				this.$el.find( ".email-input" ).addClass( "has-error" ); 
				this.$el.find( ".error-message" ).show();
			}
		});

	return View;
});