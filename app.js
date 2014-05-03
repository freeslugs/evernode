/**
 * Module dependencies
 */

var express = require('express'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	hostName = "http://sandbox.evernote.com"; 

var app = module.exports = express();

var client = new Evernote.Client.new({
	consumerKey: 'kkaliannan',
	consumerSecret: 'ec2b2a3c0b579321',
  sandbox: true
});
client.getRequestToken('localhost:3000/api/callback', function(error, oauthToken, oauthTokenSecret, results) {
  // store tokens in the session
  // and then redirect to client.getAuthorizeUrl(oauthToken)
});

// Now you can make other API calls
var client = new Evernote.Client({token: oauthAccessToken});
var noteStore = client.getNoteStore();
notebooks = noteStore.listNotebooks(function(err, notebooks) {
  // run this code
});


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser()); 	
app.use(express.methodOverride()); 	
//app.use(app.router); – not sure if we need this

// development only
if (app.get('env') === 'development') {
	app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
	// TODO
};


/**
 * Routes
 */

// serve all asset files from necessary directories
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/partials", express.static(__dirname + "/public/partials"));
app.use("/lib", express.static(__dirname + "/public/lib"));

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.all("/*", function(req, res, next) {
	res.sendfile("index.html", { root: __dirname + "/public" });
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});