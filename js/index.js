var RegistrationApp = {};

RegistrationApp.Router = Backbone.Router.extend({
    
    routes: {
        "": "index",
        ":lang": "index",
    },

    index: function (lang) {

        if (lang) {
            
            this.language = lang;
            window.localStorage.setItem("RegistrationFormLang", lang);
            console.log(this.language);
        } else {
            window.localStorage.getItem("RegistrationFormLang") ? (this.language = window.localStorage.getItem("RegistrationFormLang")) :
            window.localStorage.setItem("RegistrationFormLang", "en");
        }

        $.i18n.setLng(this.language);
        new RegistrationApp.View();  
    }
});

RegistrationApp.View = Backbone.View.extend({
    el: "#registrationApp",

    events: {

    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.i18n();
        return this;
    }

});