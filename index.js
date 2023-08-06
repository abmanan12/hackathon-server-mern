require('dotenv').config();
require('./db/connect');

const express = require('express');
const app = express();


app.use(express.json({
    credentials: true
}));


const cors = require('cors');
app.use(cors());


app.use(express.static('public'))
app.use('/images', express.static('images'))


app.use(require('./routes/authRoute'))
app.use(require('./routes/imageRoute'))
app.use(require('./routes/produtRoute'))


app.listen((process.env.PORT), () => {
    console.log('Server listening on port', process.env.PORT);
})