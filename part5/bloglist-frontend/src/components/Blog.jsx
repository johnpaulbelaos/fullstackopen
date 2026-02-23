import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLike = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.setToken(user.token)
    updateLike(blog.id, changedBlog)
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
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
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
