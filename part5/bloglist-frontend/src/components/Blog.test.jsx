import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog',
  author: 'John Blog',
  url: 'blog.com',
  likes: 67,
  user: 123456789
}

const sampleUser = {
  username: 'blogger'
}

const mockHandler = vi.fn() 

test('renders title and author only at first', () => {
  render(<Blog blog={blog} user={sampleUser} updateLike={mockHandler} deleteBlog={mockHandler} />)

  const title = screen.getAllByText('Blog', { exact: false })
  const author = screen.getAllByText('John Blog', { exact: false })
  const url = screen.queryByText('blog.com')
  const likes = screen.queryByText('67')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes when toggled', async () => {
  render(<Blog blog={blog} user={sampleUser} />)

  const user = userEvent.setup()
  const button = await screen.findByText('view')
  await user.click(button)

  const url = screen.getByText('blog.com', { exact: false })
  const likes = screen.getByText('67', { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('like event handler is called twice when pressed twice', async () => {
  render(<Blog blog={blog} user={sampleUser} updateLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = await screen.findByText('likes')
  await user.click(button)
  await user.click(button)

expect(mockHandler.mock.calls).toHaveLength(2)
})


