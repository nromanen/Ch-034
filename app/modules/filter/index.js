define(function(require){
    return {
        Collection: {
            Areas: require("./collections/AreasFilter"),
            Groups: require("./collections/GroupsFilter")
        },
        Views: {
            Filter: require("./views/filterView")
        }
        
    };
});