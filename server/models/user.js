var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	email: String,
    fullName: String,
    password: String,
    role: {
    	type: Number,
    	default: 0
    },
    _courses: {
    	type: Schema.Types.ObjectId,
    	ref: 'Course'
    }
}));