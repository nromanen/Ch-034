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

	        	if ( !attr.email || attr.email.match( /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/ ) ) {
	        		errors.push( { title: "email", message: "Помилка!Заповніть підсвічені поля та спробуйте знову." } )
	        	}

	        	if ( !attr.password || attr.password.match( /^\d{6}$/ ) ) {
	        		errors.push( { title: "password", message: "Помилка!Заповніть підсвічені поля та спробуйте знову." } )
	        	}

	        	return errors.length > 0 ? errors : false;
	        }
	    });

    return Model;

});