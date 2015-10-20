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
<<<<<<< HEAD
            this.modules.fetch();
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image')}));
=======
            console.log("before");
            this.modules.fetch();
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules}));
>>>>>>> check email
        },

        serialize: function() {
            return { course: this.model };
        }

    });

    return View;
});