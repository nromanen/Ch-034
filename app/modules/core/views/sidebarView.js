define(function(require) {
   "use strict";

   var View = require("../view"),

   SidebarView = View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),
        
        el: false

   });

   return SidebarView;
});