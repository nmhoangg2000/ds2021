import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <div className="chat-room-container">
            <div className="row">
                <div className="col-3">
                <h1 className="online-name">Online: </h1>
                <div className="online-container">
                    <ol className="online-list">
                    
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
