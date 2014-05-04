// ./models/lecture.js

// load the modules we need	
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var lectureSchema =  new Schema({
	// GLOBALS
	title                  : String,
    authors                : [],
    sections               : [{
        content       : String,
        score         : Number,
        author        : String
    }]                  
});

module.exports = mongoose.model('Lecture', lectureSchema);