const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())

const dataRoutes = require("./controller/controllers")
app.use('/data', dataRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
    res.status(200);
});

module.exports = app
