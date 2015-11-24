define(function(require) {
    "use strict";

    var View = require("../../core/view"),

        HeaderNavigationMenuView = View.extend({
            template: _.template(require("text!../templates/headerNavigationMenuTemplate.html")),
            el: false,
            initialize: function() {
               this.listenTo(this.collection, "sync request change", this.render);
               this.listenTo(this.user, "sync request change", this.render);
            },
             serialize: function() {
                return {
                    menuName: this.menuName,
                    list: this.collection,
                    user: this.user
                };
            }
    });
    return HeaderNavigationMenuView;
});