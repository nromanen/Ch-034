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

module.exports = mongoose.model( "User", userSchema );