import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ user, createBlog, setNotification }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {title: title, author: author, url: url}
    blogService.setToken(user.token)
    
    createBlog(blogObject)

    const message = `a new blog ${title} by ${author}`

    setTitle('') 
    setAuthor('')
    setUrl('')

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
