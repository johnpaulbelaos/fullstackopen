import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

const sampleUser = {
  username: 'blogger'
}

const mockHandler = vi.fn()
const mockNotification = vi.fn() 

test('<NewBlog /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

  render(<NewBlog user={sampleUser} createBlog={mockHandler} setNotification={mockNotification} />)

  const input1 = screen.getByLabelText('title')
  const input2 = screen.getByLabelText('author')
  const input3 = screen.getByLabelText('url')
  const sendButton = await screen.findByText('create')

  await user.type(input1, 'Blog')
  await user.type(input2, 'John Blog')
  await user.type(input3, 'blog.com')
  await user.click(sendButton)

  console.log(mockHandler.mock.calls)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('John Blog')
  expect(mockHandler.mock.calls[0][0].url).toBe('blog.com')
})