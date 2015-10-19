define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/moduleTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        },



        afterRender: function() {
            console.log(this.model.toJSON());
        }

    });

    return View;
});    