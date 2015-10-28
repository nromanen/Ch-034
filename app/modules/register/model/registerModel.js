define(function(require){
    "use strict";

    var CMS = require("CMS"),
        Model = CMS.Model.extend({
            defaults: {
            name       : null,
            surname    : null,
            email      : null,
            pass       : null,
            repeatPass : null
        },
            validate: function(attr, options) {
                var errors = [];
                if ( !attr.name ) {
                    errors.push( "name" );
                }
                if ( !attr.surname ) {
                    errors.push( "surname" );
                }
                if ( !attr.email ) {
                    errors.push( "email" );
                }
                if ( !attr.pass ) {
                    errors.push( "pass" );
                }
                if ( !attr.repeatPass ) {
                    errors.push( "repeatPass" );
                }
                return errors.length > 0 ? errors : false;
            }
        });
    return Model;
});