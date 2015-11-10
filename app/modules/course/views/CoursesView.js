define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CourseView = require("./CourseView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/coursesTemplate.html")),
        el: false,

        events: {
            "keypress #search-input": "searchCoursesOnEnter",
            "click #search-button": "searchCoursesOnClick",
            "click .remove-search": "removeSearchField"
        },
        beforeRender: function() {
            this.renderList();
            if (!_.isEmpty(this.collection.models)) {
                this.insertView("nav", new PaginationView({collection: this.collection}));
            }
        },
        afterRender: function() {
            if (this.collection.filterParams.s) {
                this.$el.find("#search-input").parent().append('<span class="glyphicon glyphicon-remove remove-search" aria-hidden="true"></span>');
                this.$el.find("#search-input").val(this.collection.filterParams.s);
            }
        },
        renderList: function() {
            this.collection.each(this.renderOne, this);
        },
        renderOne: function(model) {
            this.insertView(".courses", new CourseView({
                model: model
            }));
        },
        searchCoursesOnEnter: function(e) {
            var code = e.keyCode ? e.keyCode : e.charCode;
            if (code === 13) {
                if ($(e.target).val()) {
                    Backbone.history.navigate("#courses?s='"+$(e.target).val()+"'", {trigger: true});
                } else {
                    Backbone.history.navigate("#courses", {trigger: true});
                }
            }
        },
        searchCoursesOnClick: function(e) {
            e.preventDefault();
            var searchString = this.$el.find("#search-input").val();
            if (searchString) {
                Backbone.history.navigate("#courses?s='"+searchString+"'", {trigger: true});
            } else {
                Backbone.history.navigate("#courses", {trigger: true});
            }
        },
        removeSearchField: function() {
            Backbone.history.navigate("#courses", {trigger: true});
        },
        serialize: function() {
            return {
                courseId: this.id,
            };
        }
    });
    return View;
});