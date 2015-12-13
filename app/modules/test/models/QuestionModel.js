define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            num         : null,
            _course     : null,
            _module     : null,
            name        : null,
            typeVariant : null,
            _variants   : {}
        }
    });

    return Model;
});