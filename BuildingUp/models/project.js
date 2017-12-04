const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectId: String,
    users: [],
    title: {
        text: String,
        background: String,
        foreground: String,
        font: String
    },
    changeLog: [],
    chatLog: [],
    objects: []
});

module.exports = mongoose.model('Project', projectSchema);