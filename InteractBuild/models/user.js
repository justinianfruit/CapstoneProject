const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: String,
    googleToken: String,
    name: String,
    email: String,
    imageURL: String,
    projects: []
});

module.exports = mongoose.model('User', userSchema);