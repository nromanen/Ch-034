define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var Collection = Backbone.Collection.extend({
        pageSize: 10,

        url: function() {
            return app.api + 'modules?_start=0&_limit='+this.pageSize;
        }
    });

    module.exports = Collection;
});