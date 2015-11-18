var express = require( "express" ),
    router = express.Router(),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" ),
    bcrypt = require( "bcrypt-nodejs" ),
    User = require( "../models/userModel" );

router.get( "/", function ( req, res ) {
  User.find({}, function ( err, users ){
    if( err ) throw err;
    res.json( users );
  });
});

module.exports = router;