define(function(require) {
    "use strict";
    var CMS = require("app");

    var View = CMS.PaginationView.extend({

        el: ".pagination",

        paginationSize: CMS.paginationSize


    });

    return View;
});