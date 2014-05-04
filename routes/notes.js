var async = require('async');

var Evernote = require('evernote').Evernote;
// var parse = require('./parse.js');
var config = require('../config.json');

var mongo = require('./mongo.js');

var Note = require('../models/note');

module.exports = {
  getNotes: getNotes, 
  getNoteById: getNoteById
}

var noteStore;
var user_id;

function getNotes(req, res) {
  if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    noteStore = client.getNoteStore();
    user_id = req.session.edamUserId;
    var notesArray = [];

    // Get all notebooks from user
    noteStore.listNotebooks(function(err, notebooks){
      req.session.notebooks = notebooks;
      var notebookId = notebooks[0].guid;    // Get notebook id 
      var filter = new Evernote.NoteFilter();
      filter['notebookGuid'] = notebookId;
      
      var specs = new Evernote.NotesMetadataResultSpec();
      specs.includeTitle = true;
      specs.includeCreated = true;

      // Get notes from each notebook
      noteStore.findNotesMetadata(filter, 0, 15, specs, function(err, result) {
        
        // Get data from each note
        async.forEachSeries(result.notes, function(noteObj, callback){
          createNote(noteObj, function (note) {
            notesArray.push(note);
            callback();
          });     
        }, function(err){
          if(err) {
            console.log(err);
          }
          console.log(notesArray);
          mongo.saveNotes(notesArray, function () {
            console.log('done!');
            res.json(notesArray);
          });
        });
      });
    });
  } 
  else {
    res.redirect('/');
  }
};


function getNoteById(req, res) {
  var noteId = req.param('noteId');
  console.log('noteId');
  console.log(noteId);
  Note.findById(noteId, function(err, note) {
    console.log('find note in db');
    if(err) { console.log('error')};
    res.json(note);
  });
}

function createNote (noteObj, cb) {
  noteStore.getNoteContent(noteObj.guid, function(err, response) {
    if(err) {
      console.log(err);
    }
    var formattedResponse = response;
    formattedResponse = formattedResponse.replace(/(<\/(div|ui|li)>)/ig,"\n");
    formattedResponse = formattedResponse.replace(/(<(li)>)/ig," - ");
    formattedResponse = formattedResponse.replace(/(<([^>]+)>)/ig,"");
    formattedResponse = formattedResponse.replace(/(\r\n|\n|\r)/gm," ");
    formattedResponse = formattedResponse.replace(/(\s+)/gm," ");

    var note = {
      content : formattedResponse,
      title: noteObj.title,
      author: user_id,
      id: noteObj.guid
    }
    cb(note);
  });
}