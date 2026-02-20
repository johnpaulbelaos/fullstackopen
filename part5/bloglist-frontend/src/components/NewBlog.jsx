import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ user, blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {title: title, author: author, url: url}
    blogService.setToken(user.token)
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setTitle('')
    setAuthor('')
    setUrl('')

    const message = `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
    setNotification({ message, isError: false })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input 
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input 
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input 
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlog
