import React from 'react'

const BlogDetails = ({ blog, handleAddLike }) => (
  <div>
    <div>{blog.url}</div>
    <div>{blog.likes} likes <button onClick={() => handleAddLike(blog)}>like</button></div>
    <div>{blog.user.name}</div>
  </div>
)

export default BlogDetails