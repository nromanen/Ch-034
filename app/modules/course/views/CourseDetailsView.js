define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ModulesModule = require("modules/module/index"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),

        el: false,

        initialize: function() {
            this.modules = new ModulesModule.Collection([],{courseId: this.model.id});
            this.listenTo(this.model, "reset sync request", this.render);
        },

        beforeRender: function() {
            this.modules.fetch();
<<<<<<< HEAD
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image')}));
=======
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules}));
>>>>>>> 0faba6121b88d639d4d484495f1cf106b1311bdf
        },

        serialize: function() {
            return { course: this.model };
        }

    });

    return View;
});