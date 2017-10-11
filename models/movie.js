const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
	title: String,
	director: String,
	characters: [String]
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;