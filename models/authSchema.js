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
        name: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        resetToken: Number,
        resetTokenExpiresAt: Number,
        // picture: String,
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('users', AuthScema);

module.exports = User;