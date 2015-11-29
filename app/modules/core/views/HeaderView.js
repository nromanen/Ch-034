define(function(require) {
    "use strict";

    var View = require("../view"),


    HeaderView = View.extend({
        template: _.template(require("text!../templates/headerTemplate.html")),
        el: false,
        afterRender: function(){
/*            this.insertView(".navigation-menu", this.navMenu);
            this.insertView(".personal-menu", this.personalMenu);*/
        }

    });
    return HeaderView;
});