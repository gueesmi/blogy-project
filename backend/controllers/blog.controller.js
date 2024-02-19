const Blog = require("../models/Blog.model")

//@desc create a new blog
//@route /blog
//@access Private 
const createBlog = async (req, res) => {
    const blogData = req.body
    const { id } = req.user
    try {

        const blog = await new Blog(blogData)
        blog.userId = id
        const data = await blog.save()
        res.status(200).json({
            message: "blog created",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getBlog = async (req, res) => {
    const { id } = req.user
    try {
        const data = await Blog.find({ userId: id })
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { createBlog, getBlog }