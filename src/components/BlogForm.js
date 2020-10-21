import React, {useState} from 'react'

const BlogForm = ({ saveBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setNewBlog({ ...newBlog, [event.target.name]: event.target.value})
    }

    const addBlog = async (event) => {
        event.preventDefault()
        console.log('blog to save:', newBlog)
        await saveBlog(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
      <div>
        <h2>create new</h2>

        <form onSubmit={addBlog}>
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
          <button type="submit">create</button>
        </form>
      </div>
    )
}

export default BlogForm