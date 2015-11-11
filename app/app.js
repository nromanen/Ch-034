define(function(require) {
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Backbone = require("backbone"),
        CMS = require("./modules/core/index"),
        Layout = require("backbone.layoutmanager");
        require("bootstrap");

    _.extend(CMS, {
        root: "/",
        excludedPages: ["#login", "#register"],
        api: "http://localhost:8888/api/",
        perPage: 3,
        paginationSize: 5,
        typeTest: {
           list   : 0,
           answer : 1,
           few    : 2
        },
        embeddable: ['avi', 'mp4', 'video'],
        downloadable: ['zip', 'pdf', 'rar', 'doc', 'docx']
    });
    return CMS;
});
