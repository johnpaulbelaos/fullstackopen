import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const usersSlice = createSlice({
  name:'users',
  initialState: [],
  reducers: {
    setUsers (state, action) {
      return action.payload
    },
    addBlogToUser (state, action) {
      const id = action.payload.user.id
      const user = state.find(s => s.id === id)
      const blog = {
        title: action.payload.title,
        author: action.payload.author,
        url: action.payload.url,
        likes: action.payload.likes,
        id: action.payload.id
      }
      const updatedUser = {...user, blogs: user.blogs.concat(blog)}
      return state.map(s => s.id === id ? updatedUser : s)
    },
    removeBlogFromUser (state, action) {
      const {blogId, userId} = action.payload
      const user = state.find(s => s.id === userId)
      const updatedUser = {...user, blogs: user.blogs.filter(b => b.id !== blogId)}
      return state.map(s => s.id === userId ? updatedUser : s)
    }
  }
})

export const { setUsers, addBlogToUser, removeBlogFromUser } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll() 
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer