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
	        errors.push({inputName: "email", title: "Введіть Email.", message: "Будьласка, перевірте правильність написання електронної пошти"});
	      }
	      if ( !attr.password ) {
	        errors.push({inputName: "password", title: "Введіть пароль.", message: "Пароль повинен містити велику та маленьку літери, мінімум одну цифру з мінімальною довжиною 8 символів"});
	      }
	      return errors.length > 0 ? errors : false;
	    }
	  });
  return Model;
});