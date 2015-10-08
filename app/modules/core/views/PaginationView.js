define(function(require) {
    "use strict";

    var CoreView = require("../view");

    var View = CoreView.extend({

        template: _.template(require("text!../templates/paginationTemplate.html")),

        el: ".pagination",

        events: {
            'click a.first': 'goToFirst',
            'click a.page': 'goToPage',
            'click a.last': 'goToLast'
        },

        goToFirst: function(e) {
            e.preventDefault();
            // go to the first page
            this.collection.goToFirst();
        },

        goToPrev: function(e) {
            e.preventDefault();
            // go to the previous page
            this.collection.goToPrevious();
        },

        goToPage: function(e) {
            e.preventDefault();
            // go to a specific page
            this.collection.goTo($(e.target).text());
        },

        goToNext: function(e) {
            e.preventDefault();
            // go to the next page
            this.collection.goToNext();
        },

        goToLast: function(e) {
            e.preventDefault();
            // go to the next page
            this.collection.goToLast();
        },

        render: function() {
            this.$el.html(this.template(this.collection.info()));
            return this;
        }

    });



    return View;
});