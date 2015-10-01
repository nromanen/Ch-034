require([
    "jquery", 
    "underscore", 
    "backbone"],

    function ($, _, Backbone) {
        console.log("Test output");
        console.log("$: " + typeof $);
        console.log("_: " + typeof _);
        console.log("Backbone: " + typeof Backbone);
    }
);