var RegistrationApp = RegistrationApp || {};

RegistrationApp.Router = Backbone.Router.extend({
    
    routes: {
        "": "index",
        ":lang": "index",
    },

    index: function (lang) {
        if (lang) {
            this.language = lang;
            localStorage.setItem("RegistrationFormLang", lang);
        } else {
            localStorage.getItem("RegistrationFormLang") ? (this.language = localStorage.getItem("RegistrationFormLang")) :
            localStorage.setItem("RegistrationFormLang", "en");
        }

        new RegistrationApp.View(this.language);  
    }
});

RegistrationApp.View = Backbone.View.extend({
    el: "#registrationApp",

    initialize: function(language) {
    },

});