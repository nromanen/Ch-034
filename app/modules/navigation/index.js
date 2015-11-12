define(function(require){
    return {
        Collection: {
            NavLinks: require("./collections/NavLinksCollection"),
            PersonalLinks: require("./collections/PersonalLinksCollection"),
            TeacherLinks: require("./collections/TeacherLinksCollection")
        },
        Model: {
            UserModel: require("./models/UserModel")
        },
        View: {
            NavigationMenu: require("./views/headerNavigationMenuView")
        }
    };
});