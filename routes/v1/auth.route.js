const express = require('express');
const router = express.Router();
const passport = require('passport')
const { userLogIn, register } = require('../../controllers/auth.controller')


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }, function (req, res, next) {
        res.send('Auth started');
    }))
router.post('/login', userLogIn)
router.post('/register', register)

router.get('/failed', (req, res, next) => {
    const destinationURL = `http://localhost:3000/`;
    res.redirect(destinationURL)
})

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failed', failureFlash: true }),
    function (req, res) {
        const { emails, id, name, displayName, photos, provider, } = req.user.profile

        const tokens = req.user.tokens
        const { refresh, access } = tokens

        const email = emails[0].value
        const photoUrl = photos[0].value
        const username = name.givenName

        const obj = {
            source: provider,
            username,
            displayName,
            photoUrl,
            email,
            id,
            access_token: access.token,
            refresh_token: refresh.token,
            expires: JSON.stringify(access.expires)
        }

        const queryString = Object.entries(obj)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        // Redirect to a URL with the query string
        const destinationURL = `/v1/auth/login/authenticated?${queryString}`;
        res.redirect(destinationURL)
    })

router.get('/login/authenticated', (req, res, next) => {
    const query = req.query
    const queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    const destinationURL = `http://localhost:3000/?${queryString}`;

    res.redirect(destinationURL)
})

module.exports = router