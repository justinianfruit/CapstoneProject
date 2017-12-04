var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var configAuth = require('./keys');

module.exports = function (passport) {
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
            callbackURL: '/auth/google/callback',
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({
                    googleId : profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.googleId = profile.id;
                        newUser.googleToken = token;
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
}