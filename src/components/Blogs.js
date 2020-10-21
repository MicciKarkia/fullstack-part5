import React from 'react'
import Blog from './Blog'
import Notification from './Notification'


const Blogs = ({ 
  blogs, 
  user, 
  handleLogout, 
  notificationMessage,
  blogForm
 }) => {

  

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.filter(blog => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs