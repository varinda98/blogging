const express = require('express');
const router = express.Router();

const author=require('../control/authorcontrol')
const bloges=require('../control/blogscontrol')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createauthor',author.createAuthor)

router.post('/CreateBloges',bloges.CreateBlogs)


module.exports = router;