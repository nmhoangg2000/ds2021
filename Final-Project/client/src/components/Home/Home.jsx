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
    const [peerName, setpeerName] = useState('')
    useEffect(() => {
        socket.on('joinServer', username => {  // New client connect to the network
            let conn = peer.connect(username) // Connect to new client via peerjs
            console.log(username)
            // let chatZone = new ChatZone(conn);
            // console.log(chatZone)

            dispatch(addConnection(new ChatZone(conn)))
            conn.on('data', (message) => {
                console.log("connect: " + message)
            })
        })
        peer.on('connection', (conn) => {
            let chatZone = new ChatZone(conn);
            // console.log('hi')
            dispatch(addConnection(new ChatZone(conn)))
          })
        socket.on('leaveServer', (username) => {
            console.log('leave ' + username)
            dispatch(removeConnection(username))
        })
    }, [])

    const chatZoneList = useSelector(state => state.onlineUsers)
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
