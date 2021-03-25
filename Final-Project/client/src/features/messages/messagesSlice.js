import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'



export const messagesSlice = createSlice({
  
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      // console.log(action.payload)
      state.push({ message: action.payload.message, owner:"peer" });
    },
    sendMessage: (state, action) => {
      console.log(action.payload)
      state.push({reciver: action.payload.username, chatLog:{ message: action.payload.message, owner: "self" }});
    }
  }
})

export const { addMessage, sendMessage } = messagesSlice.actions

export default messagesSlice.reducer