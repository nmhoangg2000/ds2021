import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../features/messages/messagesSlice'
import store from '../../store/index'

const ChatLog = props => {
  const dispatch = useDispatch();
  const chatZoneList = useSelector(state => state.onlineUsers)
  const [log, setlog] = useState([])
  // let renderChatLog = '';
  if (props.username) {
    console.log('have')
    var chatZone = chatZoneList.find(chatZone => chatZone.connection.peer === props.username);
    console.log(chatZone)
  } else {
    console.log('dhave')
    var chatZone = {connection: {}, chatLog: []};
  }
  
  console.log(chatZone)
  useEffect(() => {
    console.log(log)
    console.log(chatZone)
    window.addEventListener("mousedown", handleSendMessage);
    return () => {
      window.removeEventListener("mousedown", handleSendMessage);
    }
  }, [log, chatZone])

  // console.log(chatZone)
  const handleSendMessage = (e) => {
    const sendButton = document.getElementById('sendButton');
    console.log(chatZone)
    if (e.target == sendButton) {
      const message = document.getElementById('messenger').value;
      document.getElementById('messenger').value = ''
      console.log(chatZone)
      chatZone.sendMessage(message);
      setlog(!log)
    }
  } 
  const renderChatLog = (chatZone) => {
    let log = ''
    console.log("RENDER")
    if (chatZone.chatLog) {
      chatZone.chatLog.map(item => {
        if (item.owner === "self") {
          log += `<li key=${chatZone.connection.peer} class="sender">${item.owner}: ${item.message}</li>`
        } 
        if (item.owner === "peer") {
          log += `<li key=${chatZone.connection.peer} class="receiver">${item.owner}: ${item.message}</li>`
        } 
    }) 
  }
  if (document.getElementById('chatLogList')) {
    document.getElementById('chatLogList').innerHTML = log;
  }
}

  return ( 
    <div className="chatlog-container">
      <div className="messages-container">
      {(props.username) ? `Welcome to ${props.username} chat box` : ''}
      <ul id="chatLogList">
        {(chatZone) ? 
          renderChatLog(chatZone)
         : '' }
      </ul>

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
