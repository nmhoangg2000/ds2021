import { createSlice } from '@reduxjs/toolkit'

export const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      state.push(action.payload)
    },
    removeConnection: (state, action) => {
      state = state.filter(chatZone => chatZone.connection.peer != action.payload)
    },
    reset: (state) => {
      state = []
    }
  }
})

export const { addConnection, removeConnection, reset } = onlineUsersSlice.actions

export default onlineUsersSlice.reducer