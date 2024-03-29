var Lecture = require('../models/lecture');
var Note = require('../models/note');
var parser = require('./parser');
var mongo = require('./mongo.js');

module.exports = {
	getLectures 	 : getLectures,
	createLecture 	 : createLecture, 
	getLectureById   : getLectureById, 
	merge 		     : merge
}

/**
This function creates a lecture from a given note
 */
function createLecture(req, res) {
	// The id of the note to transform, needs to be changed to real variable later with param
	var paramId = req.param('guid');
	if(paramId) {	
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
	else
		res.json('error: please specify guid in url request');
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
	var lectureId = req.param('lectureId');
	console.log('lectureId');
	console.log(lectureId);
	Lecture.findById(lectureId, function(err, lecture) {
		console.log('find lecture in db');
		if(err) { console.log('error')};
		
		res.json(lecture);
	});
}

function merge(req, res) {
		
	var noteId = req.param('noteId');
	var lectureId = req.param('lectureId');

	console.log('noteId');
	console.log(noteId);

	console.log('lectureId');
	console.log(lectureId);

	console.log('merging');
	// res.json('merging');

	// Get note from db
	
	Note.findById(noteId, function(err, note) {
		// console.log('looking for note in db');
		// console.log(note);
		Lecture.findById(lectureId, function(err, lecture) {
		// 	console.log('looking for lecture in db');
			// res.json(lecture);
			var updatedContent =  parser.merge_doc_into_lecture(lecture.sections, note.content);
			console.log('updatedContent');
			console.log(updatedContent);
			res.json(updatedContent);
			// lecture.update({sections: updatedLecture});
		});
	});
}