var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    _profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    _courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
});
UserSchema.pre("save", function (next) {
    var user = this;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, response) {
        if (err) {
            return callback(err);
        }
        callback(null, response);
    });
};
module.exports = mongoose.model("User", UserSchema);