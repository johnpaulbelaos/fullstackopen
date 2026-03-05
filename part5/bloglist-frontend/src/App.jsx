import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { setBlogs, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blog }) => blog)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      const message = 'wrong username or password'
      dispatch(setNotification({ message, isError: true }, 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loadUser = () => {
    const user = localStorage.getItem('loggedBlogappUser')
    return user ? JSON.parse(user) : null
  }

  const createBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    dispatch(setBlogs(blogs.concat(returnedBlog)))
    setUser(loadUser())
  }

  const updateLike = async (id, blogObject) => {
    const likedBlog = await blogService.update(id, blogObject)
    dispatch(setBlogs(blogs.map(b => b.id === id ? likedBlog : b).sort((a, b) => b.likes - a.likes)))
  }

  const deleteBlog = async id => {
    await blogService.erase(id)
    dispatch(setBlogs(blogs.filter(b => b.id !== id)))
  }

  const loginForm = () => (
    <div>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login username={user.username} onClick={handleLogout} /> <br />
      <Togglable buttonLabel='create new blog' buttonLabel2='cancel' ref={blogFormRef}>
        <NewBlog user={user} createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateLike={updateLike} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
