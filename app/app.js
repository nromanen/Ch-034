define(function(require, exports, module) {
    "use strict";


    var _ = require("underscore");
    var $ = require("jquery");
    var Backbone = require("backbone");
    
    require("bootstrap");

    var app = module.exports;

    app.root = "/";
    app.api = "http://localhost:3000/";
    app.pageSize = 5;
    app.paginationSize = 5;
});
