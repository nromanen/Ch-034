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
	        }

            validate: function(attrs) {
                var me = this;
                var options = {
                    success: function () {
                        me.hideErrors();
                    },
                    error: function (model, errors) {
                        me.showErrors(errors);
                    }
                };

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

                var errors = [];

                if(!attrs.name) {
                    errors.push({name: 'name', message: 'Please, enter your name.'});
                }
                if(!attrs.surname) {
                    errors.push({name: 'surname', message: 'Please, enter your surname.'});
                }
                if(!attrs.email) {
                    errors.push({name: 'email', message: 'Please, fill email field.'});
                }
                if(!attrs.pass) {
                    errors.push({name: 'pass', message: 'Please, enter your password.'});
                }
                if(!attrs.email) {
                    errors.push({name: 'repeatPass', message: 'Please, enter your password.'});
                }

                return errors.length > 0 ? errors : false;

            }
	    });

    return Model;

});