define(function(require) {
   var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/filterTemplate.html")),
        el: false,
        events: {
            "change .filter-checkbox": "filterClicked"
        },
        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },
        filterClicked: function(e) {
            var query = "?",
                queryParams,
                path = CMS.router.getCurrentRootPath();

            queryParams = $(e.target).closest("form").serializeArray();
            if (!_.isEmpty(queryParams)) {
                _.forEach(queryParams, function(obj, index) {
                    if (query.indexOf(obj.name) === -1) {
                        query += obj.name+"=";
                    }
                    query += obj.value;
                    if (queryParams[index+1] && queryParams[index].name !== queryParams[index+1].name) {
                        query += "&";
                    } else {
                        query += ",";
                    }
                });
            }

            query = query.slice(0, -1);
            CMS.Event.trigger("filter:change", this.$el.find(".filter-checkbox:checked").length);
            Backbone.history.navigate(path+query, {trigger: true});
        },
        serialize: function() {
            return {
                variants: this.collection,
                type: this.type,
                params: this.params
            };
        }
    });
   return View;
});