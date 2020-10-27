import React from 'react'
import Blog from './Blog'
import BlogDetails from './BlogDetails'
import Togglable from './Togglable'

const BlogList = ({ blogs, user, updateLikes, deleteBlog }) => {

    const blogList = (blog) => {
        return (
          <Togglable 
          //key={blog.id}
          buttonLabelHidden="view" 
          buttonLabelVisible="hide"
          buttonContainer="blogButtonContainer"
          button="blogButton"
          title={<Blog key={blog.id} blog={blog} />}
          content={<BlogDetails key={blog.id} blog={blog} user={user} updateLikes={updateLikes} deleteBlog={deleteBlog} />}
        >
        </Togglable>
        )}

    return (
        <div className="blogList">
            {blogs
                .map(blog =>
                    <div className="blog" key={blog.id}>
                      {blogList(blog)}
                    </div>
                )
            }
        </div>
    )
}

export default BlogList
