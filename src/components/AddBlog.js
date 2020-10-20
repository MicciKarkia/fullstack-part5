import React from 'react'

const AddBlog = ({ saveBlog, handleInputChange }) => {
    return (
      <div>
        <div>
            title:
            <input name="title" onChange={handleInputChange} />
        </div>
        <div>
            author:
            <input name="author" onChange={handleInputChange} />
        </div>
        <div>
            url:
            <input name="url" onChange={handleInputChange} />
        </div>
        <div>
            <button onClick={saveBlog}>create</button>
        </div>
      </div>
    )
}

export default AddBlog