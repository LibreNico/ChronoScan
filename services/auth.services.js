const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const passportJWT = require('passport-jwt');
const fs = require('fs');

// Local strategy
const localOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

// Jwt strategy
//http://travistidwell.com/jsencrypt/demo/ 
//>> watch out the key size must 512bit
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');

const jwtOpts = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKEY,
  issuer: 'Nicolas Crappe',
  subject: 'joggansgroup@gmail.com',
  audience: 'http://www.joggans.be',
  expiresIn: "48h",
  algorithm: "RS256"
};

const jwtStrategy = new passportJWT.Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }
    //Send the user information to the next middleware
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports.authEmail = passport.authenticate('local', { session: false });
module.exports.authJwt = passport.authenticate('jwt', { session: false });

