var RegistrationApp = {};

RegistrationApp.Router = Backbone.Router.extend({
    
    routes: {
        "": "index",
        ":lang": "index",
    },

    index: function (lang) {
        var locale = window.localStorage.getItem("RegistrationFormLang");
        if (lang) {
            this.language = lang;
            window.localStorage.setItem("RegistrationFormLang", lang);
        } else {
            locale ? (this.language = locale) :
            window.localStorage.setItem("RegistrationFormLang", "en");
        }

        $.i18n.setLng(this.language);
        new RegistrationApp.View();  
    }
});

RegistrationApp.View = Backbone.View.extend({
    el: "#registrationApp",

    events: {
        'click .lang': 'toggleLanguage'
    },

    initialize: function() {
    },

    toggleLanguage: function(e) {
        e.preventDefault();
        this.$('.lang').toggle();
        this.$el.i18n();
        RegistrationApp.router.navigate($(e.target).attr('href'));
    }
});