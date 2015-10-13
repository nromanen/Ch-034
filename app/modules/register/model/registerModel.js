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
	    });

    return Model;

});