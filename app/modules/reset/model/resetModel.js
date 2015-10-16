define( function ( require ) {
	"use sctrict";

	var CMS = require( "CMS" ),
		Model = CMS.Model.extend({
			defaults: {
				email: null
			},

			validate: function ( attr, options ) {
				var errors = [];

				if ( !attr.email ) {
					errors.push( { name: "email", message: "Помилка!Введіть e-mail." } );
				}

				if ( !attr.email.match( /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/ ) ) {
					errors.push( { name: "email", message: "Помилка!Введіть валідний e-mail." } );
				}

				return errors.length > 0 ? errors : false;
			}
		});

	return Model;
});