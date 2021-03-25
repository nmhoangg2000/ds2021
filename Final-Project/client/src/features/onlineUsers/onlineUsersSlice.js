import { createSlice } from '@reduxjs/toolkit'

export const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addConnection } = onlineUsersSlice.actions

export default onlineUsersSlice.reducer