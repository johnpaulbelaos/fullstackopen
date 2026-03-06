import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
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

  // users store all existing user and is used in conjuction with individualUser to show individual user view
  const users = useSelector(({ users }) => users)
  const matchUser = useMatch('/users/:id')
  const individualUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null
  // user stores data of the current logged user
  const user = useSelector(({ user }) => user)

  const blogs = useSelector(({ blog }) => blog)
  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

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
      <Routes>
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<User user={individualUser} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} user={user} />} />
        <Route path='/' element={<Blogs blogs={blogs} user={user} /> } />
      </Routes>
    </div>
  )
}

export default App
