var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var ProfileSchema = new Schema({
    email: String,
    name: {
        first: String,
        last: String
    },
    avatar: String,
    social: {
        phone: String,
        skype: String,
        linkedin: String,
        fb: String,
        vk: String
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    _courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
});
module.exports = mongoose.model("Profile", ProfileSchema);