const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    desc: {
        type: String,
        required: true,

    },
    imageURL: {
        type: String,

    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog