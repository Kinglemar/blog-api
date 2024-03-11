const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userService, tokenService } = require('../services/index')
const config = require('./config')

passport.use(new GoogleStrategy({
    clientID: config.google.client_id,
    clientSecret: config.google.client_secret,
    callbackURL: "http://localhost:4000/v1/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log({ accessToken, refreshToken })
        const { emails, id, name, displayName } = profile
        const { givenName } = name
        const email = emails[0].value
        try {
            let user = await userService.addGoogleUser({
                email, password: id, username: givenName, full_name: displayName,
            })
            let tokens = await tokenService.generateAuthTokens(user);

            if (user) {
                const response = {
                    profile,
                    tokens
                }
                return cb(null, response)
            }
            else {
                console.log('An error occured')
            }
        }
        catch (err) {
            return cb(err)
        }
    }
));