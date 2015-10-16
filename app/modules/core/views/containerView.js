define(function(require) {
   "use strict";

   var View = require("../view"),

   MainContainerView = View.extend({
        template: _.template(require("text!../templates/mainContainerTemplate.html")),
        el: false
   });

   return MainContainerView;
});