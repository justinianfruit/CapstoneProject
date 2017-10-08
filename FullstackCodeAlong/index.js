const express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

app.get('/', (req, res) => {
    res.send({ see: 'you later' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);