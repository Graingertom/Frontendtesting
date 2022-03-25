const express = require('express');
const router = express.Router();

const Data = require("../model/dataModel")

router.get('/', (req, res) => {
    res.send(Data.All);
    res.status(200);
});

module.exports = router;
