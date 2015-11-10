var crypto = require( "crypto" ),
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
        }
    });

    userSchema.methods.hashedPassword = function ( password ) {
        return crypto.createHmac( "md5", "SALT" ).update( password ).digest( "hex" );
    }

    userSchema.methods.checkPassword = function ( password ) {
        return this.hashedPassword( password ) === this.password;
    }

    userSchema.virtual( "password" ).set( function ( password ) {
        this.password = this.hashedPassword( password );
    });

module.exports = mongoose.model( "User", userSchema );