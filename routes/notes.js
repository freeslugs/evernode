var async = require('async');

var Evernote = require('evernote').Evernote;
// var parse = require('./parse.js');
var config = require('../config.json');

module.exports = {
  getNotes: getNotes
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
          console.log('heelllo');
          console.log(noteObj);
          // console.log(noteList[i]);
          createNote(noteObj, function (note) {
            notesArray.push(note);
            callback();
          });     
        }, function(err){
          if(err) {
            console.log(err);
          }
          console.log("all done!");
          console.log(notesArray);
          res.json(notesArray);
        });
      });
    });
  } 
  else {
    res.redirect('/');
  }
};

function createNote (noteObj, cb) {
  noteStore.getNoteContent(noteObj.guid, function(err, response) {
    if(err) {
      console.log(err);
    }
    var note = {
      content : response,
      title: noteObj.title,
      author: user_id,
      id: noteObj.guid
    }
    cb(note);
  });
}