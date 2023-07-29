const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/authSchema');


// register route
router.post('/register', async (req, res) => {

    const { username, password, firstname, lastname, country } = req.body

    if (!username || !password || !firstname || !lastname || !country) {
        return res.status(422).json('Plz fill all fields properly')
    }

    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        req.body.password = hashPassword

        const userExist = await User.findOne({ username: username })

        if (userExist) {
            return res.status(404).json('User already exist')
        }
        else {

            const newUser = new User(req.body)

            const user = await newUser.save()

            const token = jwt.sign({ id: user._id, username: user.username },
                process.env.JWT_SECRET, { expiresIn: '1d' })

            res.status(200).json({ user, token })

        }


    } catch (error) {
        res.status(500).json(error)
    }

});


// login route
router.post('/login', async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(422).json('Plz fill all fields properly')
    }

    try {

        const user = await User.findOne({ username: username })

        if (user) {

            const passIsMatch = await bcrypt.compare(password, user.password)

            if (!passIsMatch) {
                res.status(400).json('Invalid Credentials')
            }
            else {

                const token = jwt.sign({ id: user._id, username: user.username },
                    process.env.JWT_SECRET, { expiresIn: '1d' })

                res.status(200).json({ user, token })
            }

        }
        else {
            return res.status(404).json('User not found')
        }

    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = router;