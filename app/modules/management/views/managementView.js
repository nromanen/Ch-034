define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/managementTemplate.html")),

        serialize: function() {
            //this.collection.fetch();
            console.log(this.collection);
            this.listenTo(this.collection, "sync request change", this.serialize);
                        return {
                management: this.collection
            };
        },
/*      initialize: function() {
            console.log(this.collection);
            return {
                management: this.collection
            };

            //this.collection.fetch();
        }*/
    });

    return View;
});
