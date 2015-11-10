var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    User = require( "../models/userModel" );

router.post( "/login", function ( req, res, next ) {

    var email = req.body.email,
        password = req.body.password;

    User.findOne( { email: email }, function ( err, user ) {
        if ( err ) {
            return next( err );
        }
        
        if ( user ) {
            if ( user.checkPassword( password ) ) {
                res.status( 200 );
                Backbone.router.navigate( "/courses" );
            } else {
                res.status( 409 );
            }
        } else {
            res.status( 409 );
        }
    });
});

module.exports = router;