import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name:'user',
  initialState: null,
  reducers: {
    setUser (state, action) {
      return action.payload
    }
  }
})

const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch {
      const message = 'wrong username or password'
      dispatch(setNotification({ message, isError: true }, 5000))
    }
  }
}

export const loadUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
}

export default userSlice.reducer