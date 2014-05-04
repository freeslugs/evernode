var Lecture = require('../models/lecture');
var Note = require('../models/note');
var parser = require('./parser');
var mongo = require('./mongo.js');

module.exports = {
	getLectures 	 : getLectures,
	createLecture 	 : createLecture, 
	getLectureById   : getLectureById

}

/**
This function creates a lecture from a given note
 */
function createLecture(req, res) {
	// The id of the note to transform, needs to be changed to real variable later with param
	var paramId = req.param('guid');
	console.log('paramID: ');
	console.log(paramId);
	Note.find({id: paramId}, function (err, notes) {
		if (err) return console.error(err);
	  	
	  	var note = notes[0];
		var parsedContent = parser.noteToLecture(note.content); 	// Parsed content. See parser.js
		
		var dbLecture = new Lecture(); 			// Lecture to be saved in DB
		
		dbLecture.title = note.title;
		dbLecture.authors.push(note.author);	// Add note author to list of authors
		
		for (var i = 0; i < parsedContent.length; i++) {
			var nodeContent = parsedContent[i];
			var node = {
				content : nodeContent,
				score 	: 0,
				author 	: note.author
			}
			dbLecture.sections.push(node);
		}
		
		var userId = req.session.edamUserId;
		mongo.saveLecture(dbLecture, userId, function() {
			console.log('dbLecture');
			console.log(dbLecture);
			res.json(dbLecture._id);
		});
	});
}

/**
 * Gives list of lectures with title, id & collaborators
 */
 function getLectures(req, res) {
 	Lecture.find(function(err, lectures) {
 		console.log(lectures);
 		if(err) {
 			console.log('error');
 		}
 		res.json(lectures);
 	});
 }

/**
 * Lecture (singuar): pass content bullets points + everything else
 */
function getLectureById(req, res) {
	var lectureID = req.param('id');

	Lecture.find({ id: lectureId}, function(err, lecture) {
		console.log(lecture);
		if(err) {
			console.log('error');
		}
		res.json(lecture);
	});
}

function mergeWithLecture(req, res) {
	var note = req.param('noteId');
	var lecture = req.param('lectureID');

	parser.merge_doc_into_lecture(note, lecture);

}

