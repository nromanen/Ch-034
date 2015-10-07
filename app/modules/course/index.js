define(function(require, exports, module) {
    "use strict";

    module.exports = {
        Collection: require("./collections/Courses"),
        Model: require("./models/Course"),
        Views: {
            Index: require("./views/ModuleView"),
            Course: require("./views/CourseView"),
            Courses: require("./views/CoursesView")
        }
    };
});