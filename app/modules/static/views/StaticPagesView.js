define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        el: false,
        initialize: function(){
            this.templates = {
                agreement : _.template(require("text!../templates/agreementTemplate.html")),
                report : _.template(require("text!../templates/reportTemplate.html"))
            };
        },
        swapTemplate: function(template){
            this.template = this.templates[template];
        }
    });
    return new View();
});