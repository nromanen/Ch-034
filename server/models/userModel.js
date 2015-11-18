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
        hashedPassword: {
            type: String,
            required: true
        }
    });

    userSchema.methods.checkPassword = function ( password ) {
        return bcrypt.compareSync( password, this.hashedPassword );
    };

module.exports = mongoose.model( "User", userSchema );