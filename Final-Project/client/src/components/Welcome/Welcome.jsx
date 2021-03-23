import React from 'react'
import './Welcome.css'
const Home = () => {
    return (
        <div className="home-container">
            <input
                type="text"
                placeholder="Input Your Name"
                className="text-input-field"
            />
            <button className="enter-room-button">Login</button>
        </div>
    )
}

export default Home
