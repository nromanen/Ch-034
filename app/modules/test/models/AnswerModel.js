define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id         : null,
            moduleId   : null,
            answerUser : null
        }
    });

    return Model;

});
