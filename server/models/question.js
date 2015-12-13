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
    _test: {
        type: Schema.Types.ObjectId,
        ref: "Test"
    },    
    name: {
        type: String,
        required: "Будь ласка перевірте запитання"
    },
    typeVariant: {
        type: Number,
        default: 0
    },
    _variants: [{
        type: Schema.Types.ObjectId,
        ref: "Variant"
    }]
});

module.exports = mongoose.model("Question", QuestionSchema);