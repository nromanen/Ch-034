define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.PaginationView.extend({

        el: false,

        serialize: function() {
            return {
                info: this.collection.info()
            };
        }

    });

    return View;
});