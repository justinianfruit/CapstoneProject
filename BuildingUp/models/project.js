const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    users: [],
    group: Boolean,
    updated: Date,
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