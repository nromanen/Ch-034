define(function(require){
    "use strict";

    var CMS = require("CMS"),
	    Model = CMS.Model.extend({
	        defaults: {
	            email: null,
	            password: null
	        }
	    });

    return Model;

});