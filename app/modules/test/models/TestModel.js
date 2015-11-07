define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id       : null,
            courseId : null,
            moduleId : null,
            nameTest : null
        },
        api     : CMS.api,
        urlRoot : CMS.api + 'tests',

        url: function() {
            return this.urlRoot + '/' + this.id;

        }
    });

    return Model;
});
