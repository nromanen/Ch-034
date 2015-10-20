define(function(require) {
	"use strict";

	var CMS = require("CMS"),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function() {
				this.render();
			},

			template: _.template( require("text!../template/registerTemplate.html") ),

			render: function() {
				console.log("this.model");
				this.$el.html( this.template( this.model.toJSON() ) );
				return this;
			},

			events: {
				'click #submit': submitClicked
			},

			submitClicked: function(e) {
				e.preventDefault();

				var options = $.proxy({
                    success: function () {
                        this.hideErrors();
                    },
                    error: function (model, errors) {
                        this.showErrors(errors);
                    }
                }, this);

                var feedback = {
                	name: this.$('#name').val();
                	surname: this.$('#surname').val();
                	email: this.$('#email').val();
                	pass: this.$('#pass').val();
                	repeatPass: this.$('#repeatPass').val();
                }
			},

			showErrors: function(errors) {
                _.each(errors, function (error) {
                    var controlGroup = this.$('.' + error.name);
                    controlGroup.addClass('error');
                    // to be modified: controlGroup.find('.help-inline').text(error.message);
                }, this);
            },

            hideErrors: function () {
                this.$('.control-group').removeClass('error');
                // to be modified: this.$('.help-inline').text('');
            }
		});
	
	return View;
});