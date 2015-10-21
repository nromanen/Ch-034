define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Module = require("../models/ModuleModel"),

    Collection = CMS.Collection.extend({
        model: Module,
        api: CMS.api,
        url: function() {
            return this.api+"course/"+this.courseId+"/modules/";
        },
        
        initialize: function(models, options) {
            this.courseId = options.courseId;
        }
    });

    return Collection;
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
