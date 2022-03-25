const express = require('express')
const app = express()

const dataRoutes = require("./controller/controllers")
app.use('/data', dataRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
    res.status(200);
});

module.exports = app
