import React from 'react'

export default function BlogCard({ blog }) {
    const { title, desc } = blog
    return (
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    )
}
