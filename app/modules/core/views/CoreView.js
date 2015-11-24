define(function(require) {
    "use strict";

    var View = require("../view"),
    CoreView = View.extend({
        el: "body",
        initialize: function() {
        },
        changeView: function(view) {
            this.setView(view);
        }
   });

   return CoreView;
});