define(function(require) {
    "use strict";

    var View = require("../view"),
    NavigationModule = require("../../navigation/index"),

    HeaderView = View.extend({
        template: _.template(require("text!../templates/headerTemplate.html")),
        el: false,
        initialize: function(){
            var navLinks, personalLinks, userModel, teacherLinks, MenuView, userType;
            MenuView = NavigationModule.View.NavigationMenu;
            userModel = new NavigationModule.Model.UserModel();
            userModel.fetch({success: function(){
                userType = userModel.get('userType');
            }});

            personalLinks = new NavigationModule.Collection.PersonalLinks();

            navLinks = new NavigationModule.Collection.NavLinks();
            navLinks.fetch({success: function(){
                if ('teacher' === userType) {
                    teacherLinks = new NavigationModule.Collection.TeacherLinks();
                    teacherLinks.fetch({success: function(){
                        _.each(teacherLinks.models, function(element){
                            navLinks.add(element);
                        });
                    }});
                }
            }});

            this.navMenu = new MenuView({
                    collection: navLinks,
                    menuName: "Меню",
                    links: navLinks
                });

            this.personalMenu = new MenuView({
                collection: personalLinks,
                user: userModel,
                links: personalLinks
            });

        },
        afterRender: function(collection){
            this.insertView(".navigation-menu", this.navMenu);
            this.insertView(".personal-menu", this.personalMenu);
        }

    });
    return HeaderView;
});