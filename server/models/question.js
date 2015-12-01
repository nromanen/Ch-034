var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

QuestionSchema = new Schema({
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
    question: {
        type: String,
        required: "Please fill question"
    },
    typeVariant: {
        type: Number,
        default: 0
    },
    variants: {
        type: Object
    },
    answer: {
        type: String
    }
});

module.exports = mongoose.model("Question", QuestionSchema);