define(function(require) {
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Backbone = require("backbone"),
        CMS = require("./modules/core/index"),
        Layout = require("backbone.layoutmanager"),
        Validation = require("backbone.validation");
        require("bootstrap");

    _.extend(CMS, {
        root: "/",
        guestPages: ["#login", "#register", "#reset"],
        api: "http://localhost:8888/api/",
        userRoles: {
            user: {
                name: "Користувач",
                type: 0
            },
            teacher: {
                name: "Вчитель",
                type: 1
            },
            admin: {
                name: "Адміністратор",
                type: 2
            }
        },
        perPage: 3,
        paginationSize: 5,
        typeTest: {
            list   : 0,
            answer : 1,
            few    : 2
        },
        btnTestView: {
            nextQuestion : 0,
            close        : 1,
            open         : 2
        },
        embeddable: ['avi', 'mp4', 'video'],
        downloadable: ['zip', 'pdf', 'rar', 'doc', 'docx']
    });

    return CMS;
});
