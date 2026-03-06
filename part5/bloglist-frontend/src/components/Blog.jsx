import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { likeBlog, deleteBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  if (!blog || !user) {
    return null
  }

  const canRemove = blog.user ? blog.user.username === user.username : true

  const incrementLike = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.setToken(user.token)
    dispatch(likeBlog(blog.id, changedBlog))
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      blogService.setToken(user.token)
      dispatch(deleteBlog(blog.id))
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
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        {blog.url} <br />
        {blog.likes} <button onClick={incrementLike}>likes</button><br />
        added by {blog.user.name || user.name} <br />
        {canRemove && <button onClick={handleDeleteBlog}>remove</button>}
      </p>
    </div>
  )
}

export default Blog
