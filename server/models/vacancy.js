var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = mongoose.model('Vacancy', new Schema({
    name: String,
    url: String
}));