var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

VariantSchema = new Schema({
    num: {
        type: Number,
        default: 0
    },
    _question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    name: {
        type: String,
        required: "Будь ласка, заповніть варіант відповіді"
    },
    isCorrect: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Variant", VariantSchema);