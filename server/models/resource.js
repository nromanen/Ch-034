var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

ResourceSchema = new Schema({
    type: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    _module: {
        type: Schema.Types.ObjectId,
        ref: "Module"
    },
})

module.exports = mongoose.model("Resource", ResourceSchema);