import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const showNotification = (message, isError) => {
    setNotification({
      message: message,
      isError: isError
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const SortAndSetBlogs = blogs => {
    setBlogs(blogs.sort((a, b) => a.likes - b.likes))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      SortAndSetBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Logged in as ${user.name}`, false)
    } catch (exception) {
      showNotification(exception.toString(), true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    showNotification('Logged out', false)
  }

  const createBlog = (blog) => {
    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`Successfully added blog ${returnedBlog.title}`, false)
      })
    blogFormRef.current.toggleVisibility()
  }

  const addLike = (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    blogService
      .update(blog.id, newBlog)
      .then(updatedBlog => {
        const blogList = blogs.map(b => b.id === newBlog.id ? updatedBlog : b)
        SortAndSetBlogs(blogList)
      })
  }

  const removeBlog = (blog) => {
    blogService
      .remove(blog.id)
      .then(() => {
        const blogList = blogs.filter(b => b.id !== blog.id)
        SortAndSetBlogs(blogList)
        showNotification(`Removed blog ${blog.title}`, false)
      }).catch(error => {
        showNotification(error.toString(), true)
      })
  }

  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
        )}
      </div>
    </div>
  )
}

export default App