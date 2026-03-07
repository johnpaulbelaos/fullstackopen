import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import blogService from '../services/blogs'
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer"

import Button from './Button'

const Blog = ({ blog, user }) => {
  const [comment, setComment] = useState('') 

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      dispatch(deleteBlog(blog.id, blog.user.id))
      navigate('/')
    }
  }

  const handleComment = async event => {
    event.preventDefault()

    blogService.setToken(user.token)
    dispatch(addComment(blog.id, comment))

    setComment('')
  }

  const generateId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        {blog.url} <br />
        {blog.likes} <Button onClick={incrementLike}>likes</Button><br />
        added by {blog.user.name || user.name} <br />
        {canRemove && <Button onClick={handleDeleteBlog}>remove</Button>}
      </p>
      <h2>
        comments
      </h2>
      <form onSubmit={handleComment}>
        <label>
          <input 
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <Button type="submit">add comment</Button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={generateId()}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
