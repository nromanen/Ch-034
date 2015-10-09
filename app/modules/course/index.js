define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/CoursesCollection"),
        Model: require("./models/CourseModel"),
        Views: {
            Course: require("./views/CourseView"),
            Courses: require("./views/CoursesView")
        }
    };
});