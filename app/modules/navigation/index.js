define(function(require){
    return {
        Model: require("./models/LinkModel"),
        Views: {
            DefaultView: require("./views/DefaultView"),
            ManagementView: require("./views/managementMenuView")
        }
    };
});