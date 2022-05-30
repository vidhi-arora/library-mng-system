// const fs = require('fs');
// require("dotenv-webpack").config();
// if (app.get('env') == 'development') {
//     require('dotenv').config();
// }
import axios from 'axios';

// const port = process.env.PORT || 3500;
export const baseUrl = "http://localhost:3500";

export default axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
})
