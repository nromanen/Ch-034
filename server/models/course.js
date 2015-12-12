var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var CourseSchema = new Schema({
    name: {
        type: String,
        required: "Будьласка перевірте назву курсу",
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
    publish_at: {
        type: Date,
        default: Date.now
    },
    unpublish_at: {
        type: Date,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
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
    }],
    _modules: [{
        type: Schema.Types.ObjectId,
        ref: "Module"
    }]
}, {
    toObject: {
        virtuals: true
    }
});
CourseSchema.pre("save", function(next){
    now = new Date();
    this.updated_at = now;
    next();
});
CourseSchema.virtual('subscribed').get(function() {
    return this._subscribed;
});

CourseSchema.virtual('subscribed').set(function(subscribed) {
    return this._subscribed = subscribed;
});

CourseSchema.set('toObject', {
    getters: true
});
module.exports = mongoose.model("Course", CourseSchema);