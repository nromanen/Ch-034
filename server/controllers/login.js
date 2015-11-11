var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    crypto = require( "crypto" ),
    User = require( "../models/userModel" );

router.post( "/login", function ( req, res, next ) {

    var name = req.body.name,
        password = req.body.password;

    User.findOne( { name: name }, function ( err, user ) {

        if ( err ) {

            return next( err );
        }

        if ( user ) {

            if ( user.password != password ) {

                res.json( { success: false, message: "Authentication failed. Wrong password." } );
                
            } else {

                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }       

        }

    });
});

module.exports = router;