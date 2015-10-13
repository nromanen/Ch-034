define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id: null,
            idModule: null,
            nameModule: null
        }
    });

    return Model;

});
