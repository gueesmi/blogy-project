const express = require('express')
const { createBlog, getBlog } = require('../controllers/blog.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()


//@desc create a new blog
//@route /blog
//@access Private 
router.post("/create", verifyToken, createBlog)
router.get("/", verifyToken, getBlog)





module.exports = router