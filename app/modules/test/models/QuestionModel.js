define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id          : null,
            num         : null,
            courseId    : null,
            moduleId    : null,
            question    : null,
            typeVariant : null,
            variants    : {}
        }
    });

    return Model;
});