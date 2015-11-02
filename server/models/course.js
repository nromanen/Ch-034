var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = mongoose.model('Course', new Schema({
    name: {
        type: String,
        required: "Please fill course name",
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    startAt: {
        type: Date,
        default: Date.now
    },
    endAt: {
        type: Date,
    },
    duration: {
        type: Number,
    },
    schedule: {
        type: Array
    },
    minStudents: {
        type: Number
    },
    applicantsNumber: {
        type: Number,
    },
    image: {
        type: String
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: "Area"
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }]
}));