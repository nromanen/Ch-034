var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

module.exports = mongoose.model("Group", new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}));