const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectId: String,
    users: [],
    group: Boolean,
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