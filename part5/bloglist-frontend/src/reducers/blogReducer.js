import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { addBlogToUser, removeBlogFromUser } from './usersReducer'

const blogSlice = createSlice({
  name:'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return [...state, action.payload]
    },
    like(state, action) {
      const id = action.payload.id
      const toLike = state.find(s => s.id === id)
      const liked = { ...toLike, likes: toLike.likes + 1}
      return state.map(s => s.id === id ? liked : s).sort((a, b) => b.likes - a.likes)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(s => s.id !== id)
    },
    comment(state, action) {
      const id = action.payload.id
      const comments = action.payload.comments
      const comment = comments[comments.length - 1]
      const blog = state.find(s => s.id === id)
      const commentedBlog = {...blog, comments: blog.comments.concat(comment)}
      return state.map(s => s.id === id ? commentedBlog : s)
    }
  }
})

const { setBlogs, createBlog, like, remove, comment} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs([...blogs].sort((a, b) => b.likes - a.likes)))
  }
}

export const appendBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlogToUser(newBlog))
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const changedBlog = await blogService.update(id, blog)
    dispatch(like(changedBlog))
  }
}

export const deleteBlog = (blogId, userId) => {
  return async (dispatch) => {
    await blogService.erase(blogId)
    dispatch(removeBlogFromUser({blogId, userId}))
    dispatch(remove(blogId))
  }
}

export const addComment = (id, content) => {
  return async(dispatch) => {
    const changedBlog = await blogService.createComment(id, content)
    dispatch(comment(changedBlog))
  }
}

export default blogSlice.reducer