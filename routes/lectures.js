var Lecture = require('../models/lecture');
var Note = require('../models/note');
var parser = require('./parser');

module.exports = {
	retrieveNotes: retrieveNotes 
}

function retrieveNotes(req, res) {

	var paramId = 'bd185701-783e-48ec-b6ed-5aaeebe3649e';

	Note.find({id: paramId}, function (err, note) { 	// Change to real variable later
	  if (err) return console.error(err);
	  console.log(note);
	  
	  var arr_arr = parser.construct_lecture_from_doc(note);
	  
	});
}


