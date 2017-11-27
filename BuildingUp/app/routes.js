module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function (req, res) {
        if (isLoggedIn) {
            res.render('profile');
        } else {
            res.render('landing');
        }
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        if (isLoggedIn) {
            res.render('profile', {user: req.user});
        } else {
            res.render('landing');
        }
    });

    app.get('/buildtool', isLoggedIn, function (req, res) {
        if (isLoggedIn) {
            res.render('buildtool');
        }
    });

    app.get('/chat', isLoggedIn, function (req, res) {
        if (isLoggedIn) {
            res.render('chat');
        } else { 
            res.render('landing');
        }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
};
function isLoggedIn(req, res) {
    var loggedStatus = false;
    if(req.isAuthenticated()) {
        loggedStatus = true;
    }
    return loggedStatus;
}