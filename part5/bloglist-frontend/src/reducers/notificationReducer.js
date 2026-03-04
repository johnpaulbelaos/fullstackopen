import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {message: null, isError: false},
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return {message: null, isError: false}
    }
  }
})

const { set, clear } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(set(notification))
    setTimeout(() => dispatch(clear()), time)
  }
}

export default notificationSlice.reducer
