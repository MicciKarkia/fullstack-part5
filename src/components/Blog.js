import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <div className="blogTitle">{blog.title} {blog.author}</div>
  </div>
)

export default Blog
