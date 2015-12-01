define(function(require) {
    "use strict";

    return {
        SessionModel: require("./models/SessionModel"),
        Collection: require("./collection"),
        View: require("./view"),
        Model: require("./model"),
        Event: require("./event"),
        Router: require("./router"),
        Helpers: {
            Messages: require('./helpers/messages'),
            RegexPatterns: require('./helpers/regexPatterns')
        },

        CoreView: require("./views/CoreView"),

        ModalView: require("./views/modalView"),

        Views: {
            Header: require("./views/HeaderView"),
            Container: require("./views/ContainerView"),
            Footer: require("./views/FooterView")
        },

        PageableCollection: require("./collections/PageableCollection"),
        PaginationView: require("./views/PaginationView")
    };
});