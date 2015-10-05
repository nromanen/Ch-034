define(function(require, exports, module) {
    "use strict";

    var Model = require("./model");

    var View = Backbone.View.extend({
        template: _.template(require("text!./template.html")),

        model: new Model(),

        el: "#CrsMSContainer",

        initialize: function() {
            this.$el.html(this.template( this.model.toJSON() ));
            console.log("Initialized!!");
        }

    });

    module.exports = View;
});