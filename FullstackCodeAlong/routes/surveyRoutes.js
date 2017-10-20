const mongoose = require('mongoose');
const requireLogin = require('../middleswares/requireLogin');

const Email = mongoose.model('emails');

module.exports = app => {
    app.post('/api/surveys', requireLogin, (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new survey({
            title, 
            subject, 
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
    });
};