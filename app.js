/**
 * Module dependencies
 */

var express = require('express'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	hostName = "http://sandbox.evernote.com",
	passport = require('passport'),
	// routes = require('./routes'),
	authentication = require('./routes/authentication'),
	notes = require('./routes/notes'),
	configDB = require('./config/database'),
	Evernote = require('evernote'),
	lectures = require('./routes/lectures');
	mongoose = require('mongoose');

var app = module.exports = express();
mongoose.connect(configDB.url)

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// app.use(passport.initialize());
app.use(express.session());
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
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/partials", express.static(__dirname + "/public/partials"));
app.use("/lib", express.static(__dirname + "/public/lib"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));

// JSON API
// app.get('/api/name', api.name);

// Routes
// app.get('/', routes.index);

//auth
app.get('/oauth', authentication.oauth);
app.get('/oauth_callback', authentication.oauth_callback);
app.get('/clear', authentication.clear);

// app.get('/lectures', lectures.noteToLecture);

//mongo
app.get('/notes', notes.getNotes);
app.get('/lectures', lectures.getLectures);
app.get('/createlecture', lectures.createLecture);
app.get('/getlecture', lectures.getLectureById);
app.get('/getnote', notes.getNoteById);
app.get('/merge', lectures.merge);


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
