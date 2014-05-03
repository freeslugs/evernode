/**
 * Module dependencies
 */

var express = require('express'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	hostName = "http://sandbox.evernote.com"; 

var app = module.exports = express();

var options,oauth;
 options = {
    consumerKey: 'kkaliannan',
    consumerSecret: 'ec2b2a3c0b579321',
    callbackUrl : 'locahost:3000/api/callback',
    signatureMethod : "HMAC-SHA1",
};
oauth = OAuth(options);
oauth.request({'method': 'GET', 'url': hostName + '/oauth', 'success': success, 'failure': failure});

var verifier = <your verifier>;
var oauth_token = <your oauth token>;
var secret = <oauth secret from step 1>;
oauth.setVerifier(verifier);
oauth.setAccessToken([got_oauth,secret]);

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