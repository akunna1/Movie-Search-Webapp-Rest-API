// The mongoose library is an ODM (Object Data Modeling) tool for MongoDB
const mongoose = require('mongoose');

// Creating schema for movie model
const movieSchema = new mongoose.Schema({
    name: {type: String, required:true},
    img: {type: String, required:true},
    year: {type: [String], required:true},
    rating: {type: Number, required:true},
});

// This creates a Mongoose model named 'movie' using the schema movieSchema
// The movie model will represent the movies collection in the MongoDB database
module.exports = mongoose.model('movie', movieSchema);