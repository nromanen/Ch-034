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
<<<<<<< HEAD
<<<<<<< HEAD
                modules: this.collection,
                imgUrl: this.imgUrl
            };
        }     
=======
=======
>>>>>>> 0faba6121b88d639d4d484495f1cf106b1311bdf
                modules: this.collection
            };
        }
        
<<<<<<< HEAD
>>>>>>> check email
=======
>>>>>>> 0faba6121b88d639d4d484495f1cf106b1311bdf
    });

    return View;

});