import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

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
    }
  }
})

export const { setBlogs, createBlog, like } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs([...blogs].sort((a, b) => b.likes - a.likes)))
  }
}

export const appendBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const changedBlog = await blogService.update(id, blog)
    dispatch(like(changedBlog))
  }
}

export default blogSlice.reducer