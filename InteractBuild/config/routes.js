var cookie = require('cookie-parser');

module.exports = function(app, urlEncodedParser, mailer, fromEmail, fromPassword, passport, User, Project) {
    app.use(cookie());
    var newProjectID = '';
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

    app.get('/profile', isLoggedin, function (req, res) {
        var userOwns = req.user.projects;
        res.render('profile', {user: req.user, collection: userOwns});
    });

    //want to use the isVerified auth, not working
    app.get('/buildtool', isLoggedin, function (req, res) {
        if (req.query.id) {
            if (Project.findById(req.query.id)) {
                res.render('buildtool', {userID: req.user.id, username: req.user.name, project: req.query.id});
            } else {
                res.redirect('/');
            }
        } else {
            var newProject = new Project();
            newProject.users.push(req.user.email);
            newProject.group = false;
            var date = new Date();
            var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            newProject.updated = dateString;
            newProject.title = {
                text: 'Untitled',
                background: '#FFFFFF',
                foreground: '#000000',
                font: 'Alegreya Sans SC'
            };
            newProject.save(function (err) {
                if (err) throw err;
            });
            User.findById(req.user.id, function (err, user) {
                if (err) return console.error(err);
                user.projects.push({
                    id: newProject.id,
                    title: newProject.title.text,
                    created: newProject.updated,
                    updated: newProject.updated
                });
                user.save(function(err) {
                    if (err) throw err;
                });
            });
            res.render('buildtool', {userID: req.user.id, username: req.user.name, project: newProject.id});
        }
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
            html: '<p>You have been invited to collaborate on their project. Click the following link to begin work!</p><br><a href="https://quid-proto-co.herokuapp.com/buildtool?id=' + req.query.id + '">' + req.query.id + '</a>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.render('');
            } else {
                req.project.group = true;
                console.log('Email sent: ' + info.response);
            }
        });
        res.redirect('/buildtool?id=' + req.query.id);
    });

    app.get('/chat', isLoggedin, function (req, res) {
        res.render('chat');
    });
};

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

function isVerified(req, res, next) {
    if (Project.find({users: req.user.email})) {
        return next();
    } else {
        res.redirect('/');
    }
}