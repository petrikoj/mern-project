import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import User from "../models/userModel.js";
import passport from "passport";
dotenv.config();

// Create the options (extracting jason web token from the header)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

// Create the strategy including the options

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (error, user) {
    if (error) {
      return done(error, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

// Make passport use the strategy we created

const passportConfig = () => {
  passport.use(jwtStrategy);
};

export default passportConfig;
