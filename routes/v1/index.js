const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const authRoute = require('./auth.route')
const loginRoute = require('./login.route')
const blogRoute = require('./blog.route')

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/login',
        route: loginRoute,
    },
    {
        path: '/blog',
        route: blogRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;