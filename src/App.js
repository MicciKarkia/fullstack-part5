import React, { useState, useEffect } from 'react'
//import Blog from './components/Blog'
//import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      setTimeout(() => {
        setNotificationMessage(null)
        setUsername('')
        setPassword('')
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

  const handleInputChange = (event) => {
    event.preventDefault()
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value})
    console.log(newBlog)
  }

  const saveBlog = (event) => {
    event.preventDefault()

    console.log('blog to save:', newBlog)
    
    blogService.create(newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '' })
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
        blogs={blogs} 
        user={user}
        handleLogout={handleLogout} 
        newBlog={newBlog}
        handleInputChange={handleInputChange}
        saveBlog={saveBlog}
        notificationMessage={notificationMessage}
      />
    }
    </>
  )
}

export default App