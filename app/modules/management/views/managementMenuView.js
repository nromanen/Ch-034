define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        managementModule = require("modules/navigation/index"),
        View = CMS.View.extend({
            template: _.template(require("text!../templates/managementMenuTemplate.html")),
            initialize: function(){
                this.courseMenu = new managementModule.Model(null,{slug: 'courses_menu'});
                this.testsMenu = new managementModule.Model(null,{slug: 'tests_menu'});
                this.listsMenu = new managementModule.Model(null,{slug: 'lists_menu'});
                this.menusMenu = new managementModule.Model(null,{slug: 'menus_menu'});
                this.usersMenu = new managementModule.Model(null,{slug: 'users_menu'});
            },
            beforeRender: function(){


                this.courseMenu.fetch().done($.proxy(function() {
                    this.insertView('#menus', new managementModule.Views.ManagementView({model: this.courseMenu}));
                }, this));
                this.testsMenu.fetch().done($.proxy(function() {
                    this.insertView('#menus', new managementModule.Views.ManagementView({model: this.testsMenu}));
                }, this));
                this.listsMenu.fetch().done($.proxy(function() {
                    this.insertView('#menus', new managementModule.Views.ManagementView({model: this.listsMenu}));
                }, this));
                this.menusMenu.fetch().done($.proxy(function() {
                    this.insertView('#menus', new managementModule.Views.ManagementView({model: this.menusMenu}));
                }, this));
                this.usersMenu.fetch().done($.proxy(function() {
                    this.insertView('#menus', new managementModule.Views.ManagementView({model: this.usersMenu}));
                }, this));
            },
            afterRender: function(){
                this.$el.find('.menus-accordion').collapse();
            }
        });

    return View;
});
