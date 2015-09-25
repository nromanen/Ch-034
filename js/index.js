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
            this.language = "en";
            localStorage.setItem("RegistrationFormLang", "en");

        }
        
        new RegistrationApp.View(this.language);
        
    }
});

RegistrationApp.View = Backbone.View.extend({
    el: "#registrationApp",

    initialize: function(language) {
        //this.$el = this.$el.translator(language);
        console.log(language);
        this.render();
    },

});