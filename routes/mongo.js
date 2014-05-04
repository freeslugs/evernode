var Note = require('../models/note');
var async = require('async');

module.exports = {
  saveNotes: saveNotes
}

// home page
// 

function saveNotes(notes, callback) {
	async.forEachSeries(notes, function(note, cb) {
		var dbNote = new Note();
		dbNote.title 	= note.title;
		dbNote.content 	= note.content;
		dbNote.author 	= note.author;
		dbNote.id 		= 	note.id;

		Note.find({id: dbNote.id}, function(err, docs) {
			if(err) {
				console.log('error');
			}
			else if(docs.length) {
				dbNote.update({id: dbNote.id}, function() {
					cb();
				});
			}
			else {
				dbNote.save(function(err) {
					cb();
				});
			}
		});
	}, function(err) {
		callback();
	});
}