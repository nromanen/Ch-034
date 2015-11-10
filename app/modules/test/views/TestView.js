define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testTemplate.html")),
        el: false,

        initialize: function(options) {
            this.answer   = options.answer;
            this.typeTest = options.typeTest;
        },
        serialize: function(){
            return {
                test     : this.model,
                answer   : this.answer,
                typeTest : this.typeTest
            };
        }
    });

    return View;
});