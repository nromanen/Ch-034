define(function(require) {
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Backbone = require("backbone"),
        CMS = require("./modules/core/index"),
        Layout = require("layoutmanager");
        require("bootstrap");
        
    CMS.root = "/";
    CMS.api = "http://localhost:3000/";
    CMS.perPage = 5;
    CMS.paginationSize = 5;

    return CMS;
});
