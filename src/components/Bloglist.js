import React from 'react'
import Blog from './Blog'
import BlogDetails from './BlogDetails'
import Togglable from './Togglable'

const BlogList = ({ user, blogs, handleAddLike }) => {

    return (
        <div className="blogList">
            {blogs
                .filter(blog => blog.user.username === user.username)
                .map(blog =>
                    <div className="blog" key={blog.id}>
                      <Togglable 
                        key={blog.id}
                        buttonLabelHidden="view" 
                        buttonLabelVisible="hide"
                        buttonContainer="blogButtonContainer"
                        button="blogButton"
                        title={<Blog key={blog.id} blog={blog} />}
                        content={<BlogDetails key={blog.id} blog={blog} handleAddLike={handleAddLike} />}
                      >
                      </Togglable>
                    </div>
                )
            }
        </div>
    )
}

export default BlogList