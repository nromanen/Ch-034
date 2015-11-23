var bcrypt = require( "bcrypt-nodejs" ),
    mongoose = require( "mongoose" ),
    Schema = mongoose.Schema,
   
    userSchema = new Schema({
        name: {
            type: String
        },
        surname: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "student",
            required: true
        }
    });

userSchema.pre( "save", function ( next ) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified( "password" ) ) return next();

    bcrypt.genSalt( 10, function ( err, salt ) {
        if ( err ) return next( err );

        bcrypt.hash( user.password, salt, null, function( err, hash ) {
            if ( err ) return next( err );

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.checkPassword = function( reqPassword, cb ) {
    bcrypt.compare( reqPassword, this.password, function( err, isMatch ) {
        if ( err ) return cb( err );

        cb( null, isMatch );
    });
};

module.exports = mongoose.model( "User", userSchema );