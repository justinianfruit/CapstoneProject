var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');
var configAuth = require('./keys');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: configAuth.googleClientID,
        clientSecret: configAuth.googleClientSecret,
        callbackURL: 'auth/google/callback'
    },
    async (token, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const user = await new User(
            { 
                googleId: profile.id,
                googleToken: token,
                name: profile.displayName,
                email: profile.emails[0].value
            }).save();
        done(null, user);
    }
));