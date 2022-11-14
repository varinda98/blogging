const express = require('express');
const router = express.Router();

const author=require('../control/authorcontrol')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createauthor',author.createAuthor)


module.exports = router;