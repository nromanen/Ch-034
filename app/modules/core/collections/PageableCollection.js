define(function(require) {
    "use strict";

    var CoreCollection = require("../collection");


    var PageableCollection = CoreCollection.extend({

        api: "",
        resourse: "",
        perPage: 5,

        setCurrentPage: function(page) {
            this.currentPage = page;
        },

        pageOffset: function() {
            return (this.currentPage - 1)*this.perPage + 1;
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

        goTo: function(page) {
            this.currentPage = page;
            this.fetch({reset: true});
        },

        goToFirst: function(){
            this.currentPage = 1;
            this.fetch({reset: true});
        },

        goToLast: function() {
            this.reset();
            this.currentPage = this.totalPages;

            this.fetch();
        },

        info: function() {
          return {
            currentPage: this.currentPage,
            perPage: this.perPage,
            totalPages: this.totalPages,
            lastPage: this.totalPages,
            pageSet: this.getPageSet(),
            hasLeft: this.hasLeft(),
            hasRight: this.hasRight()
          }
        },

    });

    return PageableCollection;
});