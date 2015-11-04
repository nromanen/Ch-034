define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),

        el: false,

        events: {
            'click .btn': "subscribe"
        },

        initialize: function() {
            this.subscribeModal = new CMS.ModalView({model: this.model});
        },

        serialize: function() {
            return {
                course: this.model,
                parseDate: this.convertToMonthAndDate
            };
        },

        subscribe: function(ev){
            this.subscribeModal.render();
            this.subscribeModal.show();
        }
    });

    return View;
});