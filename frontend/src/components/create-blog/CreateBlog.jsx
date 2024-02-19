
import { useState } from "react";
import "./createBlog.css"
import axios from "axios";


export default function CreateBlog() {
    const [blogForm, setBlogForm] = useState({
        title: "",
        desc: ""
    });
    const handleChange = (event) => {
        setBlogForm({
            ...blogForm,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await axios.post("http://localhost:3310/api/blog/create", blogForm, { withCredentials: true })
        console.log(res)
    }
    return (
        <div className="container1">
            <h1>Create New Blog</h1>
            <form onSubmit={handleSubmit}>
                <label className="blog-label" htmlFor="title">Titel</label>
                <input name="title" type="text" onChange={handleChange} required="true" />
                <label className="blog-label" htmlFor="desc">Description</label>
                <textarea name="desc" id="" cols="30" rows="10" onChange={handleChange} required="true" />
                <button>CREATE</button>
            </form>
        </div >

    )
}
