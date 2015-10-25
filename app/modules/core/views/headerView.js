define(function(require) {
   "use strict";

   var View = require("../view"),
       HeaderNavigationMenuView = require("./headerNavigationMenuView"),
       HeaderPersonalMenuView = require("./headerPersonalMenuView"),

   HeaderView = View.extend({
        template: _.template(require("text!../templates/headerTemplate.html")),

        el: false,
        initialize: function(){
            this.insertView(".navigation-menu", new HeaderNavigationMenuView());
            this.insertView(".personal-menu", new HeaderPersonalMenuView());
        }
   });

   return HeaderView;
});