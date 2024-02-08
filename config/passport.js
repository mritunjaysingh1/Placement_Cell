const passport = require("passport");
const User = require("../models/user");
const LocalStratergy = require("passport-local").Strategy;

// authentication using passport
passport.use(
  new LocalStratergy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, async function (err, user) {
        if (err) {
          console.log("error in finding the user", err);
          return done(err);
        }
        if (!user) {
          console.log("Invalid UserName or Password");
          return done(null, false);
        }

        // match the Password
        const isPassword = await user.isPasswordCorrect(password);

        if (!isPassword) {
          console.log("Invalid Username or Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing the user
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// deserializing the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user ---> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

// check if user authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // redirecting the user
  return res.redirect("/");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
