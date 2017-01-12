var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file

/*
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
*/
// https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/
module.exports = function(passport) {
  console.log(" in passport.js ");
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  console.log("DEBUG: passport  jwtFromRequest"+ opts.jwtFromRequest);
  opts.secretOrKey = config.secret;
  console.log("Payload? "+ opts);
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("DEBUG: payload received "+jwt_payload);
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
