define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CourseView = require("./CourseView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/coursesTemplate.html")),
        noContentTemplate: require("text!../templates/noCourses.html"),
        el: false,
        events: {
            "keypress #search-input": "searchCoursesOnEnter",
            "click #search-button": "searchCoursesOnClick",
            "click .remove-search": "clearSearchInput"
        },
        beforeRender: function() {
            this.renderList();
        },
        afterRender: function() {
            if (_.isEmpty(this.collection.models)) {
                this.$el.find(".courses").html(this.noContentTemplate);
                this.$el.find("nav").remove();
            }
            if (this.collection.filterParams.s) {
                this.$el.find("#search-input").parent().append('<span class="glyphicon glyphicon-remove remove-search" aria-hidden="true"></span>');
                this.$el.find("#search-input").val(this.collection.filterParams.s);
            }
        },
        renderList: function() {
            this.collection.each(this.renderOne, this);
            this.insertView("nav", new PaginationView({collection: this.collection}));
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
                    Backbone.history.navigate(this.getPath()+"?s='"+$(e.target).val()+"'", {trigger: true});
                } else {
                    this.clearSearchInput();
                }
            }
        },
        searchCoursesOnClick: function(e) {
            e.preventDefault();
            var searchString = this.$el.find("#search-input").val();
            if (searchString) {
                Backbone.history.navigate(this.getPath()+"?s='"+searchString+"'", {trigger: true});
            } else {
                this.clearSearchInput();
            }
        },
        clearSearchInput: function() {
            Backbone.history.navigate(this.getPath(), {trigger: true});
        },
        serialize: function() {
            return {
                courseId: this.id,
            };
        },
        getPath: function() {
            var path = Backbone.history.location.hash;
            if (path !== "") {
                path = path.match(CMS.Helpers.RegexPatterns.rootPathRegex)[0];
            }
            return path;
        }
    });
    return View;
});