import React from 'react'

const BlogForm = ({ newBlog, handleInputChange, saveBlog }) => {
    return (
      <div>
        <div>
            title:
            <input name="title" value={newBlog.title} onChange={handleInputChange} />
        </div>
        <div>
            author:
            <input name="author" value={newBlog.author} onChange={handleInputChange} />
        </div>
        <div>
            url:
            <input name="url" value={newBlog.url}  onChange={handleInputChange} />
        </div>
        <div>
            <button onClick={saveBlog}>create</button>
        </div>
      </div>
    )
}

export default BlogForm