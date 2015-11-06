define(function(require) {
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Backbone = require("backbone"),
        CMS = require("./modules/core/index"),
        Layout = require("backbone.layoutmanager");
        require("bootstrap");

    CMS.root = "/";
    CMS.api = "http://localhost:8888/api/";
    CMS.perPage = 3;
    CMS.paginationSize = 5;
    CMS.typeTest = {
       list   : 0,
       answer : 1,
       few    : 2
    };
    CMS.embeddable = ['avi', 'mp4', 'video'];
    CMS.downloadable = ['zip', 'pdf', 'rar', 'doc', 'docx'];

    return CMS;
});
