const express = require('express')

const router = express.Router()
const multer = require('multer')


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }

})

const upload = multer({ storage: storage })


// images route
router.post('/uploadImage', upload.single('file'), (req, res) => {
    try {
        res.status(200).json('Image uploaded successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
