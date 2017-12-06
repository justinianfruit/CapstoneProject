module.exports = function(app, urlEncodedParser, mailer, fromEmail, fromPassword, passport, User, Project) {
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
        console.log(userOwns);
        var projects = [];
        for (i = 0; i < projects.length; i++) {
            // userOwns.push({
            //     title: projects[i].title.text,
            //     lastUpdate: project[i].updated,
            //     group: project[i].group.toString()
            // });
        }
        //console.log(userOwns);
        res.render('profile', {user: req.user, collection: userOwns});
    });

    //want to use the isVerified auth, not working
    app.get('/buildtool', isLoggedin, function (req, res) {
        var newProject = new Project();
        newProject.users.push(req.user.email);
        newProject.group = false;
        newProject.updated = Date();
        newProject.title = {
            text: 'Untitled',
            background: '#FFFFFF',
            foreground: '#000000',
            font: 'Alegreya Sans SC'
        };
        newProject.save(function (err) {
            if (err) throw err;
        });
        User.find(req.user._id, function (err, user) {
            if (err) return console.error(err);
            //user.projects.push(newProject._id);
        });
        res.render('buildtool', {user: req.user.name, project: newProject.id});
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
            html: '<p>You have been invited by /USER/ to collaborate on their project /PROJECT TITLE/. Click the following link to begin work!</p><br><a href="https://quid-proto-co.herokuapp.com/buildtool/' + req.project.id + '">/PROJECT TITLE/</a>'
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
        res.redirect('buildtool');
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
    if (req.project.users.includes(req.user.email)) {
        return next();
    } else {
        res.redirect('/');
    }
}