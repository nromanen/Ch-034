define(function(require){
    "use strict";

    var CMS = require("CMS"),
	    Model = CMS.Model.extend({
	       
	        defaults: {
	            email: null,
	            password: null
	        },

	        validate: function(attr, options) {
	        	
	        	if ( !attr.email ) {
	        		return "Помилка! заповніть підсвічені поля та спробуйте знову.";
	        	} 
	        }
	    });

    return Model;

});