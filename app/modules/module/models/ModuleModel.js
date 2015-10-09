define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({

        defaults: {
            id: null,
            courseId: null,
            title: null,
            description: null,
            video: null
        },

        api: CMS.api,

        url: function() {
            return this.api + 'modules/1';
        }

    });

    return Model;
});

