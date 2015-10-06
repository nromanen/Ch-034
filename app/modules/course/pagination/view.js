define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var Layout = Backbone.View.extend({

        template: _.template(require("text!./template.html")),

        el: false,

        initialize: function() {
            if (this.collection.totalPages <= app.paginationSize) 
                app.paginationSize = this.collection.totalPages;
            this.paginationBegin = 1;
            this.paginationEnd = this.collection.totalPages;

            this.range = Math.floor(app.paginationSize/2);
            if (this.collection.pageNumber - this.range > 0) {
                this.paginationBegin = this.collection.pageNumber - this.range;
            }

            if (Number(this.collection.pageNumber) + this.range <= this.collection.totalPages) {
                this.paginationEnd = Number(this.collection.pageNumber) + this.range;
            }

        },

        render: function() {
            return this.template({paginationBegin: this.paginationBegin, paginationEnd: this.paginationEnd});
        },


  
    });

    module.exports = Layout;
});