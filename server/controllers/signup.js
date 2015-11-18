var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    bcrypt = require( "bcrypt-nodejs" ),
    User = require( "../models/userModel" );

router.post( "/", function ( req, res ) {

    var name = req.body.name,
        surname = req.body.surname,
        email = req.body.email,
        hashedPassword = bcrypt.hashSync( req.body.password );

    User.findOne( { email: email }, function ( err, user ) {

        if ( err ) throw err;

        if ( user ) {

            res.status( 409 ).send({
                success: false,
                message: "User with this email is already registered"
            });

        } else {

            var user = new User({
                name: name,
                surname: surname,
                email: email,
                hashedPassword: hashedPassword
            });

            user.save(function ( err ) {

                if ( err ) throw err;
                console.log( "User created successfully!" );

                res.status( 200 ).send({
                    success: true,
                    message: "User created successfully!"
                });

            });
        }
    });
});

module.exports = router;