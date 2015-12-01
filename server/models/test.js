var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

TestSchema = new Schema({
    num: {
        type: Number,
        default: 0
    },
    _course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    _module: {
        type: Schema.Types.ObjectId,
        ref: "Module"
    },
    nameTest: {
        type: String,
        required: "Please fill test title"
    }
});

module.exports = mongoose.model("Test", TestSchema);