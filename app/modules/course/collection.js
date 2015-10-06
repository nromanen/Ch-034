define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var Collection = Backbone.Collection.extend({
        initialize: function(pageNumber) {
            this.pageNumber = pageNumber ? pageNumber : 1;
            console.log(this.pageNumber);
        },

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

        parse: function(resp) {
            console.log(resp);
        }

    });

    module.exports = Collection;
});