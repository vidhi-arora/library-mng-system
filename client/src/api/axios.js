// const fs = require('fs');
// require("dotenv-webpack").config();
// if (app.get('env') == 'development') {
//     require('dotenv').config();
// }
import axios from 'axios';

// const port = process.env.PORT || 3500;
export const baseUrl = (process.env.NODE_ENV === "production") ? "https://library-mng-system.herokuapp.com" : `http://localhost:${process.env.PORT}`;

export default axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
})
