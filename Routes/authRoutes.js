// require("dotenv").config();

const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');
const Fine = mongoose.model('Fine');
const jwt = require('jsonwebtoken');

const route = express.Router();
const secret = process.env.SECRET || 'LIBRARY';

// route.get('/', async (req, res) => {
//     res.send("urghhhhhhhhhhhhhhhh");
// })

route.post('/signup', async (req, res) => {
    const { name, signupEmail, signupPassword, role } = req.body;
    const Email = signupEmail.toLowerCase();

    if (!signupEmail || !signupPassword || !name)
        return res.status(422).send("Invalid Email or password ")
    // console.log(req.body);
    // const lwr_email = email.toLowerCase();

    try {
        const user = new User({ name, email: Email, password: signupPassword, role });
        await user.save();

        const fine = new Fine({ userId: user._id, fine: 0 });
        await fine.save();

        const token = jwt.sign({ userId: user._id }, secret);
        res.send({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(422).send("email already registered");
    }
})

route.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    const Email = loginEmail.toLowerCase();

    if (!loginEmail || !loginPassword)
        return res.status(422).send("invalid email or password");

    // const lwr_email = email.toLowerCase();
    const user = await User.findOne({ email: Email });
    // console.log(user);
    // console.log(Email);
    if (!user)
        return res.status(422).send("invalid email or password");
    // console.log(user);

    try {
        await user.comparePasswords(loginPassword);
        const token = jwt.sign({ userId: user._id }, secret);
        console.log(`token = ${token}`);
        return res.send({ user, token });
    }
    catch (err) {
        console.log(err);
        res.send("invalid email or password");
    }


})

module.exports = route;