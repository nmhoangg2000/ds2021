import React,  { useEffect } from 'react'
import './Home.css'

import { useSelector, useDispatch } from 'react-redux'
import { addConnection } from '../../features/onlineUsers/onlineUsersSlice'

import { getSession } from '../../session'
import { peer, socket } from '../../App';
import ChatZone from '../../chat'

const Home = () => {
    const dispatch = useDispatch();
    const chatZoneList = useSelector(state => state.onlineUsers)
    console.log(chatZoneList)
    const renderedchatZoneList = chatZoneList.map(chatZone => (
        <li key={chatZone.connection.peer}>{chatZone.connection.peer}</li>
      ))
    useEffect(() => {
        socket.on('joinServer', username => {  // New client connect to the network
            let conn = peer.connect(username) // Connect to new client via peerjs
            console.log(username)
            let chatZone = new ChatZone(conn);
            // console.log(chatZone)
            dispatch(addConnection(chatZone))
            // conn.on('open', () => {
            //     conn.send("connected to" + username)
            // })
        })
        peer.on('connection', (conn) => {
            let chatZone = new ChatZone(conn);
            dispatch(addConnection(chatZone))
          })
    }, [])
    return (
        <div className="chat-room-container">
            <div className="row">
                <div className="col-3">
                <h1 className="online-name">Online: </h1>
                <div className="online-container">
                    <ol className="online-list">
                        {renderedchatZoneList}
                    </ol>
                </div>
                </div>
                <div className="col-9">
                    <h1 className="room-name">Room: </h1>
                    <div className="messages-container">
                        <ol className="messages-list">
                        
                        </ol>
                    </div>
                    <div className="row">
                        <textarea
                            placeholder="Write message..."
                            className="new-message-input-field"
                        />
                        <button className="send-message-button">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
