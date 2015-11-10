define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.PaginationView.extend({
        template: _.template(require("text!../templates/paginationTemplate.html")),
        el: false,

        initialize: function(collection, options) {
            this.answers = options.answers;
            this.pageSet = this.collection.info().pageSet;
        },
        serialize: function(){
            return {
                info         : this.collection.info(),
                countAnswers : this.answers.length
            };
        },
        afterRender: function(){
            _.each(this.pageSet, function(p) {
                if (!_.isUndefined(this.answers.get(p))) {
                    $('.pagination li#' + p).addClass('answer');
                }
            }, this);
        }
    });

    return View;
});