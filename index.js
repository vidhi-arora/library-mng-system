// const fs = require('fs');
// require("dotenv-webpack").config();
// if (app.get('env') == 'development') {
//     require('dotenv').config();
// }

require('./Models/User');
require('./Models/fine');
require('./Models/issuedBooks');
require('./Models/returnedBooks')
require('./Models/books');
require('./Models/requestBook');

const express = require('express');
const mongoose = require('mongoose');
const authroutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const bodyparse = require('body-parser');
// const cors = require('cors');

const app = express();

const port = process.env.PORT || 3500;

// let corsOptions = {
//     origin: ["URL ALLOWED"]
// };

app.use(bodyparse.json());
// app.use(cors());    

app.use('/api/login', authroutes);
app.use('/api/signup', authroutes);

app.use('/api/getuserfine', userRoutes);
app.use('/api/getissuebooks', userRoutes);
app.use('/api/issued-books', userRoutes);
app.use('/api/search/:key', userRoutes);
app.use('/api/getreturnbooks', userRoutes);
app.use('/api/searchs/:key/:value', userRoutes);
app.use('/api/searchby/isbn/:key', userRoutes);
app.use('/api/delete-issue', userRoutes);
app.use('/api/request', userRoutes);
app.use('/api/getrequest', userRoutes);
app.use('/api/updaterequeststatus', userRoutes);
app.use('/api/getuserrequests', userRoutes);
app.use('/api/addbook', userRoutes);
app.use('/api/deletebook', userRoutes);
app.use('/api/updatebook', userRoutes);

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname + "client/build/index.html"));
    });
}

const dbUri = process.env.MONGODB_URI;
//ADD THE CONNECTION STRING MANUALLY IN dbUri for local development
mongoose.connect(dbUri);


module.exports = app.listen(port, () => {
    console.log("Server started at port " + port);
})


mongoose.connection.on('connected', () => {
    console.log("connected to mongo");
})

mongoose.connection.on('disconnected', () => {
    console.log("disconnected to mongo");
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})
