define(function(require) {
    "use strict";

    var CoreCollection = require("../collection"),

    PageableCollection = CoreCollection.extend({

        api: "",
        resourse: "",
        perPage: 5,
        currentPage: 1,
        hrefPath: "",
        pageOffset: 0,

        getResource: function() {
            return this.resourse;
        },
        getHrefPath: function() {
            return this.hrefPath;
        },
        setCurrentPage: function(page) {
            if (page)
                this.currentPage = page;
        },
        getPageOffset: function() {
            this.setPageOffset();
            return this.pageOffset;
        },
        setPageOffset: function(page) {
            if (page) {
                this.setCurrentPage(page);
            }
            this.pageOffset = (this.currentPage - 1)*this.perPage;
        },
        getApiUrl: function() {
            return this.api + this.getResourse() + '?_start=' + this.getPageOffset() + '&_limit=' + this.perPage;
        },
        url: function() {
            return this.getApiUrl();
        },
        getPageUrl: function(page) {
            if (page) {
                return this.getHrefPath()+page.toString();
            }
            
            return this.getHrefPath()+this.currentPage.toString();
        },
        parse: function(data, options) {
            this.totalPages = Math.ceil(options.xhr.getResponseHeader('X-Total-Count')/this.perPage);
            
            return data;
        },
        getRange: function() {
            return Math.floor(this.paginationSize/2);
        },
        getPageSet: function() {
            var pages = [],
                totalPages = this.totalPages,
                min = 1,
                max = this.totalPages;

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

            pages = _.range(min, max+1);

            return pages;
        },
        info: function() {
            return {
                pageUrl: $.proxy(this.getPageUrl,this),
                currentPage: this.currentPage,
                totalPages: this.totalPages,
                lastPage: this.totalPages,
                pageSet: this.getPageSet()
            };
        }
    });
    return PageableCollection;
});