var App = App || {};

App.Helpers = {
    getStoredLang: function() {
        var lang;
        if (!window.localStorage.getItem("RegistrationFormLang")) {
            window.localStorage.setItem("RegistrationFormLang", "en");
            lang = "en";
        } else {
            lang = window.localStorage.getItem("RegistrationFormLang");
        }
        return lang;
    }
}

App.RegistrationView = Backbone.View.extend({
    el: "#registrationApp",

    events: {
        'click .lang': 'toggleLanguage'
    },

    initialize: function() {
        this.language = App.Helpers.getStoredLang();
        this.$(".lang:visible").data("language") == this.language ? this.$(".lang").toggle() : false;
        this.$el.i18n();
    },

    toggleLanguage: function(e) {
        e.preventDefault();

        this.language = $(e.target).data("language");
        window.localStorage.setItem("RegistrationFormLang", this.language);
        
        $.i18n.init({
            lng: this.language,
        }).done($.proxy(function(t){
            this.$el.i18n();
        }, this));
        this.$('.lang').toggle();
    }
});