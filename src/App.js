import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef =useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ type: 'error', text: 'wrong username or password'})
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  

  const saveBlog = (newBlog) => {
    console.log('saving blog:', newBlog)
    blogService.create(newBlog)
    .then(returnedBlog => {
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({ type: 'success', text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })  
    .catch (error => {
      console.log(error)
      setNotificationMessage({ type: 'error', text: 'The blog was not saved. Try again, all fields are required!'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }) 
  }
  
  const blogForm = () => (
    <Togglable buttonLabelHidden="add new blog" buttonLabelVisible="cancel" button="addBlogButton" ref={blogFormRef}>
      <BlogForm saveBlog={saveBlog} />
    </Togglable>
  )

  const updateLikes = (changedBlog) => {
      blogService
        .update(changedBlog.id, {
          user: changedBlog.user.id,
          likes: changedBlog.likes,
          author: changedBlog.author,
          title: changedBlog.title,
          url: changedBlog.url
        })
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : changedBlog)
          )
      })  
      .catch(error => {
        console.log(error)
      }) 
  }

  const deleteBlog = (blogToDelete) => {
    blogService
      .remove(blogToDelete.id)
      .then(response => {
        console.log(response)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        setNotificationMessage({ type: 'success', text: `${blogToDelete.title} was deleted`})
        setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  
  return (
    <>
    {user === null ?
      <Login 
        handleLogin={handleLogin}
        username={username}
        password={password}
        notificationMessage={notificationMessage}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      /> :
      <Blogs 
        initialBlogs={blogs} 
        user={user}
        handleLogout={handleLogout} 
        saveBlog={saveBlog}
        notificationMessage={notificationMessage}
        blogForm={blogForm}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
    }
    </>
  )
}

export default App