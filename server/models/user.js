var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: Number,
    _courses: {
    	type: Schema.Types.ObjectId,
    	ref: 'Course'
    }
}));