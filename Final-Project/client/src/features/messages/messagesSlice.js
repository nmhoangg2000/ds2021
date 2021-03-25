import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'



export const messagesSlice = createSlice({
  
  name: 'messages',
  initialState: [],
  reducers: {
    // addMessage: (state, action) => {
    //   const chatZoneList = useSelector(state => state.onlineUsers)
    //   const chatZone = chatZoneList.find(chatZone => chatZone.connection.peer == action.payload.username)
    //   chatZone.addMessage(action.payload.message)
    // },
    // sendMessage: (state, action) => {
    //   const chatZone = chatZoneList.find(chatZone => chatZone.connection.peer == action.payload.username)
    //   chatZone.sendMessage(action.payload.message)
    // }
  }
})

// export const { addConnection } = messagesSlice.actions

export default messagesSlice.reducer