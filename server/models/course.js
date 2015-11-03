var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CourseSchema = new Schema({
    name: {
        type: String,
        required: "Please fill course name",
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
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
    _area: {
        type: Schema.Types.ObjectId,
        ref: "Area"
    },
    _groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    _modules: [{
        type: Schema.Types.ObjectId,
        ref: "Module"
    }]
});
CourseSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});
module.exports = mongoose.model('Course', CourseSchema);