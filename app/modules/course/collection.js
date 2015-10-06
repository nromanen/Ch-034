define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var Collection = Backbone.Collection.extend({

        pageSize: app.pageSize,

        pageOffset: function() {
            return (this.pageNumber - 1)*this.pageSize + 1;
        },

        currUrl: function() {
            return app.api + 'courses?_start=' + this.pageOffset() + '&_limit=' + this.pageSize;
        },

        url: function() {
            return this.currUrl();
        },

        parse: function(data, options) {
            this.totalPages = Math.ceil(options.xhr.getResponseHeader('X-Total-Count')/this.pageSize);
            
            return data;
        },

    });

    module.exports = Collection;
});