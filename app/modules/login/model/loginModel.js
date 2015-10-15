define(function(require){
    "use strict";

    var CMS = require("CMS"),
	    Model = CMS.Model.extend({
	       
	        defaults: {
	            email: null,
	            password: null
	        },

	        validate: function(attr, options) {
	        	
	        	var errors = [];

	        	if ( !attr.email ) {
	        		errors.push( { name: "email" } );
	        	} 

	        	if ( !attr.password ) {
	        		errors.push( { name: "password" } );
	        	}
				
	        	return errors.length > 0 ? errors : false;
	        }
	    });

    return Model;

});