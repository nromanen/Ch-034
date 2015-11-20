define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/managementTemplate.html")),

        serialize: function() {
            //console.log(this.collection.models);
            return {
                management: this.collection
            };
        }
    });

    return View;
});
