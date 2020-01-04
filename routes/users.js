const express = require('express');
const router = express.Router();
const auth = require('../services/auth.services');
const HTTPStatus = require('http-status');
const User = require('../models/user')

router.post('/signup', async function signUp(req, res) {
    try {
        const user = await User.create(req.body);
        return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
});

router.post('/login', auth.authEmail, function login(req, res, next) {
    res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

    return next();
});

module.exports = router;