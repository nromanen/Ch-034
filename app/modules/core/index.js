define(function(require) {
    "use strict";

    return {
        Collection: require("./collection"),
        View: require("./view"),
        Model: require("./model"),
        Event: require("./event"),

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