define(function(require) {
    "use strict";

    var View = require("../view"),
    CoreView = View.extend({
        el: "body"
   });

   return CoreView;
});