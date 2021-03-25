import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../features/messages/messagesSlice'
import store from '../../store/index'

const ChatLog = props => {
  const dispatch = useDispatch();
  const chatZoneList = useSelector(state => state.onlineUsers)
  const [log, setlog] = useState([])
  let chatZone = [];
  if (props.username != undefined) {
    chatZone = chatZoneList.find(chatZone => chatZone.connection.peer === props.username);
  } 
  
  console.log(chatZone)
  useEffect(() => {
    window.addEventListener("mousedown", handleSendMessage);
    return () => {
      window.removeEventListener("mousedown", handleSendMessage);
    }
  }, [log])
  console.log(chatZone)
  let renderChatLog = ''
  if (chatZone != undefined) {
    renderChatLog = chatZone.chatLog.map(item => (
      <li key={chatZone.connection.peer}>{item.owner}: {item.message}</li>
    ))
  } 

  const handleSendMessage = (e) => {
    const sendButton = document.getElementById('sendButton');
    console.log(chatZone)
    if (e.target == sendButton) {
      const message = document.getElementById('messenger').value;
      document.getElementById('messenger').value = ''
      // console.log(chatZone)
      chatZone.test();
      chatZone.sendMessage(message);
      setlog(chatZone.chatLog)
      // setlog(chatZone.chatLog)
      console.log(chatZone.chatLog)
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
