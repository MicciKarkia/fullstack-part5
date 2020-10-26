import React from 'react'
import BlogList from './Bloglist'
import Notification from './Notification'


const Blogs = ({ 
  blogs, 
  user, 
  handleLogout, 
  notificationMessage,
  blogForm,
  handleAddLike
 }) => {

  

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      <BlogList user={user} blogs={blogs} handleAddLike={handleAddLike} />
    </div>
  )
}

export default Blogs