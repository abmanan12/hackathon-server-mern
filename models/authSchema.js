const mongoose = require('mongoose');

const AuthScema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        picture: String,
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('users', AuthScema);

module.exports = User;