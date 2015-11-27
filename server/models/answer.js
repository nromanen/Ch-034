var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,

AnswerSchema = new Schema({
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
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },    
    userAnswer: {
        type: String,
        required: "Please fill user answer"
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);