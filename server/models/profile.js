var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var ProfileSchema = new Schema({
    email  : String,
    name   : String,
    surname: String,
    avatar : String,
    social: {
        phone   : String,
        skype   : String,
        linkedin: String,
        fb      : String,
        vk      : String
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("Profile", ProfileSchema);