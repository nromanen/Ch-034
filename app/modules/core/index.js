define(function(require) {
    "use strict";

    return {
        Collection: require("./collection"),
        View: require("./view"),
        Model: require("./model"),

        CoreView: require("./views/CoreView"),
        Views: {
            Header: require("./views/HeaderView"),
            Container: require("./views/ContainerView"),
            Footer: require("./views/FooterView")
        },

        PageableCollection: require("./collections/PageableCollection"),
        PaginationView: require("./views/PaginationView")
    };

});