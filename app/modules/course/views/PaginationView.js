define(function(require, exports, module) {
    "use strict";
    var app = require("app");

    var PaginationView = Backbone.View.extend({

        template: _.template(require("text!../templates/paginationTemplate.html")),

        el: ".pagination",

        initialize: function(options) {

            console.log(options);
            if (options.totalPages <= app.paginationSize) 
                app.paginationSize = options.totalPages;
            this.paginationBegin = 1;
            this.paginationEnd = options.totalPages;

            this.range = Math.floor(app.paginationSize/2);
            if (options.pageNumber - this.range > 0) {
                this.paginationBegin = options.pageNumber - this.range;
            }

            if (Number(options.pageNumber) + this.range <= this.totalPages) {
                this.paginationEnd = Number(options.pageNumber) + this.range;
            }

        },

        render: function() {
            this.$el.html(this.template({paginationBegin: this.paginationBegin, paginationEnd: this.paginationEnd}));
            console.log(this);
            return this;
        },


  
    });

    module.exports = PaginationView;
});