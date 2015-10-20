define(function(require){
    "use strict";

    var CMS = require("CMS"),
        Model = CMS.Model.extend({
            
            defaults: {
<<<<<<< HEAD
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
=======
                name       : null,
                surname    : null,
                email      : null,
                pass       : null,
                repeatPass : null
            },

            validate: function(attr, options) {
                var errors = [];

                if ( !attr.name ) {
                    errors.push( { name: "name" } );
                }

                if ( !attr.surname ) {
                    errors.push( { name: "surname" } );
                }
                if ( !attr.email ) {
                    errors.push( { name: "email" } );
                }

                if ( !attr.pass ) {
                    errors.push( { name: "pass" } );
                }
                
                if ( !attr.repeatPass ) {
                    errors.push( { name: "repeatPass" } );
                }
                
                            
                return errors.length > 0 ? errors : false;
            }
        });
>>>>>>> ca06c09451ac4bfdc9bf7c95ea0a4f261beaea09

                return errors.length > 0 ? errors : false;
            },
	    });
    return Model;

});