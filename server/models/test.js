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
    name: {
        type: String,
        required: "Будь ласка перевірте назву тесту"
    },
    estimateMethod: {
        type: String,
        default: "simple"
    }
});

module.exports = mongoose.model("Test", TestSchema);