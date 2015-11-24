define(function(require) {
    "use strict";

    var View = require("../view"),
    CoreView = View.extend({
        el: "body",
        initialize: function() {
            console.log(this);
        },

        changeView: function(view) {
            this.setView(view);
        }
   });

   return CoreView;
});