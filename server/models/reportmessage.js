
var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

ReportSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    text: {
        type: String
    },
    file: {
        type: Buffer
    }
});

module.exports = mongoose.model("ReportForm", ReportSchema);
