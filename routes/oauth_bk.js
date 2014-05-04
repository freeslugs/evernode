// var Evernote = require('evernote').Evernote;
// var callbackUrl = "http://localhost:3000/oauth_callback";

// module.exports = {
//   oauth: oauth,
//   oauth_callback: oauth_callback
// }

// /**
//   Login with evernote and oauth
//  */
// function oauth(req, res) {
//   var client = new Evernote.Client({
//     consumerKey: config.API_CONSUMER_KEY,
//     consumerSecret: config.API_CONSUMER_SECRET,
//     sandbox: config.SANDBOX
//   });

//   client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
//     if(error) {
//       req.session.error = JSON.stringify(error);
//       res.redirect('/');
//     } else { 
//       // store the tokens in the session
//       req.session.oauthToken = oauthToken;
//       req.session.oauthTokenSecret = oauthTokenSecret;
//       // redirect the user to authorize the token
//       // res.redirect();
//       res.redirect(client.getAuthorizeUrl(oauthToken));
//     }
//   });
// };

// // OAuth callback
// function oauth_callback(req, res) {
//   var client = new Evernote.Client({
//     consumerKey: config.API_CONSUMER_KEY,
//     consumerSecret: config.API_CONSUMER_SECRET,
//     sandbox: config.SANDBOX
//   });

//   client.getAccessToken(
//     req.session.oauthToken, 
//     req.session.oauthTokenSecret, 
//     req.param('oauth_verifier'), 
//     function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
//       if(error) {
//         console.log('error');
//         console.log(error);
//         res.redirect('/');
//       } else {
//         // store the access token in the session
//         req.session.oauthAccessToken = oauthAccessToken;
//         req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
//         req.session.edamShard = results.edam_shard;
//         req.session.edamUserId = results.edam_userId;
//         req.session.edamExpires = results.edam_expires;
//         req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
//         req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
//         res.redirect('/dashboard');
//       }
//     });
// };

// // Clear session
// exports.clear = function(req, res) {
//   req.session.destroy();
//   res.redirect('/');
// };