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

app.use(['/api/login', '/api/signup'], authroutes);
app.use(['/api/getuserfine', '/api/getissuebooks', '/api/issued-books', '/api/getreturnbooks', '/api/search/:key', '/api/searchs/:key/:value',
    '/api//searchby/isbn/:key', '/api/delete-issue', '/api/request', '/api/getrequest', '/api/updaterequeststatus', '/api/getuserrequests',
    '/api/addbook', '/api/deletebook', '/api/updatebook'], userRoutes);

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
