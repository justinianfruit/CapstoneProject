module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    // app.get('/login', function(req, res) {
    //     res.render('login.ejs', {message: req.flash('loginMessage')});
    // });
    // //app.post('/login', passport stuff);
    // app.get('/signup', function(req, res) {
    //     res.render('signup.ejs', {message: req.flash('signupMessage')});
    // });
    //app.post('/signup', passport stuff);
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {user: req.user});
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
};
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}