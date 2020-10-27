import React from 'react'
import BlogList from './Bloglist'
import Notification from './Notification'


const Blogs = ({ 
  initialBlogs, 
  user, 
  handleLogout, 
  notificationMessage,
  blogForm,
  blogList,
  updateLikes,
  deleteBlog
 }) => {

  

  /*const userBlogs = initialBlogs.filter(blog => {
    return blog.user.username === user.username
  }).sort((a,b) => b.likes - a.likes)*/

  const blogs = initialBlogs.sort((a,b) => b.likes - a.likes)

  console.log(blogs)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      <BlogList blogs={blogs} user={user} blogList={blogList} updateLikes={updateLikes} deleteBlog={deleteBlog} />
    </div>
  )
}

export default Blogs
