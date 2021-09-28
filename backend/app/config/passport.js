const config = require("../config/config.js");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../db");

let opts = {
  jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    console.log(`passport-jwt: JwtStrategy->payload`, payload);

    db.user
      .findByPk(payload.id)
      .then((user) => {
        console.log(`passport-jwt: JwtStrategy->findByPk`, user);

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
