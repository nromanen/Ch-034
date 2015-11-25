define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id         : null,
            _course    : null,
            _module    : null,
            userAnswer : null
        }
    });

    return Model;
});
