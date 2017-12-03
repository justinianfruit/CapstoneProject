const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    googleToken: String,
    name: String,
    email: String
});

mongoose.model('users', userSchema);