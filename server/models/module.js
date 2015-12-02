var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

ModuleSchema = new Schema({
    title: {
        type: String,
        required: "Будьласка перевірте назву модулю",
    },
    description: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: false
    },
    result: {
        type: Number
    },
    numberOfTests: {
        type: Number
    },
    _course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    _tests: [{
        type: Schema.Types.ObjectId,
        ref: "Test"
    }],
    _resources: [{
        type: Schema.Types.ObjectId,
        ref: "Resource"
    }]
})

module.exports = mongoose.model("Module", ModuleSchema);