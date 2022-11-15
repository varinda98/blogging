const express = require('express');
const router = express.Router();

//////////////////////////~Import folder~////////////////////////
const author=require('../control/authorcontrol')
const bloges=require('../control/blogscontrol')

/////////////////////////~Router besed Api~//////////////////////
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/authors',author.createAuthor)

router.post('/blogs',bloges.CreateBlogs)

router.get('/blogs',bloges.getBlogs)

router.put('/blogs/:blogId',bloges.updateBlogs)

router.delete('/blogs/:blogId',bloges.deleteBlog)

router.delete('/blogs',bloges.deleteBlogs)

/////////////////////////~exports Modules~/////////////////////////////
module.exports = router;