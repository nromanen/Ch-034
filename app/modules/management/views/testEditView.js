define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),

    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/testEditTemplate.html")),
        events: {
            'click #save_test': 'saveTestHandler'
        },

        serialize: function() {
            return {
                model         : this.model,
                estimateMethod: CMS.estimateMethod
            };
        },
        saveTestHandler: function() {
            var _this = this;
            var serialized = this.$el.serializeObject();
            this.model.set(serialized);
            this.model.save(null, {
                success: function() {
                    _this.model.fetch({reset: true});
                },
                error: function() {
                }
            });
        }
    });

    return View;
});
