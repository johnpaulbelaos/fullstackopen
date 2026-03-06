import { useRef } from 'react'

import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

const Blogs = ({ blogs, user }) => {
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5
  }

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog' buttonLabel2='cancel' ref={blogFormRef}>
        <NewBlog user={user} blogFormRef={blogFormRef} />
      </Togglable>
      <ul style={listStyle}>
        {blogs.map(blog => 
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blogs