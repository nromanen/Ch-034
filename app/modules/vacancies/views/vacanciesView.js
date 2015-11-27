define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/vacancyTemplate.html")),

        tagName: 'div',
        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render);

        },
        serialize: function() {
            return {
                vacancies: this.collection
            };
        }
    });

    return View;
});