const mongoose = require('mongoose');

const mongodb_URL = process.env.DB_URL

mongoose.connect(mongodb_URL)
    .then(() => {
        console.log('Connection Successful');
    })
    .catch(err => console.log(err));