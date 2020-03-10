const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../models/User");

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  }
});

// Passport Using Google Strategy takes 2 args
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      // options for the google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          username: profile.displayName,
          googleId: profile.id
        });
        user = await user.save();
      }
      done(null, user);
    }
  )
);
