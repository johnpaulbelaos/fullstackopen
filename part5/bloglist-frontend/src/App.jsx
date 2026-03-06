import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import Login from './components/Login'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // users store all existing user and is used in conjuction with individualUser to showw individual user view
  const users = useSelector(({ users }) => users)
  const match = useMatch('/users/:id')
  const individualUser = match
    ? users.find(user => user.id === match.params.id)
    : null
  // user stores data of the current logged user
  const user = useSelector(({ user }) => user)

  const blogs = useSelector(({ blog }) => blog)

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Login /> <br />
      <Togglable buttonLabel='create new blog' buttonLabel2='cancel' ref={blogFormRef}>
        <NewBlog user={user} blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={individualUser} />} />
      </Routes>
    </div>
  )
}

export default App
