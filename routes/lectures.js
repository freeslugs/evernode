var Lecture = require('../models/lecture');
var Note = require('../models/note');
var parser = require('./parser');

module.exports = {
	retrieveNotes: retrieveNotes 
}

function retrieveNotes(req, res) {

	var paramId = '42fac1fd-5b2b-497e-8295-80055eb55a19';

	Note.find({id: paramId}, function (err, notes) { 	// Change to real variable later
		if (err) return console.error(err);
	  	console.log(notes);
	  
		var parsedArray = parser.noteToLecture(notes[0].content);
		res.json(parsedArray);
	});
	
}


