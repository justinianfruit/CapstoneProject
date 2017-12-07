const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    users: [],
    group: Boolean,
    updated: String,
    title: {
        text: String,
        background: String,
        foreground: String,
        font: String
    },
    changeLog: [],
    chatLog: [],
    images: [],
    text: []
});

module.exports = mongoose.model('Project', projectSchema);