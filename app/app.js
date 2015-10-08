define(function(require) {
    "use strict";

    var _ = require("lodash");
    var $ = require("jquery");
    var Backbone = require("backbone");
    var CMS = require("./modules/core/index");

    require("bootstrap");

    CMS.root = "/";
    CMS.api = "http://localhost:3000/";
    CMS.perPage = 5;
    CMS.paginationSize = 5;

    return CMS;
});
