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
	    });
    return Model;

});