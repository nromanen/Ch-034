var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,

ModuleSchema = new Schema({
    title: {
        type: String,
        required: "Please fill module title",
    },
    description: {
        type: String,
        default: ""
    },
    _course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    _resources: [{
        type: Schema.Types.ObjectId,
        ref: "Resource"
    }]
})

module.exports = mongoose.model('Module', ModuleSchema);