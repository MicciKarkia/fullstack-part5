import React from 'react'

const BlogDetails = ({ blog, user, updateLikes, deleteBlog }) => {

  const handleAddLike = (event) => {
    event.preventDefault()
    updateLikes({...blog, likes: blog.likes +1})
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  const removeButtonForUser = () => {
    if (user.username === blog.user.username) {
      return (
        <button className="remove" onClick={handleRemoveBlog}>remove</button>
      )
    }
  }
    
  

  return (
  <div>
    <div>{blog.url}</div>
    <div>{blog.likes} likes <button onClick={handleAddLike}>like</button></div>
    <div>{blog.user.name}</div>
    {removeButtonForUser()}
  </div>
  )
}

export default BlogDetails