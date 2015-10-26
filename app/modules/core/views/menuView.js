define(function(require) {
   "use strict";

   var View = require("../view"),

   MenuView = View.extend({
        template: _.template(require("text!../templates/menuTemplate.html")),

        el: false
   });

   return MenuView;
});