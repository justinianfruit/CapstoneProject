const express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

//clientID 680489762612-3l4jiib9kcmaeg7ciheemic2or5l9otc.apps.googleusercontent.com
//clientSecret qk7FhTKcI8daDtSqbnArKzk7

passport.use(new GoogleStrategy());

app.get('/', (req, res) => {
    res.send({ see: 'you later' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);