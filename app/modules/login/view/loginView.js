define(function(require) {
	"use strict";

	var CMS = require("CMS"),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function() {
				this.render();
			},

			template: _.template( require("text!../template/loginTemplate.html") ),

			render: function() {
				this.$el.html( this.template( this.model.toJSON() ) );
				return this;
			}
		});

	return View;
});