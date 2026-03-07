import { useRef } from 'react'

import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

import styled from 'styled-components'

const List = styled.li`
  background: Gainsboro;
  marginBottom: 10em;
  paddingTop: 10em;
  paddingLeft: 2em;
  border: 2px solid #222831;
  border-radius: 3px;
`
const UL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const StyledLink = styled(Link)`
  &:visited {
    color: #393E46;
  }
`

const Blogs = ({ blogs, user }) => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='create new blog' buttonLabel2='cancel' ref={blogFormRef}>
        <NewBlog user={user} blogFormRef={blogFormRef} />
      </Togglable>
      <UL>
        {blogs.map(blog => 
          <List key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`}>
              {blog.title}
            </StyledLink>
          </List>
        )}
      </UL>
    </div>
  )
}

export default Blogs