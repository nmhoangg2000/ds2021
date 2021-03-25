import React,  { useEffect, useState } from 'react'
import './Home.css'

import { useSelector, useDispatch } from 'react-redux'
import { addConnection, removeConnection } from '../../features/onlineUsers/onlineUsersSlice'

import { getSession } from '../../session'
import { peer, socket } from '../../App';
import ChatZone from '../../chat'
import ChatLog from './ChatLog'

const Home = () => {
    const dispatch = useDispatch();
    const chatZoneList = useSelector(state => state.onlineUsers)
    const [peerName, setpeerName] = useState('')
    useEffect(() => {
        socket.on('joinServer', username => {  // New client connect to the network
            let conn = peer.connect(username) // Connect to new client via peerjs
            let chatZone = new ChatZone(conn)
            console.log(chatZone)
            dispatch(addConnection(chatZone)) 
            console.log(chatZoneList)           
            conn.on('data', (message) => {
                // const chatZone = chatZoneList.find(chatZone => chatZone.connection.peer === username);
                chatZone.addMessage(message); 

                console.log(message)
                console.log(chatZone) 
            })
        })
        peer.on('connection', (conn) => {
            let chatZone = new ChatZone(conn)
            dispatch(addConnection(chatZone))
            console.log(chatZone)
            console.log(chatZoneList)
            conn.on('data', (message) => {
                // const chatZone = chatZoneList.find(chatZone => chatZone.connection.peer === conn.peer);
                chatZone.addMessage(message);
                console.log(message)
                console.log(chatZone)
            })
          })
        socket.on('leaveServer', (username) => {
            // console.log('leave ' + username)
            dispatch(removeConnection(username))
        })
    }, [chatZoneList])

    console.log(chatZoneList)
    const renderChatZoneList = chatZoneList.map(chatZone => (
        <li key={chatZone.connection.peer} onClick={() => setpeerName(chatZone.connection.peer)}>{chatZone.connection.peer}</li>
    ))
      
    return (
        <div className="chat-room-container">
            <div className="row">
                <div className="col-3">
                <h1 className="online-name">Online: </h1>
                <div className="online-container">
                    <ol className="online-list">
                        {renderChatZoneList}
                    </ol>
                </div>
                </div>
                <div className="col-9">
                    <h1 className="room-name">Room: </h1>
                    <ChatLog username={peerName}/>
                </div>
            </div>
        </div>
    )
}

export default Home
