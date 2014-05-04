// ./models/note.js

// load the modules we need	
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var noteSchema =  new Schema({
	// GLOBALS
	name       : String,
    date       : Date,
    author     : String,
    content    : String                 
});

module.exports = mongoose.model('Note', noteSchema);