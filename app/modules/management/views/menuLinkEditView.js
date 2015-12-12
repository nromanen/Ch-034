define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),
        moment = require('moment'),
    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/menuLinkEditTemplate.html")),
        events: {
            'click #save_button': 'saveButtonHandler'
        },

        serialize: function() {
            return {
                model: this.model,
            };
        },

        afterRender: function() {
            _.each(CMS.userRoles, function(item) {
                    var option = $(document.createElement("option")).val(item.type).text(item.name);

                    _.each(this.model.get("access"), function(role) {
                        if (role === item.type) {
                            option.attr("selected", true);
                        }
                    });
                    console.log(option);
                    this.$el.find("#menu_access").append(option);
                }, this);
        },
        saveButtonHandler: function() {
            var _this = this;
            var serialized = this.$el.serializeObject();
            this.model.set(serialized);
            this.model.save(null, {
                success: function() {
                    _this.model.fetch({reset: true});
                },
                error: function() {
                    console.log("error");
                }
            });
        }
    });

    return View;
});
