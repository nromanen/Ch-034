define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id: null,
            courseId: null,
            title: null,
            description: null,
            resources: {}
        },
        initialize: function(attributes, options) {
            this.courseId = options.courseId;
        },
        urlRoot: function() {
            return CMS.api + "courses/"+this.courseId+"/modules";
        }
    });

    return Model;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});

>>>>>>> check email
=======
});
>>>>>>> fixed
=======
});
>>>>>>> 0faba6121b88d639d4d484495f1cf106b1311bdf
