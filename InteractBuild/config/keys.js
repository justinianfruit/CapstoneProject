if (process.env.NODE_ENV === 'production') {
    module.exports = {
        fromEmail: process.env.FROM_EMAIL,
        fromPassword: process.env.FROM_PASSWORD,
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        mongoURI: process.env.MONGO_URI,
        cookieKey: process.env.COOKIE_KEY,
        redirectDomain: process.env.REDIRECT_DOMAIN
    };
} else {
    module.exports = {
        fromEmail: 'donotreply.quidprotoco@gmail.com',
        fromPassword: '1116269a',
        googleClientID: '142524154743-s012j9k0nr22q5lh3kc2h582hukfoat8.apps.googleusercontent.com',
        googleClientSecret: 'XAiXdEXSnP0LNvran4zu7HMW',
        mongoURI: 'mongodb://jayfruit:password@ds125126.mlab.com:25126/quidprotoco-dev',
        cookieKey: 'kdljsfoierjsoidfmsldkmfsidjf',
        redirectDomain: 'http://localhost:3000'
    };
}