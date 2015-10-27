define(function(require) {
   var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/filterTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        events: {
            'click input': 'filterClicked'
        },

        filterClicked: function(e) {
            CMS.Event.trigger("filter:change", $(e.target));
        },

        serialize: function() {
            return {
                variants: this.collection,
                type: this.type
            };
        }

    });

   return View;
});