// if (app.get('env') == 'development') {
//     require('dotenv').config();
// }
// const fs = require('fs');
// require("dotenv-webpack").config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const express = require('express');

const secret = process.env.SECRET || 'LIBRARY';

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    res.send(`auth = ${authorization}`);

    if (!authorization) res.status(422).send({ error: "you must be Logged in" });
    try {
        const token = authorization.replace('Bearer ', '');
        jwt.verify(token, secret, async (err, payload) => {
            if (err)
                return res.status(422).send({ error: "You must be logged in" });

            const { userId } = payload;
            const user = await User.findById(userId);

            req.user = user;

            next();
        });
    }
    catch (e) {
        console.log(e);
    }
}
