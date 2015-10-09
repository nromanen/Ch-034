define(function(require) {
   "use strict";

   var View = require("../view"),

   CoreView = View.extend({
        template: _.template(require("text!../templates/coreTemplate.html")),
        
        el: "#CrsMSContainer",

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
        },

        renderView: function(view, el) {
          this.block = this.$el.find(el);
          this.block.html(view);
        }
   });

   return new CoreView();
});