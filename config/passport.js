var passport = require('passport'),
EvernoteStrategy = require('passport-evernote').Strategy;

module.exports = passport.use(new EvernoteStrategy({
    consumerKey: 'kkaliannan',
    consumerSecret: 'ec2b2a3c0b579321',
    callbackURL: "http://127.0.0.1:3000/auth/evernote/callback"
  },
  function(token, tokenSecret, profile, done) {
  	console.log(token);
  	console.log(tokenSecret);
  	console.log(profile);
  	console.log(done);

    User.findOrCreate({ evernoteId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));