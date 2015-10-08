define(function(require) {
    "use strict";

    var CoreCollection = require("../collection");

    var PageableCollection = CoreCollection.extend({

    api: "",
    resourse: "",
    perPage: 5,
    currentPage: 1,

    setCurrentPage: function(page) {
        if (page)
            this.currentPage = page;
    },

    pageOffset: function() {
        return (this.currentPage - 1)*this.perPage;
    },

    currUrl: function() {
        return this.api + this.resourse + '?_start=' + this.pageOffset() + '&_limit=' + this.perPage;
    },

    url: function() {
        return this.currUrl();
    },

    parse: function(data, options) {
        this.totalPages = Math.ceil(options.xhr.getResponseHeader('X-Total-Count')/this.perPage);
        
        return data;
    },

    info: function() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            lastPage: this.totalPages,
            pageSet: this.getPageSet()
        };
    },

    getRange: function() {
        return Math.floor(this.paginationSize/2);
    },

    getLeft: function() {
        return (this.currentPage - this.getRange());
    },

    getRight: function() {
        return this.totalPages - (this.currentPage + this.getRange());
    },

    getPageSet: function() {
        var pages = [];
        var totalPages = this.totalPages;
        var min = 1;
        var max = this.totalPages;

        if (this.getLeft() && this.getRight()) {
            min = this.currentPage - this.getRange();
            max = this.currentPage + this.getRange();

            if (min < 1) {
                max = max + (1 - min);
                min = 1;
            }

            if (max >= totalPages) {
                min = min - (max - totalPages);
                if (min < 1) min = 1;
                max = totalPages;
            }
        }

        pages = _.range(min, max+1);

        return pages;
    }

});

return PageableCollection;
});