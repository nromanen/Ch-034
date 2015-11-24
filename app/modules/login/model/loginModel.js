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
	      if ( !attr.email) {
	        errors.push({inputName: "email", title: "Email should not be blank.", message: "Please fill email field with valid email address"});
	      }
	      if ( !attr.password ) {
	        errors.push({inputName: "password", title: "Password should not be blank.", message: "Password should contain min 8 characters"});
	      }
	      return errors.length > 0 ? errors : false;
	    }
	  });
  return Model;
});