var Evernote = require('evernote').Evernote;
var parse = require('./parse.js');
var config = require('../config.json');
var callbackUrl = "http://localhost:3000/oauth_callback";

// home page
exports.getNotes = function(req, res) {  
  if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });

    var noteStore = client.getNoteStore();
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
      noteStore.findNotesMetadata(filter, 0, 15, specs, function(err, notes) {

        // Get data from each note
        console.log('notes');
        console.log(notes);
        var notes = notes.notes;

        for (var i = 0; i < notes.length; i++) {
          var noteObj = notes[i];
          noteStore.getNote(noteObj.guid, true, true, true, true, function(err, result) {
            var note = {
              content : result.content,
              title: result.title
            }
            notesArray.push(note);
          });
        };
      });
    });
  } 
  else {
    console.log('rendering html');
    res.render('index.html');
  }
  console.log(notesArray);
  return(notesArray);
};






// OAuth
exports.oauth = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
    if(error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    }
    else { 
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });

};

// OAuth callback
exports.oauth_callback = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getAccessToken(
    req.session.oauthToken, 
    req.session.oauthTokenSecret, 
    req.param('oauth_verifier'), 
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if(error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.redirect('/');
      }
    });
};

// Clear session
exports.clear = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};