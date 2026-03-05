import { useState } from "react"
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { likeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user, deleteBlog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const canRemove = blog.user ? blog.user.username === user.username : true

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLike = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.setToken(user.token)
    dispatch(likeBlog(blog.id, changedBlog))
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      blogService.setToken(user.token)
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        {blog.likes} <button onClick={incrementLike}>likes</button><br />
        {blog.user.name || user.name} <br />
        {canRemove && <button onClick={handleDeleteBlog}>
          remove
        </button>}
      </div>
    </div>
  )
}

export default Blog
