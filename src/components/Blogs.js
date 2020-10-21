import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'

const Blogs = ({ blogs, user, handleLogout, newBlog, handleInputChange, saveBlog, notificationMessage }) => {
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      
      <h2>create new</h2>
      <BlogForm newBlog={newBlog} handleInputChange={handleInputChange} saveBlog={saveBlog}/>
      {blogs.filter(blog => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs