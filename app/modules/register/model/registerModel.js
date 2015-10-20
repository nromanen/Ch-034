define(function(require){
    "use strict";

    var CMS = require("CMS"),
	    Model = CMS.Model.extend({
	        
            defaults: {
	            name       : null,
	            surname    : null,
	            email      : null,
	            pass       : null,
	            repeatPass : null
	        },

            validate: function(attr, options) {
                
                var errors = [];

                if(!attr.name) {
                    errors.push({name: 'name', message: 'Please, enter your name.'});
                }
                if(!attr.surname) {
                    errors.push({name: 'surname', message: 'Please, enter your surname.'});
                }
                if(!attr.email) {
                    errors.push({name: 'email', message: 'Please, fill email field.'});
                }
                if(!attr.pass) {
                    errors.push({name: 'pass', message: 'Please, enter your password.'});
                }
                if(!attr.email) {
                    errors.push({name: 'repeatPass', message: 'Please, enter your password.'});
                }

                return errors.length > 0 ? errors : false;
            },

         /*var options = $.proxy({
                    success: function () {
                        this.hideErrors();
                    },
                    error: function (model, errors) {
                        this.showErrors(errors);
                    }
                }, this);


                showErrors: function(errors) {
                    _.each(errors, function (error) {
                        var controlGroup = this.$('.' + error.name);
                        controlGroup.addClass('error');
                        controlGroup.find('.help-inline').text(error.message);
                    }, this);
                },

                hideErrors: function () {
                    this.$('.control-group').removeClass('error');
                    this.$('.help-inline').text('');
                }
	        }*/
	    });
    return Model;

});