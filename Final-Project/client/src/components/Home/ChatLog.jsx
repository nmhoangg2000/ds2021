import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../features/messages/messagesSlice'
import store from '../../store/index'

const ChatLog = props => {
  const dispatch = useDispatch();
  const chatZoneList = useSelector(state => state.onlineUsers)
  const chatZone = chatZoneList.find(chatZone => chatZone.connection.peer === props.username)
  
  let renderChatLog = ''
  if (chatZone !== undefined) { 
    const chatLog = chatZone.chatLog
    // console.log(chatLog)
    renderChatLog = chatLog.map(message => (
      <li key={chatZone.connection.peer}>{message}</li>
    ))
  } 

  useEffect(() => {
    window.addEventListener("mousedown", handleSendMessage);
    return () => {
      window.removeEventListener("mousedown", handleSendMessage);
    }
  }, [])
  const handleSendMessage = (e) => {
    const sendButton = document.getElementById('sendButton');
    if (e.target == sendButton) {
      const message = document.getElementById('messenger').value;
      console.log(message);
      // dispatch(sendMessage({
      //   username: chatZone.connection.peer,
      //   message: message
      // }))
      // chatZone.sendMessage("message");
      chatZone.test();
      chatZone.sendMessage(message);
      console.log(chatZone)
    }
  }
  
  return (
    <div className="chatlog-container">
      <div className="messages-container">
        {renderChatLog}
      </div>
      <div className="row">
          <textarea
              id="messenger"
              placeholder="Write message..."
              className="new-message-input-field"
          />
          <button className="send-message-button" id="sendButton">
              Send
          </button>
      </div>
    </div>
  )
}

export default ChatLog
