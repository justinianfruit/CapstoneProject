module.exports = function(app, urlEncodedParser, mailer, fromEmail, fromPassword, passport) {
    app.get('/', function (req, res) {
        res.render('landing');
    });
    
    app.get('/auth/google', passport.authenticate('google', 
        {
            scope: ['profile', 'email'],
            prompt: 'select_account'
        }
    ));

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'), 
        (req, res) => {
            res.redirect('/profile');
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/profile', function (req, res) {
        res.render('profile', {user: req.user});
    });

    app.get('/buildtool', function (req, res) {
        res.render('buildtool');
    });

    app.post('/sendInvite', urlEncodedParser, function(req, res) {
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: fromEmail,
                pass: fromPassword
            }
        });

        var mailOptions = {
            from: fromEmail,
            to: req.body.email,
            subject: 'Invitiation to Collaborate on Quid Proto Co!',
            html: '<p>You have been invited by /USER/ to collaborate on their project /PROJECT TITLE/. Click the following link to begin work!</p><br><a href="https://quid-proto-co.herokuapp.com">/PROJECT TITLE/</a>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.render('');
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.redirect('buildtool');
    });

    app.get('/chat', function (req, res) {
        res.render('chat');
    });
};

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('user authenticated');
        return next();
    } else {
        console.log('no authentication');
        res.redirect('/');
    }
}