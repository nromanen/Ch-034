define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/modulesTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        serialize: function() {
            return {
                modules: this.collection,
                imgUrl: this.imgUrl,
                courseId : this.courseId
            };
        }
    });

    return View;
});