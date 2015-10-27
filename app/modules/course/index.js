define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/CoursesCollection"),
        Model: require("./models/CourseModel"),
        Views: {
            Course: require("./views/CourseView"),
            CourseDetails: require("./views/CourseDetailsView"),
            Courses: require("./views/CoursesView"),
            SideBar: require("./views/SidebarView")
        }
    };
});