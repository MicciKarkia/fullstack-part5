import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog'

const Blogs = ({ blogs, user, handleLogout, handleInputChange, saveBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      
      <h2>create new</h2>
      <AddBlog handleInputChange={handleInputChange} saveBlog={saveBlog}/>
      {blogs.filter(blog => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs