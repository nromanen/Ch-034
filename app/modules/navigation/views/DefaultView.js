define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        View = CMS.View.extend({
            template: _.template(require("text!../templates/menuTemplate.html")),
            el: false,
            initialize: function(showTitle) {
               //this.listenTo(this.model, "sync request change", this.render);
               CMS.Event.on("session:change", this.render, this);
               this.showTitle = showTitle ? showTitle : true;
            },
             serialize: function() {
                var menu = this.model;
                    menu.showTitle = this.showTitle;
                return {
                    menu: menu,
                };
            }
    });
    return View;
});