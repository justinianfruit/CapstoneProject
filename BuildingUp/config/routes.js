module.exports = function(app, mailer, fromEmail, fromPassword) {
    app.get('/', function (req, res) {
        res.render('profile');
    });

    app.get('/profile', function (req, res) {
        res.render('profile');
    });

    app.get('/buildtool', function (req, res) {
        res.render('buildtool', {
            mailer: mailer,
            from: fromEmail,
            password: fromPassword
        });
    });

    app.get('/chat', function (req, res) {
        res.render('chat');
    });
};