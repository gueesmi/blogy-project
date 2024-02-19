import axios from 'axios';
import { useEffect, useState } from 'react'
import BlogCard from './BlogCard';

export default function BlogList() {
    const [blogs, setBlogs] = useState({
        blogs: [],
        isLoading: false,

    });
    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await axios.get("http://localhost:3310/api/blog/", { withCredentials: true })
            setBlogs({
                blogs: blogs.data,
                isLoading: false
            })
        }
        fetchBlogs()
    }, [])

    return (
        <div>
            <h1>List Of Blogs</h1>
            <div>
                {blogs.blogs.map((blog) => (<BlogCard key={blog._id} blog={blog} />))}
            </div>
        </div>
    )
}
